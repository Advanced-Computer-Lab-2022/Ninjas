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



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const ViewAllCourses =() => {
   
    const[username,setUserName]=useState('');
    const[courses,setCourses]=useState([]);
    const handleChangUserName = (event) => {
        setUserName(event.target.value);
    }

   
 
     const change = async ()=>{
        const response=await axios.get(`http://localhost:8000/view?username=${username}`
       ).then((res) => { 
        const courses = res.data
        setCourses(courses)
        
    })
        .catch( (error) => alert(error.response.data.message))


        console.log(response.data)
        if(response.status===200){
            alert(response.data)
        }}
        

    
     
     return (
        <div>
<Typography>
  Username 
 </Typography>
 <TextField id="username" label="username" variant="outlined" onChange={(event)=>{handleChangUserName(event)}} />
 
 <Button color="primary" variant="contained" onClick={()=> {change()}}>
  View My Courses
 </Button> 

 <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
        <StyledTableCell align="center">Course Title</StyledTableCell>
     
      </TableRow>
    </TableHead>
    <TableBody>
      {courses.map((course) => (
        
        <TableRow
        hover
        sx={{
            "&:hover":{
            cursor: "pointer",
            backgroundColor: "#f5f5f5",
            width: "100%"
            }
        }}
        onClick={() => window.location.href=`/getCourseRatings?courseId=${course._id}`}
          key={course._id}>
       
          <TableCell align="center">{course.title}</TableCell>
    
        </TableRow>


      )



      )}
    </TableBody>
  </Table>
</TableContainer>
</div>

 );}

export default ViewAllCourses;
