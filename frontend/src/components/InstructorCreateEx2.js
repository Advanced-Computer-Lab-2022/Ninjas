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
// import QuestionForm from './QuestionForm';
// import ExerciseForm from './ExerciseForm'
// import Review from './Review';
import InstructorNav from '../nav/InstructorNav';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import ListItem from "@mui/material/ListItem";
import {useState,useEffect} from "react";
import axios from "axios";
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


const instructorNav = {};



const steps = ['Exercise Title', 'Add Questions'];



const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const[first,setFirst]=useState(0);
  const[titleErr,setTitleErr]=useState(false);
  const[open,setOpen]=useState(false);
  const[open2,setOpen2]=useState(false);



  const handleNext = () => {
    setFirst(1);
    setQuestionText("");
    if(!title=='')
    {
    setActiveStep(activeStep + 1);}
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setTitle(title);
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
  const [first2,setFirst2] = useState(0);

  console.log(correctAnswer)
 
  const handleChangeChange = async () => {
    setFirst2(1);
    if(!questionText=='' && !mcq1=='' && !mcq2=='' && !mcq3=='' && !mcq4=='' && !totalCredit=='' && !correctAnswer=='' ){

      const response=await axios.post(`http://localhost:8000/addQuestion2/`,{questionText:questionText , mcq1:mcq1,mcq2:mcq2,
      mcq3:mcq3,mcq4:mcq4,correctAnswer:correctAnswer,totalCredit:totalCredit}
     ).catch( (error) => alert(error.response.data.message))
          console.log(response.data)
      if(response.status===200){
          setQuestionText('');
          setMcq1('');
          setMcq2('');
          setMcq3('');
          setMcq4('');
          setTotalCredit('');
          setCorrectAnswer('');
          setFirst2(0);
      }

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
      //alert(response.data)
      setOpen2(true);
  }}

  const handleChangeChange2 = async ()=>{
    setOpen(true);

    // const response=await axios.post(`http://localhost:8000/createExercise/`,{courseId:courseId,subtitleId:subtitleId , title:title})
    // .catch( (error) => alert(error.response.data.message))
    //     console.log(response.data)
    // if(response.status===200){
    //     alert(response.data)
    // }

};
const handleClose6 = async () => {
    window.location.href=`/InstructorCreateEx2?courseId=${courseId}&subtitleId=${subtitleId}`; //proceed to create exercise
    setOpen(false);
  };
 const handleClose5 = async () => {
    window.location.href=`/InstructorSubtitle?courseId=${courseId}`; //proceed to create subtitle
    setOpen(false);
  };
  const handleClose7 = async () => {
    window.location.href='/InstructorCreate'; //proceed to create exercise
    setOpen(false);
  };
  const handleClose8 = async () => {
    window.location.href='/SearchInstructor'; //proceed to create exercise
    setOpen(false);
  };
  const handleClose500 = async () => {
    setOpen2(false);
  };


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
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
              </Stepper>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
           {activeStep==1?(<React.Fragment>
      <Grid container spacing={3}>
        <Grid item  md={6}>
          <TextField
          defaultValue=''
            error={first2==1 && questionText==''}
            required
            label={questionText === ""? "Question Text" : null}
            value = {questionText}
            sx={{ width: '170%' }}
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
          defaultValue={''}
          error={first2==1 && mcq1==''}
            fullWidth
            value = {mcq1}
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
          error={first2==1 && mcq3==''}
            fullWidth
            value = {mcq3}
            label="choice 3"
            onChange={(event)=>{handleChangeMcq3(event)}}
          />
           </ListItem>
          &nbsp;

          <Button variant="contained" onClick={handleBack}  sx={{ mt:0,ml:70 }}>
                    Back
                  </Button>
                  <Button variant="contained" onClick={()=> {change2()}} sx={{mt:-8,ml:108.5,width:'35%'}}>
  Add Exercise
</Button>
          <Button variant="contained" onClick={()=> {handleChangeChange()}} sx={{mt:-14,ml:80,width:'41%'}}>
              Add Another Question
        </Button>
        <br></br>
        <Button variant="contained" onClick={()=> {handleChangeChange2()}} sx={{mt:3,ml:1,width:'41%'}}>
              Further Actions
        </Button>



          
          
         
        </Grid>
        <Grid item  mt={7} md={6}>

        <TextField 
            required
            error={first2==1 && totalCredit==''}
            id="Total Credit"
            label="Total Credit"
            value = {totalCredit}
            fullWidth
            sx={{ width: '25%' ,ml:45,mt:-7 }}
            onChange={(event)=>{handleChangeTotalCredit(event)}}
       
          />
          <ListItem alignItems="center" sx={{ml:-3.5,mt:-3}}>
          <Checkbox 
            checked={checked2}
            onChange={handleChange2}          
            inputProps={{ "aria-label": "primary checkbox" }}
            color="success"
          />
          <TextField
          error={first2==1 && mcq2==''}
            fullWidth
            value = {mcq2}
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
          error={first2==1 && mcq4==''}
          value = {mcq4}
            fullWidth
            label="choice 4"
            onChange={(event)=>{handleChangeMcq4(event)}}
          />
           </ListItem>
           </Grid>
        </Grid>
     
        
   
    </React.Fragment>)
    :(<React.Fragment>
      <Grid container spacing={3}>
        <Grid item  md={6}>
          <TextField
          error={first==1 && title==''}
            required
            id="Exercise Text"
            label="Exercise Title"
            value = {title}
            sx={{ width: '75%'}}
            onChange={(event)=>{handleChangeTitle(event)}}

          />
       
         
         
       
         
        </Grid>
        </Grid>


                  <Button

variant="contained"
onClick={handleNext}
sx={{ mt: 3, ml: 1 }}>
  Next
  </Button>
<br></br>

        
   
    </React.Fragment>)}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Exercise Created Successfully!
              </Typography>
              <Typography variant="subtitle1">
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

       <Dialog onClose={open} open={open}
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

                                    Please choose your next action
        
                                </DialogTitle>

                                

                                 <Button
                                    sx={{ align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                    onClick={() => handleClose5()}
                                >
                                    Another Subtitle
                                </Button>

                                <Button
                                    sx={{ align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                    onClick={() => handleClose6()}
                                >
                                    Another Exercise
                                </Button>
                                <Button
                                    sx={{ align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                    onClick={() => handleClose7()}
                                >
                                    Another Course
                                </Button>

                                <Button
                                    sx={{ align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                    onClick={() => handleClose8()}
                                >
                                    Apply and Finish
                                </Button> 
                            </Dialog>

                            <Dialog onClose={open2} open={open2}
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

                                    Exercise Created Successfully        
                                </DialogTitle>

                                 <Button
                                    sx={{ align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                    onClick={() => handleClose500()}
                                >
                                    OK
                                </Button>

                               
                            </Dialog> 
      </Box>
      </Box>
    </ThemeProvider>
  );
}