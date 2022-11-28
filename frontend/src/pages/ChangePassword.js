import {Button,Typography,TextField} from "@mui/material";
import axios from "axios";
import {useState,useEffect} from "react";


const ChangePassword =() => {
    const[oldPassword,setOldPassword]=useState('');
    const[newPassword,setNewPassword]=useState('');
    const[userId,setUserId]=useState('');
    const handleChangeOldPassword = (event) => {
        setOldPassword(event.target.value);
    }
    const handleChangeNewPassword = (event) => {
        setNewPassword(event.target.value);
    }
    const handleChangUserId = (event) => {
        setUserId(event.target.value);
    }
   

     const change = async ()=>{
        const response=await axios.put(`http://localhost:8000/changePassword/`,{userId:userId,
        oldPassword:oldPassword,
        newPassword:newPassword}).
        catch( (error) => alert(error.response.data.message))


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
  Old Password 
 </Typography>
 <TextField  id="oldPassword" label="old password" variant="outlined" onChange={(event)=>{handleChangeOldPassword(event)}}/>
 <Typography>
  New Password 
 </Typography>
 <TextField id="newPassword" label="new password" variant="outlined" onChange={(event)=>{handleChangeNewPassword(event)}}/>
 <Button color="primary" variant="contained" onClick={()=> {change()}}>
  Change Password
 </Button> 
       </div>
     );


    }

export default ChangePassword;
