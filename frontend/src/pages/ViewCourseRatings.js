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

var m=0;
var x=""
var y=""
var z=""
var t=""

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const ViewCourseRatings =() => {
   
    const[reviews,setReviews]=useState([]);
    const[subtitles,setSubtitles]=useState([]);
   const params = new URLSearchParams(window.location.search);
   const courseId = params.get('courseId')
   console.log(courseId)
 

   
 
     const change = async ()=>{
        const response=await axios.get(`http://localhost:8000/getCourseRatings?courseId=${courseId}`
       ).then((res) => { 
        const reviews = res.data
        setReviews(reviews)
        m=1;
        
    })
        .catch( (error) => alert(error.response.data.message))
        console.log(response.data)
        if(response.status===200){
            alert(response.data)
        }}

        const change2 = async ()=>{
            const response=await axios.get(`http://localhost:8000/getCourseSubtitles?courseId=${courseId}`
           ).then((res) => { 
            const subtitles = res.data
            setSubtitles(subtitles)
            m=2
            
        })
            .catch( (error) => alert(error.response.data.message))
            console.log(response.data)
        if(response.status===200){
            alert(response.data)
        }}

        if(m==1){
        x="first name"
        y="last name"
        z="rating"
        t="text"
            
        }
        if(m==2){
            x="Name"
        y="Hours"
        z="Video Title"
        t="Exercise"
        }


        
        

    
     
     return (
        <div>

 <Button color="primary" variant="contained" onClick={()=> {change()}}>
  View Course Reviews
 </Button> 

 <Button color="primary" variant="contained" onClick={()=> {change2()}}>
  View Course Subtitles
 </Button> 

 <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
        <StyledTableCell align="center">{x}</StyledTableCell>
        <StyledTableCell align="center">{y}</StyledTableCell>
        <StyledTableCell align="center">{z}</StyledTableCell>
        <StyledTableCell align="center">{t}</StyledTableCell>

     
      </TableRow>
    </TableHead>
    <TableBody>
      {reviews.map((review) => (
        
        <TableRow>
       
       
          <TableCell align="center">{review.firstName}</TableCell>
          <TableCell align="center">{review.lastName}</TableCell>
          <TableCell align="center">{review.rating}</TableCell>
          <TableCell align="center">{review.text}</TableCell>

    
        </TableRow>


      )



      )}
      {subtitles.map((subtitle) => (
        
        <TableRow>
       
       
          <TableCell align="center">{subtitle.text}</TableCell>
          <TableCell align="center">{subtitle.hours}</TableCell>
          <TableCell align="center">{subtitle.videoTtiles}</TableCell>
          <TableCell align="center">{subtitle.exercises}</TableCell>

    
        </TableRow>


      )



      )}
    </TableBody>
  </Table>
</TableContainer>
</div>

 );}

export default ViewCourseRatings;
