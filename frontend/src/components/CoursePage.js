
import * as React from 'react';
import { styled, createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from '../logo Ninjas.jpeg';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Alert, AlertTitle, Backdrop, CircularProgress, Dialog, DialogTitle, InputLabel, LinearProgress, Rating, TextField } from '@mui/material';
import img from "../components/backgroundCourse.png";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ReactPlayer from 'react-player/youtube';
import PersonIcon from '@mui/icons-material/Person';
import { Text } from '@react-pdf/renderer';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const drawerWidth = 240;
function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

const CoursePage = () => {
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            '& .MuiDrawer-paper': {
                position: 'relative',
                whiteSpace: 'nowrap',
                width: drawerWidth,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                boxSizing: 'border-box',
                ...(!open && {
                    overflowX: 'hidden',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    width: theme.spacing(7),
                    [theme.breakpoints.up('sm')]: {
                        width: theme.spacing(9),
                    },
                }),
            },
        }),
    );

    const mdTheme = createTheme();

    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const [openRateCourse, setOpenRateCourse] = React.useState(false);

    const handleClickOpen = () => {
        setOpenRateCourse(true);
    };

    const handleClose = (value) => {
        setOpenRateCourse(false);
    };


    //endpoint code
    const { id: courseId } = useParams();
    const [instructors, setInstructors] = useState("");
    const [currency, setCurrency] = useState("");
    const [factor, setFactor] = useState(0);
    const [price, setPrice] = useState(0);
    const [userProgress, setProgress] = useState(0);
    const [course, setCourses] = useState(async () => {
        await axios.get(`http://localhost:8000/course/${courseId}`)
            .then(res => {
                setCourses(res.data.course);
                setCurrency(res.data.currency);
                setFactor(res.data.factor);
            })
            .catch((error) => {
                console.log(error)
                alert(error.response.data.message)
            })
    })

    const [user, setUser] = useState(async () => {
        await axios.get(`http://localhost:8000/currentUser`)
            .then(res => {
                setUser(res.data);
            })
            .catch((error) => {
                console.log(error)
                alert(error.response.data.message)
            })
    })
    const [ready, setReady] = useState(false);
    const [afterdiscount, setAfterDiscount] = useState(0);
    const [registered, setRegistered] = useState(false);

    //for the rating
    const [rating, setRating] = useState(0);
    const [text, setText] = useState("")
    const handleRating = (event) => {
        setRating(event.target.value);
    };
    const handleText = (event) => {
        setText(event.target.value);
    };

    const [openPopup, setOpenPopup] = useState(false);
    const handleClosePopup = () => {
        setOpenPopup(false);
        window.location.href= `/course/${courseId}`;
    };
    const submitRating = async () => {
        const response = await axios.post(
            `http://localhost:8000/rateCourse?userId=${user._id}&courseId=${course._id}`,
            { rating, text })
            .catch((error) => alert(error.response.data.message))
        setOpenRateCourse(false);
        setOpenPopup(true);
    }
    useEffect(() => {
        if (course._id && user._id) {
            //result of the backend request is ready
            setReady(true);

            //check if this user is registered
            setRegistered(course.students.includes(user._id));

            //course instructors
            let instructs = "";
            course.instructors.map((instructor) => {
                instructs += instructor.firstName + " " + instructor.lastName + "\n"
            })
            setInstructors(instructs);

            //set the price to be displayed
            let priceAfterDiscount;
            if (course.discount > 0) {
                priceAfterDiscount = course.price - (course.price * course.discount / 100);
                setAfterDiscount(priceAfterDiscount * factor);
            }
            setPrice(course.price * factor);

            //check the user's course progress. is there any? if no leave it as a zero, and if yes set the value.
            const progress = user.progress.filter(prog => prog.courseId.toString() === courseId.toString())[0]
            if (progress)
                setProgress(progress.currentProgress);
        }
    }, [course])


    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                            bgcolor: '#03045E'
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton >
                        <Typography
                            component="h1"
                            variant="h6"
                            bgcolor='#03045E'
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            <img style={{ width: 150, height: 60 }} src={logo} alt="React Image" />
                        </Typography >
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        &nbsp;&nbsp;&nbsp;
                        <box>

                            <Button variant="contained" sx={{ color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}>Sign In</Button>
                        </box>
                        &nbsp;&nbsp;&nbsp;
                        <box>
                            <Button variant="outlined" sx={{ color: 'white', borderColor: '#CAF0F8' }}>Sign Up</Button>
                        </box>
                        {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon  />
              </Badge>
            </IconButton> */}
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>

                    <Divider />
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: '#ffffff',
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
                        <Grid container spacing={3}>

                        </Grid>
                    </Container>
                    {/*start writing your body code*/}
                    {
                        !ready &&
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            minHeight="100vh"
                        >
                            <CircularProgress />
                        </Box>

                    }
                    {
                        ready &&
                        <div>
                            <Paper
                                sx={{
                                    position: 'relative',
                                    backgroundColor: 'grey.800',
                                    color: '#000',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundImage: `url(${img})`,
                                }}
                            >
                                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                    {course.subject}
                                </Typography>
                                <Typography variant="h5" color="inherit" paragraph>
                                    {course.title}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Taught by {instructors}
                                </Typography>
                            </Paper>

                            <Divider />
                            <Box display="flex"
                                mt={1}
                                mb={1}
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center">
                                <Typography variant="subtitle1">{course.summary}</Typography>
                                <Typography variant="subtitle1"> Current course rating: <Rating defaultValue={course.rating} precision={0.1} readOnly /></Typography>
                                <Typography variant="subtitle1"> The total hours of the course: {course.totalHours} </Typography>
                                <Typography variant="subtitle1"> Current number of enrolled students: {course.numberOfRegistered} </Typography>
                                {/*dealing with the course price*/}

                                {!["CORPORATE_TRAINEE", "ADMIN", "INSTRUCTOR"].includes(user.type) &&
                                    !registered &&
                                    course.discount > 0 &&
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <Typography variant="subtitle1">
                                            This course is on sale for {course.discountDuration} days!
                                        </Typography>
                                        <Typography variant="subtitle1">

                                            <Text style={{ textDecorationLine: 'line-through' }}>{price}</Text>
                                            {afterdiscount}  {currency}
                                        </Typography>
                                    </div>
                                }
                                {!["CORPORATE_TRAINEE", "ADMIN", "INSTRUCTOR"].includes(user.type) && course.discount === 0 && !registered &&
                                    <Typography variant="subtitle1">
                                        This course currently costs {price} {currency}
                                    </Typography>
                                }
                                {
                                    user.type === "INDIVIDUAL_TRAINEE" && !registered &&
                                    <Button size='large' variant="contained"
                                        sx={{ align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                        onClick={() => window.location.href = '/payForCourse'}>
                                        REGISTER NOW!
                                    </Button>
                                }

                                {user.type === "CORPORATE_TRAINEE" && !registered &&
                                    <Button
                                        sx={{ align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                        onClick={() => window.location.href = '/requestAccess'}
                                    >
                                        You are not enrolled in the course. If you want to view all the resources, click here to request access
                                    </Button>
                                }
                            </Box>
                            <Divider />

                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center">
                                <ReactPlayer url={course.videoLink}
                                    controls={true}
                                />
                            </Box>
                            <Divider />
                            {/*display the user's progress*/}
                            <Box sx={{ ml:27, width: '70%' }}>
                                <Typography align='center' variant='h6' color={'#03045E'}> Your current progress: </Typography>
                                <LinearProgressWithLabel value={userProgress} />
                                <Typography align='center' variant='h6' color={'#03045E'}> Keep it up! <AutoAwesomeIcon /> </Typography>
                            </Box>

                            {
                                course.subtitles.map((subtitle) => (
                                    <Box
                                        sx={{
                                            mb: 2,
                                            mr: 15,
                                            p: 1, border: '3px dashed grey',
                                            borderColor:'#90E0EF'
                                        }}>

                                        <Typography color="#03045E" sx={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}> {subtitle.text} </Typography>
                                        <br></br>
                                        <Typography> This subtitle's total hours: {subtitle.hours} </Typography>
                                        <br></br>
                                        <Typography
                                            sx={{
                                                alignItems: 'center',
                                                '&:hover': {
                                                    backgroundColor: '#CAF0F8',
                                                },
                                            }}
                                            onClick={registered ? () => window.location.href = `/viewVideo` : null}
                                        >
                                            <PlayCircleIcon color='#03045E' /> {subtitle.videoTitles.title}: {subtitle.videoTitles.description}
                                        </Typography>

                                        {subtitle.exercises.map((exercise) => (
                                            <Typography
                                                sx={{
                                                    alignItems: 'center',
                                                    '&:hover': {
                                                        backgroundColor: '#CAF0F8',
                                                    },
                                                }}
                                                onClick={registered ?
                                                    () => window.location.href = `/solveExercise?userId=${user._id}&courseId=${course._id}&exerciseId=${exercise._id}&subtitleId=${subtitle._id}`
                                                    : null}
                                            >
                                                <MenuBookIcon color='#03045E' /> {exercise.title}
                                            </Typography>
                                        ))}
                                    </Box>
                                ))
                            }
                            <Divider />

                            {/*Course ratings*/}
                            <Box
                                sx={{
                                    mb: 2,
                                    mr: 10,
                                    p: 1, border: 2, borderColor:'#00B4D8'
                                }}>
                                <Typography color="#03045E" sx={{ width: 155, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}> Course reviews </Typography>
                                {["INDIVIDUAL_TRAINEE", "CORPORATE_TRAINEE"].includes(user.type) &&
                                    <Button sx={{ ml: 140, mt: -5, align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                        onClick={handleClickOpen}
                                    >
                                        Rate this course
                                    </Button>
                                }
                                {
                                    course.reviews.map((review) => (
                                        <div>
                                            <Typography color="#03045E" sx={{ fontSize: 14, fontWeight: 'bold' }}> <PersonIcon /> {review.firstName} {review.lastName}
                                            </Typography>
                                            <Rating defaultValue={review.rating} precision={0.1} readOnly />

                                            <Typography color="#000000" sx={{ fontSize: 14 }}>{review.text}</Typography>
                                            <Divider />
                                        </div>
                                    ))
                                }
                                <Button></Button>
                            </Box>

                            {/*RATE THE COURSE POPUP DIALOGUE*/}
                            <Dialog onClose={handleClose} open={openRateCourse}
                                sx={{
                                    "& .MuiDialog-container": {
                                        "& .MuiPaper-root": {
                                            width: "100%",
                                            maxWidth: "700px",
                                        },
                                    },
                                    display: "flex", flexDirection: "column"
                                }}>
                                <DialogTitle align='center' display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                    Rate the course
                                    <Rating
                                        name="simple-controlled"
                                        onChange={handleRating}
                                    />
                                </DialogTitle>

                                <TextField id="standard-basic" label="Add a comment." variant="standard"
                                    sx={{ mb: 2 }}
                                    onChange={handleText} />

                                <Button
                                    sx={{ align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                    onClick={submitRating}
                                >
                                    Submit your rating
                                </Button>
                            </Dialog>
                            {/*alert shows up after submitting the rating*/}
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={openPopup}
                                onClick={handleClosePopup}
                            >
                                <Alert sx={{ tabSize:'l' }} severity="success">
                                    <AlertTitle>Your Rating has been submitted.</AlertTitle>
                                    Click anywhere to continue
                                </Alert>
                            </Backdrop>
                        </div>
                    }


                </Box>
            </Box>
        </ThemeProvider>

    );



}
export default CoursePage;

