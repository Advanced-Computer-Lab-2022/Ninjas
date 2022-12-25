
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Alert, AlertTitle, Backdrop, CircularProgress, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import TraineeNav from '../nav/TraineeNav';
import InstructorNav from '../nav/InstructorNav';

const SolveExercise = () => {


    const mdTheme = createTheme();

    const [open, setOpen] = React.useState(false);

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
        window.location.href=`/course/${courseId}`;
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

                                    { gradeDetails.gradePercentage<50 &&
                                        <Button variant='outlined' sx={{mb:1, ml:6, color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8'}}
                                        onClick={() => window.location.reload()}>
                                            Retake exam
                                        </Button>
                                    }
                                    <br></br>
                                    <Button variant='outlined' sx={{color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8'}}
                                    onClick={() => window.location.href=`/viewCorrectAnswers?courseId=${courseId}&subtitleId=${subtitleId}&exerciseId=${exerciseId}`}>
                                    view the correct answers </Button>
                                    <br></br>
                                    <br></br>
                                    <Typography variant='paragraph'>Click anywhere to go back to course page</Typography>
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

