import {Button,Typography,TextField} from "@mui/material";
import axios from "axios";
import {useState,useEffect} from "react";

 const change1 =()=>{
   window.location.href=`/view`
 }

 const  change2 =()=>{
    window.location.href=`/changePassword`
  }
  const  change3 =()=>{
    window.location.href=`/editEmail`
  }
  const  change4 =()=>{
    window.location.href=`/editBiography`
  }
  const  change5 =()=>{
    window.location.href=`/addDiscount`
  }
  const  change6 =()=>{
    window.location.href=`/terms`
  }



const InstructorProfile =() => {
    
    const[userId,setUserId]=useState('');
    const[details,setDetails]=useState('');

    const handleChangUserId = (event) => {
        setUserId(event.target.value);
    }
   

     const change = async ()=>{
        const response=await axios.get(`http://localhost:8000/viewMyDetails?userId=${userId}`).then((res) => { 
            const details = res.data
            setDetails(details)
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
  View My Details
 </Button> 


    
<div>
    <Typography>First Name: </Typography><Typography>{details.firstName}</Typography>
    <Typography>Last Name: </Typography><Typography>{details.lastName}</Typography>
    <Typography>Country: </Typography><Typography>{details.Country}</Typography>
    <Typography>Username: </Typography><Typography>{details.username}</Typography>
    <Typography>Email: </Typography><Typography>{details.email}</Typography>
    <Typography>Biography: </Typography><Typography>{details.biography}</Typography>


</div>

<div>
 <Button color="primary" variant="contained" onClick={()=> {change1()}}>
  View My Courses
 </Button> 
 <Button color="primary" variant="contained" onClick={()=> {change2()}}>
  Change Password
 </Button> 
 <Button color="primary" variant="contained" onClick={()=> {change3()}}>
  Edit Email
 </Button> 
 <Button color="primary" variant="contained" onClick={()=> {change4()}}>
  Edit Biography
 </Button>
 <Button color="primary" variant="contained" onClick={()=> {change5()}}>
  Add Discount
 </Button>
 <Button color="primary" variant="contained" onClick={()=> {change6()}}>
  View Terms
 </Button> 
 </div>  
       </div>
     );


    }

export default InstructorProfile;
