
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
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Alert, AlertTitle, Backdrop, CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import InstructorNav from './InstructorNav';
import TraineeNav from './TraineeNav';

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
const SolveExercise = () => {
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

    //endpoint code
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const userType = params.get('userType')
    const courseId = params.get('courseId');
    const subtitleId = params.get('subtitleId');
    const exerciseId = params.get('exerciseId');

    const [exercise, setExercise] = useState(async () => {
        await axios.get(`http://localhost:8000/solveExercise?userId=${userId}&courseId=${courseId}&exerciseId=${exerciseId}&subtitleId=${subtitleId}`)
            .then(res => setExercise(res.data))
            .catch((error) => alert(error.response.data.message))
    })

    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (exercise._id)
            setReady(true);
    }, [exercise])


    const [gradeDetails, setGradeDetails] = useState(null);
    const submit = async () => {
        //the user answers are set in the radio button onChange function
        await axios.post(`http://localhost:8000/submitExercise?userId=${userId}`
            , { solvedExercise: exercise })
            .then(response => setGradeDetails(response.data))
            .catch((error) => alert(error.response.data.message))
        setOpenPopup(true)
    }

    //to display the grade
    const [openPopup, setOpenPopup] = useState(false);
    const handleClose = () => {
        setOpenPopup(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
            { userType==='INSTRUCTOR' &&
            <InstructorNav post={{}} />
            }
            { userType!=='INSTRUCTOR' &&
                <TraineeNav post={{}} />
            }
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>

                        </Grid>
                    </Container>
                    {/*start writing your body here*/}
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
                            <Typography fontWeight={'bold'} color={'#03045E'} variant="h4" align='center'>{exercise.title}</Typography>
                            {
                                exercise.questions.map((question) => (
                                    <div>
                                        <FormControl sx={{ ml: 1 }}>
                                            <Typography fontWeight={'bold'} color={'#03045E'}>{question.questionText}</Typography>
                                            <RadioGroup
                                                sx={{ mb: 1 }}
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                name="controlled-radio-buttons-group"
                                                onChange={(event) => question.userAnswer = event.target.value}
                                            >
                                                <FormControlLabel value={question.mcqs[0]} control={<Radio sx={{
                                                    '&, &.Mui-checked': {
                                                        color: '00B4D8',
                                                    },
                                                }} />}
                                                    label={question.mcqs[0]} />

                                                <FormControlLabel value={question.mcqs[1]} control={<Radio sx={{
                                                    '&, &.Mui-checked': {
                                                        color: '00B4D8',
                                                    },
                                                }} />}
                                                    label={question.mcqs[1]} />

                                                <FormControlLabel value={question.mcqs[2]} control={<Radio sx={{
                                                    '&, &.Mui-checked': {
                                                        color: '00B4D8',
                                                    },
                                                }} />}
                                                    label={question.mcqs[2]} />

                                                <FormControlLabel value={question.mcqs[3]} control={<Radio sx={{
                                                    '&, &.Mui-checked': {
                                                        color: '00B4D8',
                                                    },
                                                }} />}
                                                    label={question.mcqs[3]} />
                                            </RadioGroup>
                                        </FormControl>
                                        <Divider />
                                    </div>
                                ))
                            }
                            { userType !== 'INSTRUCTOR' &&
                                <Button size='large'
                                sx={{ mt: 1, mb: 1, ml: 1, display: 'flex', flexDirection: 'column', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                onClick={submit}
                            >
                                Submit your answers
                            </Button>
                            }

                            
                            { gradeDetails &&
                                <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={openPopup}
                                onClick={handleClose}
                            >
                                <Alert sx={{ tabSize:'l' }} severity="success" color="info">
                                    <AlertTitle>Your exercise has been submitted.</AlertTitle>
                                    Your grade is {gradeDetails.userGrade} out of {exercise.totalGrade}
                                    <br></br>
                                    which is {gradeDetails.gradePercentage.toFixed(2)}% <TagFacesIcon />
                                    <br></br>
                                    <br></br>
                                    <Button variant='outlined' sx={{color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8'}}
                                    onClick={() => window.location.href=`/viewCorrectAnswers?courseId=${courseId}&subtitleId=${subtitleId}&exerciseId=${exerciseId}`}>
                                     Click here to view the correct answers </Button>
                                </Alert>
                            </Backdrop>
                            }

                        </div>
                    }

                </Box>
            </Box>
        </ThemeProvider>

    );



}
export default SolveExercise;

