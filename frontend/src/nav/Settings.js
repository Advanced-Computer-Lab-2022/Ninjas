import {Button,Typography,TextField} from "@mui/material";
import axios from "axios";
import {useState,useEffect} from "react";
import InstructorNav from './InstructorNav';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Container } from "@mui/system";

const instructorNav = {};

const theme = createTheme();
const ChangePassword =() => {
    const[oldPassword,setOldPassword]=useState('');
    const[newPassword,setNewPassword]=useState('');
    const[newText,setNewText]=useState('');
    const[newEmail,setNewEmail]=useState('');
    const handleChangeNewEmail = (event) => {
        setNewEmail(event.target.value);
    }
    const handleChangeNewText = (event) => {
        setNewText(event.target.value);
    }
    const handleChangeOldPassword = (event) => {
        setOldPassword(event.target.value);
    }
    const handleChangeNewPassword = (event) => {
        setNewPassword(event.target.value);
    }
   

     const change = async ()=>{
        const response=await axios.put(`http://localhost:8000/changePassword/`,{
        oldPassword:oldPassword,
        newPassword:newPassword}).
        catch( (error) => alert(error.response.data.message))


        console.log(response.data)
        if(response.status===200){
            alert(response.data)
        }}
        

    
     
     return (
        <ThemeProvider theme={theme}>
      <CssBaseline />
        <Box sx={{ display: 'flex'  }}>
        
          <CssBaseline />
          <InstructorNav post={instructorNav}/>
          
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >

<Container component="main"  sx={{ mt: 10 }}>
 <Typography>
  Old Password 
 </Typography>
 <TextField  id="oldPassword" label="old password" variant="outlined" onChange={(event)=>{handleChangeOldPassword(event)}}/>
 <Typography>
  New Password 
 </Typography>
 <TextField id="newPassword" label="new password" variant="outlined" onChange={(event)=>{handleChangeNewPassword(event)}}/>
 <Typography>
Biography
 </Typography>
 <TextField id="newText" label="Biography" variant="outlined" onChange={(event)=>{handleChangeNewText(event)}}/>
 <Typography>
  New Email
 </Typography>
 <TextField id="newEmail" label="new email" variant="outlined" onChange={(event)=>{handleChangeNewEmail(event)}}/>
 <Button color="primary" variant="contained" onClick={()=> {change()}}>
  Save All
 </Button> 
     
</Container>
      </Box>
      </Box>
    </ThemeProvider>
     );


    }

export default ChangePassword;
