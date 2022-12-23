
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Alert, AlertTitle, Backdrop, CircularProgress, Dialog, DialogTitle, LinearProgress, Rating, TextField } from '@mui/material';
import img from "../components/backgroundCourse.png";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ReactPlayer from 'react-player/youtube';
import PersonIcon from '@mui/icons-material/Person';
import { Text } from '@react-pdf/renderer';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InstructorNav from './InstructorNav';
import TraineeNav from './TraineeNav';


const instructorNav = {};

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

    const mdTheme = createTheme();

    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    //for the course rating
    const [openRateCourse, setOpenRateCourse] = React.useState(false);
    const handleClickOpen = () => {
        setOpenRateCourse(true);
    };
    const handleClose = () => {
        setOpenRateCourse(false);
    };
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
        window.location.href = `/course/${courseId}`;
    };
    const submitRating = async () => {
        const response = await axios.post(
            `http://localhost:8000/rateCourse?userId=${user._id}&courseId=${course._id}`,
            { rating, text })
            .catch((error) => alert(error.response.data.message))
        if (response.status === 200) {
            setOpenRateCourse(false);
            setOpenPopup(true);
        }
    }

    //for the instructor rating
    const [openRateInstructor, setOpenRateInstructor] = React.useState(false);
    const openInstRate = () => {
        setOpenRateInstructor(true);
    };
    const handleinstClose = () => {
        setOpenRateInstructor(false);
    };
    //we can use the same rating and text variables in this case
    const submitInstructorRating = async () => {
        const response = await axios.put(`http://localhost:8000/rateInstructor?userId=${user._id}&instructorId=${course.instructors[0]._id}&ratingNumber=${rating}&ratingText=${text}`)
            .catch((error) => alert(error.response.data.message))

        if (response.status === 200) {
            setOpenRateInstructor(false);
            setOpenPopup(true);
        }

    }

    //endpoint code
    const { id: courseId } = useParams();
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
                if (error.response.data.message === "you did not login")
                    window.location.href = '/';
            })
    })

    const [user, setUser] = useState(async () => {
        await axios.get(`http://localhost:8000/currentUser`)
            .then(res => {
                setUser(res.data);
            })
            .catch((error) => {
                console.log(error)
                if (error.response.data.message === "you did not login")
                    window.location.href = '/';
            })
    })
    const [ready, setReady] = useState(false);
    const [afterdiscount, setAfterDiscount] = useState(0);
    const [registered, setRegistered] = useState(false);
    //if the user is a registered student or an instructor that teaches the coures, return true
    const isRegistered = () => {
        if (user.type == 'INSTRUCTOR')
            return course.instructors.map(instructor => instructor._id).includes(user._id);

        else if (["CORPORATE_TRAINEE", "INDIVIDUAL_TRAINEE"].includes(user.type))
            return course.students.includes(user._id);

        else return false;
    }

    //to check if the corporate trainee has requested access
    const [reqAccess, setReqAccess] = useState(false);
    const requestedAccess = async () => {
        const response = await axios.get(`http://localhost:8000/checkRequestedAccess?userId=${user._id}&courseId=${course._id}`)
            .catch((error) => console.log(error.response.data.message));

        if (response.status == 200)
            setReqAccess(true);
    }


    //when the corporate trainee clicks request access, this endpoint should be called.
    const requestCourseAccess = async () => {
        const response = await axios.post(`http://localhost:8000/requestAccess?userId=${user._id}&courseId=${course._id}`)
            .catch((error) => console.log(error.response.data.message));

        if (response.status == 200) //just refresh the page
            window.location.href = `/course/${courseId}`;
    }

    //when an enrolled user wants a refund
    const [requested, setRequested] = useState(false);
    const [openRefundPopup, setORP] = useState(false);
    const handleCloseRefundPopup = () => {
        setORP(false);
        window.location.href=`/course/${course._id}`
    }
    const requestedTheRefund = async () => {
        const response = await axios.get(`http://localhost:8000/requestedTheRefund?userId=${user._id}&courseId=${course._id}`)
            .catch((error) => console.log(error.response.data.message));

        if (response.status === 200)
            {
                setRequested(true);
            }

    }
    const requestRefund = async () => {
        const response = await axios.post(`http://localhost:8000/requestRefund?courseId=${course._id}`)
            .catch((error) => console.log(error.response.data.message));

        if (response.status == 200)
        {
            setORP(true);
        }
    }
    


    useEffect(() => {
        if (course._id && user._id) {
            //result of the backend request is ready
            setReady(true);

            //check if this user is registered 
            setRegistered(isRegistered());

            //check if requested refund
            requestedTheRefund();

            //check if the corporate trainee requested access
            if (user.type == 'CORPORATE_TRAINEE')
                requestedAccess();

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
                {user.type === 'INSTRUCTOR' &&
                    <InstructorNav post={instructorNav} />
                }
                {user.type !== 'INSTRUCTOR' &&
                    <TraineeNav post={instructorNav} />
                }
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
                                <Typography variant="subtitle1" sx={{ ml: 3 }}>
                                    Taught by {course.instructors[0].firstName} {course.instructors[0].lastName}
                                    <br></br>
                                    {registered && ["CORPORATE_TRAINEE", "INDIVIDUAL_TRAINEE"].includes(user.type) &&
                                        <Button variant="contained"
                                            sx={{ ml: -3, align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                            onClick={openInstRate}>
                                            Rate this instructor
                                        </Button>
                                    }
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

                                {user.type === "CORPORATE_TRAINEE" && !registered && !reqAccess &&
                                    <Button
                                        sx={{ align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                        onClick={requestCourseAccess}
                                    >
                                        You are not enrolled in the course. If you want to view all the resources, click here to request access
                                    </Button>
                                }
                                {
                                    user.type === "CORPORATE_TRAINEE" && !registered && reqAccess &&
                                    <Typography variant="subtitle1">
                                        Your request is currently pending. Please wait for the admin's approval
                                    </Typography>
                                }
                                {user.type === "GUEST" &&
                                    <Button
                                        sx={{ align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                        onClick={() => window.location.href = '/signUp'}
                                    >
                                        Want to enroll? Sign up now!
                                    </Button>
                                }
                                {["CORPORATE_TRAINEE", "INDIVIDUAL_TRAINEE", "INSTRUCTOR"].includes(user.type) &&
                                    <Typography sx={{ ml: 132, mb: 1 }}> Something seems wrong?
                                        <Button variant="contained" size="small"
                                            sx={{ ml: 1, color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                            onClick={() => window.location.href = '/signUp'}
                                        >
                                            Report a problem
                                        </Button>

                                    </Typography>
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
                            {["CORPORATE_TRAINEE", "INDIVIDUAL_TRAINEE"].includes(user.type) && registered &&
                                <Box sx={{ ml: 27, width: '70%' }}>
                                    <Typography align='center' variant='h6' color={'#03045E'}> Your current progress: </Typography>
                                    <LinearProgressWithLabel value={userProgress} />
                                    {userProgress < 100 &&
                                        <Typography align='center' variant='h6' color={'#03045E'}> Keep it up! <AutoAwesomeIcon /> </Typography>
                                    }
                                    {
                                        userProgress < 50 && user.type === 'INDIVIDUAL_TRAINEE' && !requested &&
                                        <Typography sx={{ mt: 1 }} color={'#03045E'} align='center' variant="subtitle1">
                                            Would you like to unroll?
                                            <Button
                                                sx={{ mb: 1, ml: 1, color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                                onClick={requestRefund}>

                                                Request Refund </Button>

                                        </Typography>
                                    }
                                    {requested &&
                                        <Typography sx={{ mt: 1 }} color={'#03045E'} align='center' variant="subtitle1">
                                            Your refund request is currently pending for the admin's approval
                                        </Typography>
                                    }
                                    {userProgress === 100 &&
                                        <Typography align='center' variant='h6' color={'#03045E'}>
                                            Congratulations on finishing the course! You will find the certificate in your email inbox as well as your certificate list <AutoAwesomeIcon />
                                        </Typography>
                                    }
                                </Box>
                            }

                            {
                                course.subtitles.map((subtitle) => (
                                    <Box
                                        sx={{
                                            mb: 2,
                                            mr: 15,
                                            p: 1, border: '3px dashed grey',
                                            borderColor: '#00B4D8'
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
                                                    () => window.location.href = `/solveExercise?userId=${user._id}&userType=${user.type}&courseId=${course._id}&exerciseId=${exercise._id}&subtitleId=${subtitle._id}`
                                                    : null}
                                            >
                                                <MenuBookIcon color='#03045E' /> {exercise.title}
                                            </Typography>
                                        ))}
                                        {
                                            user.type == 'INSTRUCTOR' && registered &&
                                            <Button
                                                sx={{ mt: 1, align: 'right', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                            >
                                                Add another exercise
                                            </Button>
                                        }
                                    </Box>
                                ))
                            }

                            {/*If the user is an instructor that teaches the course, display a button that allows them to add a sub*/}
                            {
                                user.type == 'INSTRUCTOR' && registered &&
                                <Button
                                    sx={{ ml: 75, mb: 1, size: 'large', align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}

                                >
                                    Add another subtitle
                                </Button>
                            }
                            <Divider />

                            {/*Course ratings*/}
                            <Box
                                sx={{
                                    mb: 2,
                                    mr: 10,
                                    p: 1, border: 2, borderColor: '#00B4D8'
                                }}>
                                <Typography color="#03045E" sx={{ width: 155, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}> Course reviews </Typography>
                                {["INDIVIDUAL_TRAINEE", "CORPORATE_TRAINEE"].includes(user.type) && registered &&
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
                                <Alert sx={{ tabSize: 'l' }} severity="success">
                                    <AlertTitle>Your Rating has been submitted.</AlertTitle>
                                    Click anywhere to continue
                                </Alert>
                            </Backdrop>

                            {/*RATE THE INSTRUCTOR POPUP DIALOGUE*/}
                            <Dialog onClose={handleinstClose} open={openRateInstructor}
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
                                    Rate the Instructor: {course.instructors[0].firstName} {course.instructors[0].lastName}
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
                                    onClick={submitInstructorRating}
                                >
                                    Submit your rating
                                </Button>
                            </Dialog>
                            {/*alert shows up after requesting a refund*/}
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={openRefundPopup}
                                onClick={handleCloseRefundPopup}
                            >
                                <Alert sx={{ tabSize: 'l' }} severity="success">
                                    <AlertTitle>Your refund request has been submitted.</AlertTitle>
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

