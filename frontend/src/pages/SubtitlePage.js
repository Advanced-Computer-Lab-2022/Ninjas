import {Button,Typography,TextField} from "@mui/material";
import axios from "axios";
import {useState,useEffect} from "react";

import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';  
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';





const SubtitlePage =() => {
    const[add,setAdd]=useState(1);
    const[title,setTitle]=useState('');
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
    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }
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

   
 
     const change = async ()=>{
        const response=await axios.post(`http://localhost:8000/addQuestion2/`,{questionText:questionText , mcq1:mcq1,mcq2:mcq2,
        mcq3:mcq3,mcq4:mcq4,correctAnswer:correctAnswer,totalCredit:totalCredit}
       ).then((res) => { 
        setAdd(1)})
        .catch( (error) => alert(error.response.data.message))
            console.log(response.data)
        if(response.status===200){
            alert(response.data)
        }}
    const change2 = async ()=>{
        const response=await axios.post(`http://localhost:8000/createExercise/`,{courseId:courseId,subtitleId:subtitleId , title:title})
        .catch( (error) => alert(error.response.data.message))
            console.log(response.data)
        if(response.status===200){
            alert(response.data)
        }}
    const change3=async()=>{
        setAdd(2)
    }
        

    
     

    if (add==1){
    return (<div>
<Typography>
  Question Title 
 </Typography>
 <TextField id="questionT" label="Question Title" variant="outlined" onChange={(event)=>{handleChangeQuestionText(event)}} />

 <Typography>
  Choice 1
 </Typography>
 <TextField id="mcq1" label="Choice 1" variant="outlined" onChange={(event)=>{handleChangeMcq1(event)}} />

 <Typography>
  Choice 2
 </Typography>
 <TextField id="mcq2" label="Choice 2" variant="outlined" onChange={(event)=>{handleChangeMcq2(event)}} />

 <Typography>
  Choice 3
 </Typography>
 <TextField id="mcq3" label="Choice 3" variant="outlined" onChange={(event)=>{handleChangeMcq3(event)}} />

 <Typography>
  Choice 4
 </Typography>
 <TextField id="mcq4" label="Choice 4" variant="outlined" onChange={(event)=>{handleChangeMcq4(event)}} />

 <Typography>
  Correct Choice
 </Typography>
 <TextField id="correctAnswer" label="Correct Answer" variant="outlined" onChange={(event)=>{handleChangeCorrectAnswer(event)}} />

 <Typography>
  Question Total Credit
 </Typography>
 <TextField id="totalCredit" label="Total Credit" variant="outlined" onChange={(event)=>{handleChangeTotalCredit(event)}} />
 
 <Button color="primary" variant="contained" onClick={()=> {change()}}>
  Add Question
 </Button> 

 <Button color="primary" variant="contained" onClick={()=> {change3()}}>
Continue
</Button> 
 
</div>)};


if(add==2) {
return(
<div>
<Typography>
  Exercise Title
 </Typography>
 <TextField id="exerciseTitle" label="Exercise Title" variant="outlined" onChange={(event)=>{handleChangeTitle(event)}} />
<Button color="primary" variant="contained" onClick={()=> {change2()}}>
Add Exercise
</Button> 
</div>)
    }

};

export default SubtitlePage;
