
import * as React from 'react';
import { Radio, RadioGroup, FormControlLabel, Drawer, Accordion, AccordionSummary } from '@mui/material';
import { createTheme, ThemeProvider, styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
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
import img from "../study.jpg";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ReactPlayer from 'react-player/youtube';
import PersonIcon from '@mui/icons-material/Person';
import { Document, Page, PDFDownloadLink, Text } from '@react-pdf/renderer';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TraineeNav from '../nav/TraineeNav';
import InstructorNav from '../nav/InstructorNav';
import clickOnVid from '../clickvid.jpg';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import BoyOutlinedIcon from '@mui/icons-material/BoyOutlined';
import GradingIcon from '@mui/icons-material/Grading';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
const instructorNav = {};
const traineeNav = {};
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

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const CoursePage = () => {

    const mdTheme = createTheme();

    //for the course rating
    const [openRateCourse, setOpenRateCourse] = React.useState(false);
    const handleClickOpen = () => {
        setOpenRateCourse(true);
    };
    const handleClose = () => {

        setOpenRateCourse(false);
        setopenpay(false);
    };
    const [rating, setRating] = useState(0);
    const [text, setText] = useState("");
    const [didRate, setdidRate] = useState(false);
    const [didRateDelete, setdidRateDelete] = useState(false);
    const [opendidRateDelete, setOpendidRateDelete] = useState(false);

    const handleDidRateDelete = () => {
        setdidRateDelete(true);
    };
    const handleRating = (event) => {
        setRating(event.target.value);
    };
    const handleText = (event) => {
        setText(event.target.value);
    };

    const [openPopup, setOpenPopup] = useState(false);
    const [instR, setInstR] = useState(false);
    const handleClosePopup = () => {
        setOpenPopup(false);
        if (instR) {
            setInstR(false)
            setdidRate(true)
        } else
            window.location.reload();
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

    const didRateInstructor = async () => {

        console.log('henaa')
        const response = await axios.get(`http://localhost:8000/didRateInstructor?userId=${user._id}&instructorId=${course.instructors[0]._id}&deleteR=${didRateDelete}`)
            .then(res => {
                setdidRate(res.data.rated)
                console.log(res.data.rated)

            }).catch((error) => setdidRate(false))
        //alert(error.response.data.message)


        if (didRateDelete) {
            console.log('w b3deen');
            setOpendidRateDelete(true)
            setdidRateDelete(false)
        }
        // if (response.status === 200) {
        //     setdidRate(true)
        // }

    }

    //endpoint code
    const { id: courseId } = useParams();
    const [currency, setCurrency] = useState("");
    const [factor, setFactor] = useState(0);
    const [price, setPrice] = useState(0);
    const [userProgress, setProgress] = useState(0);
    const [EXgrades, setEXgrades] = useState(null)
    const [course, setCourses] = useState(async () => {
        await axios.get(`http://localhost:8000/course/${courseId}`)
            .then(res => {
                console.log(res.data)
                setCourses(res.data.course);
                setCurrency(res.data.currency);
                setFactor(res.data.factor);
                setEXgrades(res.data.Exgrades);
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
    //if the user is a registered student or an instructor that teaches the course, return true
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
            .catch((error) => {
                if (error.response.data.message === "you did not login")
                    window.location.href = '/';
            });

        if (response.status == 200)
            setReqAccess(true);
    }


    //when the corporate trainee clicks request access, this endpoint should be called.
    const requestCourseAccess = async () => {
        const response = await axios.post(`http://localhost:8000/requestAccess?userId=${user._id}&courseId=${course._id}`)
            .catch((error) => {
                if (error.response.data.message === "you did not login")
                    window.location.href = '/';
            });

        if (response.status == 200) //just refresh the page
            window.location.reload();
    }

    const [deletedMyRating, setDelete] = useState(false);
    const deleteCourseRating = async () => {
        const response = await axios.post(`http://localhost:8000/deleteCourseRating?userId=${user._id}&courseId=${course._id}`)
            .catch((error) => {
                if (error.response.data.message === "you did not login")
                    window.location.href = '/';
            });

        if (response.status == 200) //just refresh the page
        {
            setDelete(true);
            setOpenPopup(true);
        }
    }

    const [reportMessage, setReportMessage] = useState(null);
    const [openRM, setOpenRM] = useState(false);
    const [openGrade, setOpenGrade] = useState(false);
    const [grade, setGrade] = useState(null);
    const [exerciseId, setExerciseId] = useState(null);
    const [severity, setSeverity] = useState('info');
    const [flagG, setFlagG] = useState(null);
    const [RD, setRD] = useState(null);
    async function reportCourse() {

        await axios.post(`http://localhost:8000/reportCourse?userId=${user._id}&courseId=${course._id}&problem=${problem}&description=${RD}`)
            .then(res => {
                setSeverity('success')
                setReportMessage('Your Report has been submitted')
                setOpenRM(true)
                // alert ('Your Report has been submitted')
            })
            .catch((error) => {
                setSeverity('info')
                setReportMessage(error.response.data.message)
                setOpenRM(true)
                //alert(error.response.data.message)
            })
        //console.log(Search)
        // const c = searchResult.currency


    }


    async function handleGrade() {

        await axios.get(`http://localhost:8000/viewExerciseGrade?exersiseId=${exerciseId}&userId=${user._id}`)
            .then(response => {
                if (response.data && response.data.solved) {
                    setGrade("You got " + response.data.userGrade + " out of " + response.data.totalGrade)
                    setOpenGrade(true)
                }


                if (response.data && !response.data.solved) {

                    setGrade("You still did not solve the exercise")
                    setOpenGrade(true)



                }
                // setGrade(response.data)
                //setOpenGrade(true)  //momken a5leha useEffect
                // alert ('Your Report has been submitted')
            })
            .catch((error) => {
                //setSeverity('info')
                setReportMessage(error.response.data.message)
                setOpenGrade(true)
                //alert(error.response.data.message)
            })
        //console.log(Search)
        // const c = searchResult.currency


    }

    const handleReportDescription = (event) => {
        setRD(event.target.value);
    }
    const handleCloseRM = () => {
        setOpenRM(false);
    }

    const handleClosedid = () => {
        setOpendidRateDelete(false);
    }
    const handleCloseGrade = () => {
        setOpenGrade(false);
        setFlagG(false);
        // handleCloseRM();
    }
    useEffect(() => {
        if (exerciseId && flagG) {
            handleGrade();
        }

    }, [flagG]
    )

    useEffect(() => {
        if (didRateDelete) {
            didRateInstructor();
        }

    }, [didRateDelete]
    )






    //when an enrolled user wants a refund
    const [requested, setRequested] = useState(false);
    const [openRefundPopup, setORP] = useState(false);
    const [problem, setProblem] = useState(null);
    const handleCloseRefundPopup = () => {
        setORP(false);
        window.location.reload();
    }
    const requestedTheRefund = async () => {
        const response = await axios.get(`http://localhost:8000/requestedTheRefund?userId=${user._id}&courseId=${course._id}`)
            .catch((error) => console.log(error.response.data.message));

        if (response.status === 200) {
            setRequested(true);
        }

    }
    const requestRefund = async () => {
        const response = await axios.post(`http://localhost:8000/requestRefund?courseId=${course._id}`)
            .catch((error) => console.log(error.response.data.message));

        if (response.status == 200) {
            setORP(true);
        }
    }


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open2 = Boolean(anchorEl);

    const handleClick = (event) => {
        //console.log(event)
        setAnchorEl(event.currentTarget);

    };
    const handleClose2 = (event) => {
        //console.log(event)
        setAnchorEl(null);
    };

    const handleProblem = (event) => {
        if (problem == event.target.value) {
            setProblem(null);


        }
        else {
            setProblem(event.target.value);

        }


    };
    const handleDone = (event) => {

        if (problem && RD) {

            reportCourse();
        } else {
            setSeverity('info')
            setReportMessage('please specify the problem')
            setOpenRM(true)

        }
    };

    //clicking on the video should display it
    const [clickedVideo, setVideo] = useState(null);
    const [notes, setNotes] = useState('');

    const handleNotes = (event) => {
        setNotes(event.target.value);
    };

    //if a video is clicked call the backend to recheck the progress
    const recordProgress = async (subtitleId) => {
        await axios.get(`http://localhost:8000/viewVideo?subtitleId=${subtitleId}&courseId=${courseId}`)
            .catch((error) => alert(error.response.data.message))
    }

    const MyDoc = () => (
        <Document>
            <Page>
                <Text>{notes}</Text>
            </Page>
        </Document>
    )
    // EXgrades.filter(ex => ex.exercises[0]._id.toString() === exercise._id.toString()).length > 0
    // && EXgrades.filter(ex => ex.exercises[0]._id.toString() === exercise._id.toString())[0].userGrade &&
    // <Typography> heheeee </Typography>
    const getTheGrade = () => {
        console.log(EXgrades)
    }

    //for the instructor, check the average exercise grades
    const [avgGrades, setAvgGrades] = useState(async () => {
        const response = await axios.get(`http://localhost:8000/averageExerciseGrade?courseId=${courseId}`)
            .catch((error) => {
                if (error.response.data.message === "you did not login")
                    window.location.href = '/';
            })

        if (response.status === 200)
            setAvgGrades(response.data);

    })

    //paying using the wallet
    const [walletsuccess, setsuccess] = useState(false);
    const [walletno, setno] = useState(false);
    const payWallet = async () => {
    const response = await axios.put(`http://localhost:8000/payForCourse`, {
            courseId: course._id,
            coursePrice: course.price,
            instId:course.instructors[0]._id
        }).catch(error => {
            if(error.response.status === 400) {
                setopenpay(false);
                setno(true);
            }
        })

        if (response.status === 200) {
            setopenpay(false);
            setsuccess(true);
        }
    }

    //The user's history of the course exercises
    const [exerciseHistory, setExerciseHistory] = useState([]);
    const checkExerciseHistory = async () => {
        const response = await axios.get(`http://localhost:8000/exerciseHistory?courseId=${courseId}&userId=${user._id}`)
            .catch((error) => {
                if (error.response.data.message === "you did not login")
                    window.location.href = '/';
            })

        if (response.status === 200) {
            console.log(response.data)
            setExerciseHistory(response.data);
        }
    }

    //checks whether the user solved a specific exercise
    const sawTheAnswers = (exerciseId) => {
        const saw = exerciseHistory.filter(ex => ex.exercises[0]._id.toString() === exerciseId.toString());
        //if he didn't solve the exercise return false
        if (saw.length === 0)
            return false;

        return saw[0].viewedAnswers;
    }

    const solvedThisExercise = (exerciseId) => {
        const solved = exerciseHistory.filter(ex => ex.exercises[0]._id.toString() === exerciseId.toString());
        //if he didn't solve the exercise return zero
        if (solved.length === 0)
            return "Not Solved Yet.";
        else
            return solved[0].userGrade;
    }

    const [youSaw, setYouSaw] = useState(false);
    const handleSawAns = () => {
        setYouSaw(!youSaw)
    }

    const [openpay, setopenpay] = useState(false);

    useEffect(() => {
        if (course._id && user._id && avgGrades.length > 0) {
            //result of the backend request is ready
            setReady(true);
            didRateInstructor();

            getTheGrade();
            //check if this user is registered 
            setRegistered(isRegistered());

            //check the exercise history to know whether the trainee solved this exercise before
            checkExerciseHistory();

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
    }, [course, avgGrades])


    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                {user.type === 'INSTRUCTOR' &&
                    <InstructorNav post={instructorNav} />
                }
                {user.type !== 'INSTRUCTOR' &&
                    <TraineeNav post={traineeNav} />
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
                                    color: '#000',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right',
                                    backgroundImage: `url(${img})`,
                                    backgroundSize: '20%',

                                }}
                            >
                                <Typography component="h1" variant="h3" color="inherit">
                                    Subject: {course.subject}
                                </Typography>
                                <Typography variant="h4" color="inherit">
                                    Title: {course.title}
                                </Typography>
                                <Rating defaultValue={course.rating} precision={0.1} readOnly />
                                <Typography variant="h6"> <WatchLaterOutlinedIcon /> Total Hours: {course.totalHours} </Typography>
                                <Typography variant="h6"> <GroupsOutlinedIcon />  Number of Students: {course.students.length} </Typography>
                                <Typography variant="h6"> <BoyOutlinedIcon />
                                    Taught by {course.instructors[0].firstName} {course.instructors[0].lastName}
                                    <br></br>
                                    {registered && ["CORPORATE_TRAINEE", "INDIVIDUAL_TRAINEE"].includes(user.type) && !didRate &&
                                        <Button variant="contained" size="small"
                                            sx={{ align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                            onClick={() => {
                                                setInstR(true);
                                                openInstRate()
                                            }}>
                                            Rate this instructor
                                        </Button>
                                    }
                                    {registered && ["CORPORATE_TRAINEE", "INDIVIDUAL_TRAINEE"].includes(user.type) && didRate &&
                                        <Button variant="contained" size="small"
                                            sx={{ align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                            onClick={() => {
                                                setInstR(true);
                                                openInstRate()
                                            }} endIcon={<EditIcon />}>
                                            Update instructor's rating
                                        </Button>


                                    }
                                    {registered && ["CORPORATE_TRAINEE", "INDIVIDUAL_TRAINEE"].includes(user.type) && didRate &&
                                        <Button variant="contained" size="small"
                                            sx={{ align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                            onClick={handleDidRateDelete}
                                            endIcon={<DeleteIcon />}>
                                            delete instructor's rating
                                        </Button>


                                    }
                                </Typography>
                            </Paper>

                            <Box display="flex"
                                mt={0.5}
                                mb={0.5}
                                sx={{
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'light'
                                            ? theme.palette.grey[100]
                                            : theme.palette.grey[900],
                                }}
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center">


                                <Typography variant="subtitle1">
                                    <Typography variant="h6"> Summary:</Typography> {course.summary}</Typography>

                                {/*dealing with the course price*/}

                                {(['GUEST', 'INSTRUCTOR'].includes(user.type) || (user.type === 'INDIVIDUAL_TRAINEE' && !registered)) &&
                                    course.discount > 0 && course.startDate && new Date(course.startDate) < new Date() &&
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        <Typography variant="subtitle1">
                                            This course is on sale until {new Date(course.discountDuration).toLocaleDateString()} !
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            From
                                            <Text style={{ textDecorationLine: 'line-through' }}>  {price.toFixed(2)}     </Text>

                                            <Text>   To {afterdiscount.toFixed(2)}  {currency} </Text>

                                        </Typography>
                                    </div>
                                }
                                {(['GUEST', 'INSTRUCTOR'].includes(user.type) || (user.type === 'INDIVIDUAL_TRAINEE' && !registered)) &&
                                 ( course.discount === 0 || (course.startDate && new Date(course.startDate) > new Date())) &&
                                    <Typography variant="subtitle1">
                                        This course currently costs {price.toFixed(2)} {currency}
                                    </Typography>
                                }
                                {
                                    user.type === "INDIVIDUAL_TRAINEE" && !registered &&
                                    <Button size='large' variant="contained"
                                        sx={{ align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                        onClick={() => setopenpay(true)}>
                                        REGISTER NOW!
                                    </Button>
                                }
                                {/* {
                                    user.type === "INSTRUCTOR" && registered &&
                                    <Button size='large' variant="contained"
                                        sx={{ align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                        onClick={() => window.location.href = '#'}>
                                        Add discount
                                    </Button>
                                } */}
                                {user.type === "CORPORATE_TRAINEE" && !registered && !reqAccess &&
                                    <Button
                                        sx={{ align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                        onClick={requestCourseAccess}
                                    >
                                          Want to enroll? request access
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

                            {/* subtitle box, should be right aligned with all the subtitles collapsed inside an accordion */}
                            {/* upon clicking on the sub video, the left box should display the reactPlayer,
                            with the notes field and the download button */}
                            <Box
                                display="flex"
                                flexDirection="row"
                                sx={{ border: 1, borderColor: '#00B4D8' }}
                            >

                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    sx={{
                                        overflow: "hidden",
                                        overflowY: "scroll",
                                    }}
                                    alignItems="left"
                                    minWidth={'50%'}
                                    maxHeight='480px'
                                >
                                    {
                                        course.subtitles.map((subtitle) => (
                                            <Accordion
                                                sx={{
                                                    p: 0.5,
                                                    border: 0.2,
                                                    borderColor: '#00B4D8'
                                                }}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Typography color="#03045E" sx={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}> {subtitle.text} </Typography>
                                                </AccordionSummary>

                                                <br></br>
                                                <Typography> This subtitle's total hours: {subtitle.hours} </Typography>
                                                <br></br>
                                                {subtitle.videoTitles &&
                                                    <Typography
                                                        sx={{
                                                            alignItems: 'center',
                                                            '&:hover': {
                                                                backgroundColor: '#CAF0F8',
                                                            },
                                                        }}
                                                        onClick={registered ? () => { setVideo(subtitle.videoTitles.link); recordProgress(subtitle._id); } : null}
                                                    >
                                                        <PlayCircleIcon color='#03045E' /> {subtitle.videoTitles.title}: {subtitle.videoTitles.description}
                                                    </Typography>
                                                }


                                                {subtitle.exercises.map((exercise) => (
                                                    <Grid container spacing={0}>
                                                        <Typography
                                                            sx={{
                                                                alignItems: 'center',
                                                                '&:hover': {
                                                                    backgroundColor: '#CAF0F8',
                                                                },
                                                                width: '95%'
                                                            }}
                                                            onClick={
                                                                registered && !sawTheAnswers(exercise._id) ?
                                                                    () => window.location.href = `/solveExercise?userId=${user._id}&userType=${user.type}&courseId=${course._id}&exerciseId=${exercise._id}&subtitleId=${subtitle._id}`
                                                                    : registered && sawTheAnswers(exercise._id) ? handleSawAns : null}

                                                        >
                                                            <MenuBookIcon color='#03045E' /> Exercise: {exercise.title}
                                                            {
                                                                registered && user.type === 'INSTRUCTOR' && avgGrades.length > 0 &&
                                                                <Typography sx={{ ml: '65%', mt: '-5%' }}>
                                                                    <GradingIcon /> Average Grade: {avgGrades.filter(gr => gr.exerciseId === exercise._id.toString())[0].avgGrade} / {exercise.totalGrade}

                                                                </Typography>
                                                            }
                                                            {
                                                                registered && user.type !== 'INSTRUCTOR' && solvedThisExercise(exercise._id) !== "Not Solved Yet." &&
                                                                <Typography sx={{ ml: '70%', mt: '-5%' }}>
                                                                    <AssignmentTurnedInIcon /> You got {solvedThisExercise(exercise._id)} out of {exercise.totalGrade}.
                                                                </Typography>
                                                            }
                                                            {
                                                                registered && user.type !== 'INSTRUCTOR' && solvedThisExercise(exercise._id) === "Not Solved Yet." &&
                                                                <Typography sx={{ ml: '70%', mt: '-5%' }}>
                                                                    <AssignmentLateIcon /> Not solved yet.
                                                                </Typography>
                                                            }
                                                        </Typography>

                                                        {/* //henaaaaa */}
                                                        <Backdrop

                                                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                                            open={openGrade}
                                                            onClick={handleCloseGrade}
                                                        >
                                                            <Alert sx={{ width: '400px' }} severity='info' icon={false}  >
                                                                <AlertTitle>{grade}</AlertTitle>
                                                                Click anywhere to continue
                                                            </Alert>
                                                        </Backdrop>





                                                    </Grid>

                                                ))}
                                                { /*a5r el loop*/}

                                                {
                                                    user.type == 'INSTRUCTOR' && registered &&
                                                    <Button
                                                        sx={{ mt: 1, align: 'right', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                                        onClick={() =>
                                                            window.location.href = `/exercise?courseId=${course._id}&&subtitleId=${subtitle._id}`}
                                                    >
                                                        Add another exercise
                                                    </Button>
                                                }
                                            </Accordion>
                                        ))

                                    }
                                </Box>

                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    minWidth={'50%'}>
                                    {
                                        !clickedVideo &&
                                        <div>
                                            <img src={clickOnVid} />
                                            <Typography color="#03045E" sx={{ alignSelf: 'center', fontSize: 18, fontWeight: 'bold' }}>
                                                Click on a subtitle video to start watching!
                                            </Typography>

                                        </div>


                                    }
                                    {
                                        clickedVideo &&
                                        <div>
                                            <ReactPlayer url={clickedVideo}
                                                controls={true}
                                            />
                                            <TextField multiline fullWidth label="Write some notes" focused sx={{ mt: 1 }} onChange={handleNotes} />

                                            <PDFDownloadLink document={<MyDoc />} fileName="notes.pdf">
                                                <Button size="large"
                                                    sx={{ m: '1%', ml: '45%', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                                ><DownloadIcon /></Button>
                                            </PDFDownloadLink>
                                        </div>
                                    }
                                </Box>




                            </Box>

                            <Divider />

                            {/*Course ratings*/}
                            <Box
                                sx={{
                                    mb: 2,
                                    mt: '1%',
                                    p: 1, border: 2, borderColor: '#00B4D8'
                                }}>
                                <Typography color="#03045E" sx={{ width: 155, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}> Course reviews </Typography>
                                {["INDIVIDUAL_TRAINEE", "CORPORATE_TRAINEE"].includes(user.type) && registered
                                    && course.reviews.filter(r => r.id === user._id.toString()).length === 0 &&
                                    <Button sx={{ ml: '85%', mt: -5, align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                        onClick={handleClickOpen}
                                    >
                                        Rate this course
                                    </Button>
                                }
                                {["INDIVIDUAL_TRAINEE", "CORPORATE_TRAINEE"].includes(user.type) && registered
                                    && course.reviews.filter(r => r.id === user._id.toString()).length > 0 &&
                                    <Box sx={{ mb: "-1.5%" }}>
                                        <Button sx={{ ml: '83%', mt: "-4%", align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                            onClick={handleClickOpen} endIcon={<EditIcon />}
                                        >
                                            Update my rating
                                        </Button>
                                        <Button sx={{ ml: '83%', mt: "-2%", align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                            endIcon={<DeleteIcon />} onClick={deleteCourseRating}
                                        >
                                            Delete my rating
                                        </Button>
                                    </Box>
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

                            {["CORPORATE_TRAINEE", "INDIVIDUAL_TRAINEE", "INSTRUCTOR"].includes(user.type) &&


                                <Button variant="contained" size="small"
                                    sx={{ mb: 0.5, color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                    aria-controls={open2 ? 'demo-customized-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open2 ? 'true' : undefined}
                                    disableElevation
                                    onClick={handleClick}
                                >
                                    Report a problem
                                </Button>

                            }

                            {/*Report pop*/}

                            <Dialog onClose={handleClose2} open={open2}
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

                                    Report a problem

                                </DialogTitle>

                                <Divider />
                                <Typography sx={{ ml: 2 }}>
                                    <RadioGroup
                                        //aria-labelledby="demo-radio-buttons-group-label"
                                        // name="controlled-radio-buttons-group"
                                        onChange={handleProblem}
                                        onClick={handleProblem}
                                    >
                                        <FormControlLabel value={'technical'} control={<Radio />} label={'technical'} checked={problem == 'technical'} />
                                        <FormControlLabel value={'financial'} control={<Radio />} label={'financial'} checked={problem == 'financial'} />
                                        <FormControlLabel value={'other'} control={<Radio />} label={'other'} checked={problem == 'other'} />


                                    </RadioGroup>
                                </Typography>


                                <TextField id="standard-basic" label="what is your problem?" //variant="standard"
                                    sx={{ m1: 5, mb: 2 }}
                                    onChange={handleReportDescription} />

                                <Typography >
                                    <Button variant="contained" size="small"
                                        sx={{ mb: 0.5, color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                        disableElevation
                                        onClick={handleDone}
                                    >
                                        Done
                                    </Button>



                                    <Backdrop

                                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                        open={openRM}
                                        onClick={handleCloseRM}
                                    >
                                        <Alert sx={{ tabSize: 'l', mt: -50 }} severity={severity} >
                                            <AlertTitle>{reportMessage}</AlertTitle>
                                            Click anywhere to continue
                                        </Alert>
                                    </Backdrop>


                                </Typography>




                            </Dialog>


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

                            {/*payment method POPUP DIALOGUE*/}
                            <Dialog onClose={handleClose} open={openpay}
                                sx={{

                                    display: "flex", flexDirection: "column", alignItems: 'center', alignSelf: 'center'
                                }}>
                                <DialogTitle align='center' display={"flex"} flexDirection={"column"} alignItems={"center"}>
                                    Choose your payment method
                                </DialogTitle>

                                <Button
                                    sx={{ alignSelf: 'center', width: '70%', mb: '5%', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                    onClick={payWallet}
                                >
                                    Pay using wallet
                                </Button>

                                <Button
                                    sx={{ alignSelf: 'center', width: '70%', mb: '5%', align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                    onClick={() => window.location.href = `/checkout?courseId=${course._id}&price=${price}&instId=${course.instructors[0]._id}&courseName=${course.title}`}
                                >
                                    Pay using credit card
                                </Button>
                            </Dialog>

                            {/*alert shows up after submitting the rating*/}
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={openPopup}
                                onClick={handleClosePopup}
                            >
                                <Alert sx={{ tabSize: 'l' }} severity="success">
                                    {deletedMyRating &&
                                        <AlertTitle>Your Rating has been deleted.</AlertTitle>
                                    }
                                    {!deletedMyRating &&
                                        <AlertTitle>Your Rating has been submitted.</AlertTitle>
                                    }
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


                            {/*alert shows up after wallet payment*/}
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={walletsuccess || walletno}
                                onClick={() => window.location.reload()}
                            >
                                <Alert sx={{ tabSize: 'l' }} severity="info">
                                    { walletsuccess &&
                                        <div>
                                            <AlertTitle>Registered successfully.</AlertTitle>
                                            Click anywhere to continue
                                        </div>

                                    }
                                    { walletno &&
                                        <div>
                                            <AlertTitle>The available balance is not enough.</AlertTitle>
                                            Click anywhere to continue
                                        </div>

                                    }
                                </Alert>
                            </Backdrop>



                            {/* report alert */}
                            {/* <Backdrop

                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={openRM}
                                onClick={handleCloseRM}
                            >
                                <Alert sx={{ tabSize: 'l' }} severity={severity} >
                                    <AlertTitle>{reportMessage}</AlertTitle>
                                    Click anywhere to continue
                                </Alert>
                            </Backdrop> */}



                            <Backdrop

                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={opendidRateDelete}
                                onClick={handleClosedid}
                            >
                                <Alert sx={{ width: '400px' }} severity='success'   >
                                    <AlertTitle>Rating for this instructor has been deleted</AlertTitle>
                                    Click anywhere to continue
                                </Alert>
                            </Backdrop>
                            {/* tells the user that they already saw the answers */}
                            <Backdrop

                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={youSaw}
                                onClick={handleSawAns}
                            >
                                <Alert sx={{ width: '400px' }} severity='info' icon={false}  >
                                    <AlertTitle>You saw this exercise's answers!</AlertTitle>
                                    you can not re-solve exercises after seeing their correct answers.
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

