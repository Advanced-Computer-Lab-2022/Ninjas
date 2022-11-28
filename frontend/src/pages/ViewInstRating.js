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

var overallRating = 0;


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const ViewInstRating =() => {
   
    const[userId,setUserId]=useState('');
    const[reviews,setReviews]=useState([]);
    const handleChangUserId = (event) => {
        setUserId(event.target.value);
    }

    useEffect(()=>{
    
    console.log("user id: ",userId)} ,[userId])

 
     const change = async ()=>{
        const response=await axios.get(`http://localhost:8000/viewInstReview?userId=${userId}`
       ).then((res) => { 
        const reviews = res.data
        setReviews(reviews)
        
    })
        .catch( (error) => alert(error.response.data.message))


        console.log(response.data)
        if(response.status===200){
            alert(response.data)
        }}
        

    
     
     return (
        <div>
<Typography>
  User id 
 </Typography>
 <TextField id="id" label="userId" variant="outlined" onChange={(event)=>{handleChangUserId(event)}} />
 
 <Button color="primary" variant="contained" onClick={()=> {change()}}>
  View My Ratings & Reviews
 </Button> 

 <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
        <StyledTableCell align="center">first name</StyledTableCell>
        <StyledTableCell align="center">last name</StyledTableCell>
        <StyledTableCell align="center">text</StyledTableCell>
        <StyledTableCell align="center">rating</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {reviews.map((review) => (
        
        <TableRow
        
      

          >
            

          <TableCell align="center">{review.firstName}</TableCell>
          <TableCell align="center">{review.lastName}</TableCell>
          <TableCell align="center">{review.text}</TableCell>
          <TableCell align="center">{review.rating}</TableCell>

        </TableRow>


      )



      )}
    </TableBody>
  </Table>
</TableContainer>




   





    </div>


    

     );


    }

export default ViewInstRating;
