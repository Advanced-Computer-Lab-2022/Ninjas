import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import ListItem from "@mui/material/ListItem";
import {useState,useEffect} from "react";
import axios from "axios";

export default function QuestionForm() {
  //const[title,setTitle]=useState('');
  const[questionText,setQuestionText]=useState('');
  const[mcq1,setMcq1]=useState('');
  const[mcq2,setMcq2]=useState('');
  const[mcq3,setMcq3]=useState('');
  const[mcq4,setMcq4]=useState('');
  const[correctAnswer,setCorrectAnswer]=useState('');
  const[totalCredit,setTotalCredit]=useState('');
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
const handleChangeCorrectAnswer= (event) => {
    setCorrectAnswer(event.target.value);
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

  //const params = new URLSearchParams(window.location.search);
  //const courseId = params.get('courseId')
  //const subtitleId = params.get('subtitleId')
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

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Questions
      </Typography>
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

        
   
    </React.Fragment>
  );
}