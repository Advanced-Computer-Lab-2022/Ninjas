import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/Container';
import {useState} from "react";
import axios from "axios";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Menu from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Toolbar } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
const [anchorEl, setAnchorEl] = React.useState(null);




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
    g:gender}).

    catch( (error) => alert(error.response.data.message))


    console.log(response.data)
    if(response.status===200){
        alert(response.data)
    }}
    

  return (
    <ThemeProvider theme={theme}>
       <Toolbar >
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
          <Avatar sx={{ m: 1, bgcolor: '#00B4D8' }}>
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
              &nbsp;
              <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label" >Gender</FormLabel>
      <RadioGroup
        row
        onClick={handleChangeGender}
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value={"FEMALE"} control={<Radio />} label="Female" />
        <FormControlLabel value={"MALE"} control={<Radio />} label="Male" />
      </RadioGroup>
    </FormControl>
   
    
           
      </Grid>
          
         
            
      <Button type="submit"
              fullWidth
              variant="contained"
              sx={{ color: '#CAF0F8', backgroundColor: '#03045E', borderColor: '#03045E' , mt: 3, mb: 2 }} onClick={handleClickOpen}>
        Sign Up
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <Typography gutterBottom component="h1" variant="h5">
        Online Career Course Refund Policy
        </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
          Students who register for a training course occasionally change their mind for one reason or another. 
          Regardless of the reason, we believe there should be a definite refund policy for students who decide not to take the course. 
          Refunds for online courses are only given under the following circumstances:
          </Typography>
          <Typography gutterBottom>
          1. The student/user did not access any portion of the online course AND the student/user requests a refund, in writing via email within three business days from the date of the registration (email notification sent). 
          There will be no refunds for any online courses (or curricula) once a course has been accessed in any manner.
          </Typography>
          <Typography gutterBottom>
          2. A full refund will be issued less an administrative fee of $100.
          </Typography>
          <Typography gutterBottom component="h1" variant="h5">
          Online Professional Development Refund Policy
          </Typography>
          <Typography gutterBottom>
          The student/user did not access any portion of the online course AND the student/user requests a refund, 
          in writing via email within 72 hours of enrolling in the course.
          We are unable to offer refunds after the exam has been attempted.
          </Typography>
          <Typography gutterBottom component="h1" variant="h5">
         Online Enrichment Course Refund Policy
          </Typography>
          <Typography gutterBottom>
The student/user did not access any portion of the online course AND the student/user requests a refund, in writing via email within 72 hours of enrolling in the course.
We are unable to offer refunds after the exam has been attempted.
A refund will be issued less the materials fee for the course.
        </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus sx={{ color: '#CAF0F8', backgroundColor: '#03045E', borderColor: '#03045E'  }} onClick={handleClose}>
            Accept and Proceed
          </Button>
        </DialogActions>
      </BootstrapDialog>
  
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
     
      </Container>
     </Toolbar>
   
      
    
    </ThemeProvider>
    
    
  );
}


