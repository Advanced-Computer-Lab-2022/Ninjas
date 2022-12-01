import {Button,Typography,TextField} from "@mui/material";
import axios from "axios";
import {useState,useEffect} from "react";



const Terms =() => {
   
    const[userId,setUserId]=useState('');
    const handleChangeUserId= (event) => {
        setUserId(event.target.value);
    }
     const change = async ()=>{
        const response=await axios.post(`http://localhost:8000/acceptContract/`,{userId:userId})
        .catch( (error) => alert(error.response.data.message))
        console.log(response.data)
        if(response.status===200){
            alert(response.data)
        }}

     return (
        <div>
<Typography>
  User Id
 </Typography>
 <TextField id="userId" label="User Id" variant="outlined" onChange={(event)=>{handleChangeUserId(event)}} />
  <Button color="primary" variant="contained" onClick={()=> {change()}}>
  Accept Contract & Terms
 </Button>
 <Typography>
  This is a contract to confirm agreement on all copyrights of all posted videos as well as percentage taken by the company on each video per registered trainee
 </Typography>


       </div>
     );


    }

export default Terms;
