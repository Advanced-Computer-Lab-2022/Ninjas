import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import QuestionForm from './QuestionForm';
import ExerciseForm from './ExerciseForm'
import Review from './Review';
import InstructorNav from './InstructorNav';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import ListItem from "@mui/material/ListItem";
import {useState,useEffect} from "react";
import axios from "axios";


const instructorNav = {};



const steps = ['Add Questions', 'Create Exercise'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <QuestionForm />;
    case 1:
      return <ExerciseForm />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    console.log('in');
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
    //const[title,setTitle]=useState('');
    const[questionText,setQuestionText]=useState('');
    const[mcq1,setMcq1]=useState('');
    const[mcq2,setMcq2]=useState('');
    const[mcq3,setMcq3]=useState('');
    const[mcq4,setMcq4]=useState('');
    const[correctAnswer,setCorrectAnswer]=useState('');
    const[totalCredit,setTotalCredit]=useState('');
    const params = new URLSearchParams(window.location.search);
   const courseId = params.get('courseId')
   const subtitleId = params.get('subtitleId')

   
    const handleChangeQuestionText = (event) => {
      setQuestionText(event.target.value);
  }
  const handleChangeMcq1 = (event) => {
      setMcq1(event.target.value);
  }
  const handleChangeMcq2 = (event) => {
      setMcq2(event.target.value);
  }
  const handleChangeMcq3 = (event) => {
      setMcq3(event.target.value);
  }
  const handleChangeMcq4 = (event) => {
      setMcq4(event.target.value);
  }

  const handleChangeTotalCredit = (event) => {
      setTotalCredit(event.target.value);
  }
  
  const [checked1,setcheck1] = useState(false);
  const [checked2,setcheck2] = useState(false);
  const [checked3,setcheck3] = useState(false);
  const [checked4,setcheck4] = useState(false);
  
  const handleChange1 = () => {
    setCorrectAnswer(mcq1);
    setcheck1(true);
    setcheck2(false);
    setcheck3(false);
    setcheck4(false);
    // console.log(correctAnswer);
  }
  const handleChange2 = () => {
    setCorrectAnswer(mcq2);
    setcheck1(false);
    setcheck2(true);
    setcheck3(false);
    setcheck4(false);
    // console.log(correctAnswer);
  }
  const handleChange3 = () => {
    setCorrectAnswer(mcq3);
    setcheck1(false);
    setcheck2(false);
    setcheck3(true);
    setcheck4(false);
    // console.log(correctAnswer);
  }
  const handleChange4 = () => {
    setCorrectAnswer(mcq4);
    setcheck1(false);
    setcheck2(false);
    setcheck3(false);
    setcheck4(true);
    // console.log(correctAnswer);
  }

  console.log(correctAnswer)
  

    const change = async ()=>{
      const response=await axios.post(`http://localhost:8000/addQuestion2/`,{questionText:questionText , mcq1:mcq1,mcq2:mcq2,
      mcq3:mcq3,mcq4:mcq4,correctAnswer:correctAnswer,totalCredit:totalCredit}
     ).catch( (error) => alert(error.response.data.message))
          console.log(response.data)
      if(response.status===200){
          alert(response.data)
      }}
  
    useEffect( () => {
      console.log(correctAnswer);
    },[correctAnswer])

    const[title,setTitle]=useState('');
    const handleChangeTitle = (event) => {
      setTitle(event.target.value);
  }

  const change2 = async ()=>{
  const response=await axios.post(`http://localhost:8000/createExercise/`,{courseId:courseId,subtitleId:subtitleId , title:title})
  .catch( (error) => alert(error.response.data.message))
      console.log(response.data)
  if(response.status===200){
      alert(response.data)
  }}


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Box sx={{ display: 'flex'  }}>
        
          <CssBaseline />
          <InstructorNav post={instructorNav}/>
          
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
      &nbsp;&nbsp;&nbsp;
      <Container component="main"  sx={{ mt: 10 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Create Exercise
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
           {activeStep==0?(<React.Fragment>
      <Grid container spacing={3}>
        <Grid item  md={6}>
          <TextField
            required
            id="Question Text"
            label="Question Text"
            fullWidth
            sx={{ width: '200%' }}
            onChange={(event)=>{handleChangeQuestionText(event)}}

          />
          
        <ListItem alignItems="center">
          <Checkbox
            checked={checked1}
            onChange={handleChange1}          
            inputProps={{ "aria-label": "primary checkbox" }}
            color="success"
          />
          <TextField
            fullWidth
            label="choice 1"
            onChange={(event)=>{handleChangeMcq1(event)}}
          />
           </ListItem>
           
           <ListItem alignItems="center">
          <Checkbox
            checked={checked3}
            onChange={handleChange3}          
            inputProps={{ "aria-label": "primary checkbox" }}
            color="success"
          />
          <TextField
            fullWidth
            label="choice 3"
            onChange={(event)=>{handleChangeMcq3(event)}}
          />
           </ListItem>
           <TextField 
            required
            id="Total Credit"
            label="Total Credit"
            fullWidth
            sx={{ width: '50%' ,ml:'75%' }}
            onChange={(event)=>{handleChangeTotalCredit(event)}}
       
          />
          
          
         
        </Grid>
        <Grid item  mt={7} md={6}>
       
          <ListItem alignItems="center" sx={{ml:-3.5}}>
          <Checkbox 
            checked={checked2}
            onChange={handleChange2}          
            inputProps={{ "aria-label": "primary checkbox" }}
            color="success"
          />
          <TextField
            fullWidth
            label="choice 2"
            onChange={(event)=>{handleChangeMcq2(event)}}
          />
           </ListItem>
           <ListItem alignItems="center" sx={{ml:-3.5}}>
          <Checkbox
            checked={checked4}
            onChange={handleChange4}          
            inputProps={{ "aria-label": "primary checkbox" }}
            color="success"
          />
          <TextField
            fullWidth
            label="choice 4"
            onChange={(event)=>{handleChangeMcq4(event)}}
          />
           </ListItem>
          </Grid>
        </Grid>
        <Button

variant="contained"
onClick={handleNext}
sx={{ mt: 3, ml: 1 }}>
  Next
  </Button>
  <Button onClick={()=> {change()}} sx={{ mt: 3, ml: 1 }}>
  Add Another Question
</Button>
        
   
    </React.Fragment>)
    :(<React.Fragment>
      <Typography variant="h6" gutterBottom>
        Questions
      </Typography>
      <Grid container spacing={3}>
        <Grid item  md={6}>
          <TextField
            required
            id="Exercise Text"
            label="Exercise Title"
            fullWidth
            onChange={(event)=>{handleChangeTitle(event)}}

          />
       
         
         
       
         
        </Grid>
        </Grid>
        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>

                  <Button
                variant="contained"
                onClick={()=> {change2()}}
                sx={{ mt: 3, ml: 1 }}
                
              >
                Add Exercise
                </Button>
        
   
    </React.Fragment>)}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Exercise Created Successfully!
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : null
          //(
            // // <React.Fragment>
            // //   <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                /* {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                {activeStep == 0 && (
                  <Button onClick={()=> {change()}} sx={{ mt: 3, ml: 1 }}>
                    Add Another Question
                  </Button
                )} */}

                
                  
                  {/* {activeStep === 0 ?

                  (
                  <div><Button

                  variant="contained"
                onClick={handleNext()}
                  sx={{ mt: 3, ml: 1 }}>
                    Next
                    </Button>
                    <Button onClick={()=> {change()}} sx={{ mt: 3, ml: 1 }}>
                    Add Another Question
                  </Button>
                    </div>)
                  :(
                    <div>
                       <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                  <Button
                variant="contained"
                onClick={change2()}
                sx={{ mt: 3, ml: 1 }}
                
              >
                Add Exercise
                </Button>
                </div>)}

                
               

              </Box>
            </React.Fragment>
          )} */
          }
        </Paper>
      
      </Container>
      </Box>
      </Box>
    </ThemeProvider>
  );
}