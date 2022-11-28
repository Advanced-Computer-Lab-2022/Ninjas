import {Button,Typography,TextField} from "@mui/material";
import axios from "axios";
import {useState,useEffect} from "react";


const AddDiscount =() => {
    const[discountDuration,setdiscountDuration]=useState('');
    const[discount,setDiscount]=useState('');
    const[courseId,setCourseId]=useState('');
    const handleChangediscountDuration = (event) => {
        setdiscountDuration(event.target.value);
    }
    const handleChangeDiscount = (event) => {
        setDiscount(event.target.value);
    }
    const handleChangeCourseId = (event) => {
        setCourseId(event.target.value);
    }
   

     const change = async ()=>{
        const response=await axios.put(`http://localhost:8000/addDiscount/`,{courseId:courseId,
        discount:discount,
        discountDuration:discountDuration}).
        catch( (error) => alert(error.response.data.message))


        console.log(response.data)
        if(response.status===200){
            alert(response.data)
        }}
        

    
     
     return (
        <div>
<Typography>
  Course id 
 </Typography>
 <TextField id="id" label="courseId" variant="outlined" onChange={(event)=>{handleChangeCourseId(event)}} />
 <Typography>
  Discount
 </Typography>
 <TextField  id="discount" label="discount" variant="outlined" onChange={(event)=>{handleChangeDiscount(event)}}/>
 <Typography>
  Discount Duration
 </Typography>
 <TextField id="discountDuration" label="discountDuration" variant="outlined" onChange={(event)=>{handleChangediscountDuration(event)}}/>
 <Button color="primary" variant="contained" onClick={()=> {change()}}>
  Set Discount
 </Button> 
       </div>
     );


    }

export default AddDiscount;
