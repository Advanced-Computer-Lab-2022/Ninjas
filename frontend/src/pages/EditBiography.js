import {Button,Typography,TextField} from "@mui/material";
import axios from "axios";
import {useState,useEffect} from "react";



const EditBiography =() => {
    const[newText,setNewText]=useState('');
    const[userId,setUserId]=useState('');
    const handleChangeNewText = (event) => {
        setNewText(event.target.value);
    }
    const handleChangUserId = (event) => {
        setUserId(event.target.value);
    }
   

     const change = async ()=>{
        const response=await axios.put(`http://localhost:8000/editBiography/`,{userId:userId,
        newText:newText}).
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
Biography
 </Typography>
 <TextField id="newText" label="Biography" variant="outlined" onChange={(event)=>{handleChangeNewText(event)}}/>
 <Button color="primary" variant="contained" onClick={()=> {change()}}>
  Edit Biography
 </Button> 
       </div>
     );


    }

export default EditBiography;
