import {Button,Typography,TextField} from "@mui/material";
import axios from "axios";
import {useState,useEffect} from "react";



const AddVideoSubtitle =() => {
    const[title,setTitle]=useState('');
    const[link,setLink]=useState('');
    const[description,setDescription]=useState('');
    const params = new URLSearchParams(window.location.search);
    const subtitleId = params.get('subtitleId')
    const[sub,setSub]=useState(subtitleId)
    const handleChangeLink= (event) => {
        setLink(event.target.value);
    }
    const handleChangeTitle= (event) => {
        setTitle(event.target.value);
    }
    const handleChangeDescription= (event) => {
        setDescription(event.target.value);
    }
    


     const change = async ()=>{
        const response=await axios.post(`http://localhost:8000/addVideo/`,{subtitleId:subtitleId,
        title:title,link:link,description:description})
        .catch( (error) => alert(error.response.data.message))


        console.log(response.data)
        if(response.status===200){
            alert(response.data)
        }}

    
     
     return (
        <div>
<Typography>
  Title
 </Typography>
 <TextField id="Title" label="Title" variant="outlined" onChange={(event)=>{handleChangeTitle(event)}} />
<Typography>
  Video Link
 </Typography>
 <TextField id="id" label="Video Link" variant="outlined" onChange={(event)=>{handleChangeLink(event)}} />
 <Typography>
  Description
 </Typography>
 <TextField id="id" label="Video Description" variant="outlined" onChange={(event)=>{handleChangeDescription(event)}} />
  <Button color="primary" variant="contained" onClick={()=> {change()}}>
  Add Video
 </Button>
 


       </div>
     );


    }

export default AddVideoSubtitle;
