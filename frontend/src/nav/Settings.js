import {Button,Typography,TextField} from "@mui/material";
import axios from "axios";
import {useState,useEffect} from "react";
import InstructorNav from './InstructorNav';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Container } from "@mui/system";
import CreateIcon from '@mui/icons-material/Create'; //instructor
import InputAdornment from '@mui/material/InputAdornment';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Alert, AlertTitle, Backdrop, CircularProgress} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grid from '@mui/material/Grid';
import * as React from 'react';

const instructorNav = {};

const theme = createTheme();

const ChangePassword =() => {
    const[oldPassword,setOldPassword]=useState('');
    const[newPassword,setNewPassword]=useState('');
    const[newText,setNewText]=useState('');
    const[newEmail,setNewEmail]=useState('');
    const[wait,setWait]=useState(false);
    const [user,setUser] = useState(async () => {
      await axios.get('http://localhost:8000/userBySession')
      .then(res => setUser(res.data))
      setWait(true)
      .catch(err => {
        if (err.response.status === 401) //you didn't login
        window.location.href='/';
      })
    })
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (user._id) {
            setReady(true);
        }
    }, [user])

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
        const [showPassword, setShowPassword] = React.useState(false);
        const [editEmail, setEditEmail] = React.useState(false);
        const [editPassword, setEditPassword] = React.useState(false);
        const [editCountry, setEditCountry] = React.useState(false);
        const [editBiography,setEditBiography] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleEditEmail = () => setEditEmail((show) => !show);
  const handleEditPassword = () => setEditPassword((show) => !show);
  const handleEditCountry = () => setEditCountry((show) => !show);
  const handleEditBiography= () => setEditBiography((show) => !show);
  


  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
        

    
     
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
            {
                        !ready &&
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            minHeight="100vh"
                        >
                            <CircularProgress />
                        </Box>

                    }
  {ready &&

<Container component="main"  sx={{ mt: 10 }}>
<Box component="form"  sx={{ mt: 3 }}>
              <Grid container spacing={2}>
<Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    disabled={true} 
                    defaultValue={user.firstName} 
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    disabled={true} 
                    defaultValue={user.lastName} 
                    autoComplete="family-name"
                  />
                </Grid>
        </Grid>

        <Grid container spacing={3} mt={1}>
<Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    disabled={true} 
                    defaultValue={user.username} 
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <OutlinedInput
            label="Biography"
            disabled={!editPassword} 

            type='password'
            defaultValue={user.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton 
                 
                  aria-label="toggle password visibility"
                  onClick={handleEditPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <CreateIcon /> : <CreateIcon />}
                </IconButton>
              </InputAdornment>
            }

          />
                </Grid>
        </Grid>

        <Grid container spacing={3} mt={1}>
<Grid item xs={12} sm={6}>
<OutlinedInput
            label="Biography"
            disabled={!editEmail} 
            type= {editEmail} 
            defaultValue={user.email}
            endAdornment={
              <InputAdornment position="end">
                <IconButton 
                 
                  aria-label="toggle password visibility"
                  onClick={handleEditEmail}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <CreateIcon /> : <CreateIcon />}
                </IconButton>
              </InputAdornment>
            }

          />

                </Grid>
                <Grid item xs={12} sm={6}>
                <OutlinedInput
            label="Biography"
            disabled={!editCountry} 
            type= {editCountry} 
            defaultValue={user.country}
            endAdornment={
              <InputAdornment position="end">
                <IconButton 
                 
                  aria-label="toggle password visibility"
                  onClick={handleEditCountry}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <CreateIcon /> : <CreateIcon />}
                </IconButton>
              </InputAdornment>
            }

          />
                </Grid>
        </Grid>
        
        <Grid container spacing={3} mt={1}>
<Grid item width={"200%"} xs={12} sm={6}>
<OutlinedInput
            label="Biography"
            disabled={!editBiography} 
            type= {editBiography} 
            defaultValue={user.biography}
            endAdornment={
              <InputAdornment position="end">
                <IconButton 
                 
                  aria-label="toggle password visibility"
                  onClick={handleEditBiography}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <CreateIcon /> : <CreateIcon />}
                </IconButton>
              </InputAdornment>
            }

          />
                </Grid>
                </Grid>
        
        </Box>

 








 
 <Button color="primary" variant="contained" onClick={()=> {change()}}>
  Save All
 </Button> 
     
</Container>}
      </Box>
      </Box>
    </ThemeProvider>

     );


    }

export default ChangePassword;
