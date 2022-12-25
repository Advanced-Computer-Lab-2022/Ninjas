import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {useState,useEffect} from "react";
import axios from "axios";
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import { Box } from '@mui/system';
import ListItem from "@mui/material/ListItem";

export default function ExerciseForm() {
  const[title,setTitle]=useState('');
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
}
// const change2 = async ()=>{
//   const response=await axios.post(`http://localhost:8000/createExercise/`,{courseId:courseId,subtitleId:subtitleId , title:title})
//   .catch( (error) => alert(error.response.data.message))
//       console.log(response.data)
//   if(response.status===200){
//       alert(response.data)
//   }}
  return (
    <React.Fragment>
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
        
   
    </React.Fragment>
  );
}