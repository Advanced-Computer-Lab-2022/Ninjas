import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select,{SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/Container';
import FormControl from '@mui/material/Container';
import InputLabel from '@mui/material/Container';
import {useState,useEffect} from "react";
import axios from "axios";

import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Signup() {
  // username, firstName, lastName, email, password, gender
  const[firstName,setFirstName]=useState('');
  const[lastName,setLastName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[confirm,setConfirm]=useState('');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');

  

  const handleChangeGender = (event) => {
    setGender(event.target.value);
}
const handleChangeFirstName = (event) => {
  setFirstName(event.target.value);
}
const handleChangeLastName = (event) => {
  setLastName(event.target.value);
}
const handleChangeEmail = (event) => {
  setEmail(event.target.value);
}
const handleChangePassword = (event) => {
  setPassword(event.target.value);
}
const handleChangeConfirm = (event) => {
  setConfirm(event.target.value);
}

const handleChangeUsername = (event) => {
  setUsername(event.target.value);
}



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const change = async ()=>{
    window.location.href=`/`
    const response=await axios.post(`http://localhost:8000/signUp/`,{username:username,
     firstName:firstName, 
     lastName:lastName,
    email:email,
    password:password,
    gender:gender}).

    catch( (error) => alert(error.response.data.message))


    console.log(response.data)
    if(response.status===200){
        alert(response.data)
    }}
    

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={firstName === ""}
                  helperText={firstName === 2 ? 'Empty field!' : ' '}
                  onChange={(event)=>{handleChangeFirstName(event)}}
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
                  autoComplete="family-name"
                  onChange={(event)=>{handleChangeLastName(event)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="Username"
                  id="username"
                  autoComplete="new-password"
                  onChange={(event)=>{handleChangeUsername(event)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event)=>{handleChangeEmail(event)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(event)=>{handleChangePassword(event)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(event)=>{handleChangeConfirm(event)}}
                />
              </Grid>

        <div>
     
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-filled-label">Gender</InputLabel>
        <Select
          fullWidth
          //labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
         // value={gender}
          onChange={handleChangeGender}
          autoFocus
        >
          <MenuItem value="FEMALE">Female</MenuItem>
          <MenuItem value="MALE">Male</MenuItem>
        </Select>
      </FormControl>
    </div>
           
      </Grid>
          
         
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=> {change()}}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
        <Copyright sx={{ mt: 5 }} />
      </Container>
     
    </ThemeProvider>
    
  );
}


