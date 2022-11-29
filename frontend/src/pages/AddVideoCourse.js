import {Button,Typography,TextField} from "@mui/material";
import axios from "axios";
import {useState,useEffect} from "react";



const AddVideoCourse =() => {
    const[link,setLink]=useState('');
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('courseId')
    const handleChangeLink= (event) => {
        setLink(event.target.value);
    }
    


     const change = async ()=>{
        const response=await axios.post(`http://localhost:8000/addVideoCourse/`,{courseId:courseId,
        videoLink:link})
        .catch( (error) => alert(error.response.data.message))


        console.log(response.data)
        if(response.status===200){
            alert(response.data)
        }}

    
     
     return (
        <div>
<Typography>
  Video Link
 </Typography>
 <TextField id="id" label="userId" variant="outlined" onChange={(event)=>{handleChangeLink(event)}} />
  <Button color="primary" variant="contained" onClick={()=> {change()}}>
  Add Video
 </Button> 
       </div>
     );


    }

export default AddVideoCourse;
