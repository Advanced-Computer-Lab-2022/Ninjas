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

const mdTheme = createTheme();

const ViewCorrectAnswer = () => {
    const [ready, setReady] = useState(false);
const params = new URLSearchParams(window.location.search);
    const exerciseId = params.get('exerciseId');
    const subtitleId = params.get('subtitleId');
    const courseId= params.get('courseId');
 
   // const [exercise, setExercise] = useState(null)

  


    const [exercise, setExercise] =useState( async () => {
        const response = await axios.get(`http://localhost:8000/viewCorrectAnswers?subtitleId=${subtitleId}&exersiseId=${exerciseId}&courseId=${courseId}`)
            .catch((error) => alert(error.response.data.message))

        setExercise(response.data.exercises)
        //console.log(response.data.exercises)
        console.log('set')
        //console.log(response.data.exercises);
    })

   
    useEffect(() => {
        console.log('hereee')
        console.log(ready)
        if (exercise.questions){
            setReady(true)
            console.log('okaay')
            console.log(exercise)
        }

       
    }, [exercise])
    

    return (
        
        <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
      
            <TraineeNav post={{}} />
        
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
                        <Typography fontWeight={'bold'} color={'#03045E'} variant="h4" align='center'> The correct answers are</Typography>
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
                                            {question.mcqs[0]==question.correctAnswer &&<FormControlLabel value={question.mcqs[3]} control={<Radio 
                                            //disabled
                                            checked={question.mcqs[0]==question.correctAnswer}
                                            bgcolor="#CAF0F8"
                                           
                                            sx={{
                                                '&, &.Mui-checked': {
                                                    color: '00B4D8',
                                                },
                                                  bgcolor:"#CAF0F8" 
                                            }} />}
                                                label={question.mcqs[3]} />}
                                                 {question.mcqs[0]!=question.correctAnswer &&<FormControlLabel value={question.mcqs[3]} control={<Radio 
                                            //disabled
                                            checked={question.mcqs[0]==question.correctAnswer}
                                            bgcolor="#CAF0F8"
                                           
                                            sx={{
                                                '&, &.Mui-checked': {
                                                    color: '00B4D8',
                                                },
                                                 
                                            }} />}
                                                label={question.mcqs[0]} />}

{question.mcqs[1]==question.correctAnswer &&<FormControlLabel value={question.mcqs[1]} control={<Radio 
                                            //disabled
                                            checked={question.mcqs[1]==question.correctAnswer}
                                            bgcolor="#CAF0F8"
                                           
                                            sx={{
                                                '&, &.Mui-checked': {
                                                    color: '00B4D8',
                                                },
                                                  bgcolor:"#CAF0F8" 
                                            }} />}
                                                label={question.mcqs[1]} />}
                                                 {question.mcqs[1]!=question.correctAnswer &&<FormControlLabel value={question.mcqs[3]} control={<Radio 
                                            //disabled
                                            checked={question.mcqs[1]==question.correctAnswer}
                                            bgcolor="#CAF0F8"
                                           
                                            sx={{
                                                '&, &.Mui-checked': {
                                                    color: '00B4D8',
                                                },
                                                 
                                            }} />}
                                                label={question.mcqs[1]} />}

{question.mcqs[2]==question.correctAnswer &&<FormControlLabel value={question.mcqs[2]} control={<Radio 
                                            //disabled
                                            checked={question.mcqs[2]==question.correctAnswer}
                                            bgcolor="#CAF0F8"
                                           
                                            sx={{
                                                '&, &.Mui-checked': {
                                                    color: '00B4D8',
                                                },
                                                  bgcolor:"#CAF0F8" 
                                            }} />}
                                                label={question.mcqs[2]} />}
                                                 {question.mcqs[2]!=question.correctAnswer &&<FormControlLabel value={question.mcqs[3]} control={<Radio 
                                            //disabled
                                            checked={question.mcqs[2]==question.correctAnswer}
                                            bgcolor="#CAF0F8"
                                           
                                            sx={{
                                                '&, &.Mui-checked': {
                                                    color: '00B4D8',
                                                },
                                                 
                                            }} />}
                                                label={question.mcqs[2]} />}

                                            {question.mcqs[3]==question.correctAnswer &&<FormControlLabel value={question.mcqs[3]} control={<Radio 
                                            //disabled
                                            checked={question.mcqs[3]==question.correctAnswer}
                                            bgcolor="#CAF0F8"
                                           
                                            sx={{
                                                '&, &.Mui-checked': {
                                                    color: '00B4D8',
                                                },
                                                  bgcolor:"#CAF0F8" 
                                            }} />}
                                                label={question.mcqs[3]} />}
                                                 {question.mcqs[3]!=question.correctAnswer &&<FormControlLabel value={question.mcqs[3]} control={<Radio 
                                            //disabled
                                            checked={question.mcqs[3]==question.correctAnswer}
                                            bgcolor="#CAF0F8"
                                           
                                            sx={{
                                                '&, &.Mui-checked': {
                                                    color: '00B4D8',
                                                },
                                                 
                                            }} />}
                                                label={question.mcqs[3]} />}
                                        </RadioGroup>
                                    </FormControl>
                                    <Divider />
                                </div>
                            ))

                         
                        
                       

                                        }  
                       
                       <Button size='large'
                            sx={{ mt: 1, mb: 1, ml: 1, display: 'flex', flexDirection: 'column', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                            onClick={()=>{window.location.href=`course/${courseId}`}}
                        >
                            Back to course
                        </Button>

                    </div>

                }

            </Box>
        </Box>
    </ThemeProvider>




            // { ready && 
            //             <Box
            //             sx={{ml:'50%' , mt: 5}}
            //             component="main"
            //                 display="flex"
            //                 justifyContent="center"
            //                 alignItems="center"
            //                 minHeight="100vh"
            //             >
                          
            //                 <CircularProgress />
            //             </Box>

            //         }
            // {ready && 


/* <Box
component="main"
sx={{
  backgroundColor: '#FFFFFF',
  flexGrow: 1,
  height: '100vh',
  overflow: 'auto',
}}

>

{ready && exercise && exercise.questions.map((question) => (
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">{question.questionText}</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="controlled-radio-buttons-group"
                       
                    >
                        <FormControlLabel value={question.mcqs[0]} control={<Radio />} label={question.mcqs[0]} />
                        <FormControlLabel value={question.mcqs[1]} control={<Radio />} label={question.mcqs[1]} />
                        <FormControlLabel value={question.mcqs[2]} control={<Radio />} label={question.mcqs[2]} />
                        <FormControlLabel value={question.mcqs[3]} control={<Radio />} label={question.mcqs[3]} />

                    </RadioGroup>
                    <FormLabel id="label">The correct answer is: </FormLabel>
                    <FormLabel id="answer">{question.correctAnswer}</FormLabel>
                </FormControl>
            )
            )}

            <br></br>

           
        </Box> */
    )
}
export default ViewCorrectAnswer;