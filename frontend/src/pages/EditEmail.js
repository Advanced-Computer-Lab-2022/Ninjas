import {Button,Typography,TextField} from "@mui/material";
import axios from "axios";
import {useState,useEffect} from "react";



const EditEmail =() => {
    const[oldEmail,setOldEmail]=useState('');
    const[newEmail,setNewEmail]=useState('');
    const[userId,setUserId]=useState('');
    const handleChangeOldEmail = (event) => {
        setOldEmail(event.target.value);
    }
    const handleChangeNewEmail = (event) => {
        setNewEmail(event.target.value);
    }
    const handleChangUserId = (event) => {
        setUserId(event.target.value);
    }
   
useEffect(()=>{console.log("old password: ",oldEmail)
    console.log("new password: ", newEmail)
    console.log("user id: ",userId)} ,[userId,oldEmail,newEmail])

     const change = async ()=>{
        const response=await axios.put(`http://localhost:8000/editEmail/`,{userId:userId,
        oldEmail:oldEmail,
        newEmail:newEmail})
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
 <Typography>
  Old Email 
 </Typography>
 <TextField  id="oldEmail" label="old Email" variant="outlined" onChange={(event)=>{handleChangeOldEmail(event)}}/>
 <Typography>
  New Email
 </Typography>
 <TextField id="newEmail" label="new email" variant="outlined" onChange={(event)=>{handleChangeNewEmail(event)}}/>
 <Button color="primary" variant="contained" onClick={()=> {change()}}>
  Change Email
 </Button> 
       </div>
     );


    }

export default EditEmail;
