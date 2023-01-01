import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/Container';
import { useState, useEffect } from "react";
import axios from "axios";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
//import MenuItem from '@mui/material/MenuItem';
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
import { Alert, AlertTitle, FormHelperText, Toolbar } from '@mui/material';

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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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


  var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return re.test(email)
  };


  //handling errors in fields

  // const [firstNameErr, setFirstNameErr] = useState();
  // const [lastNameErr, setLastNameErr] = useState();
  // const [emailErr, setEmailErr] = useState();
  // const [passwordErr, setPasswordErr] = useState();
  // const [confirmErr, setConfirmErr] = useState();
  // const [genderErr, setGenderErr] = useState();
  // const [usernameErr, setUsernameErr] = useState();
  const[confirm,setConfirm]=useState('');
   const[responseErr, setresErr] = useState('');

  // const falsify = () => {
  //   setFirstNameErr(true);
  //   setLastNameErr(true);
  //   setEmailErr(true);
  //   setPasswordErr(true);
  //   setConfirmErr(true);
  //   setGenderErr(true);
  //   setUsernameErr(true);
  //   console.log("in in")
  // }

  // const allCorrect = () => {
  //   const bool = firstNameErr || lastNameErr || emailErr || passwordErr || confirmErr || genderErr || usernameErr;
  //   //they all have to be set to false
  //   return !bool;
  // }


  // const handleSubmit =  async (event)  => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);

  //   //set the values to false, in case something was corrected
  //   //falsify();
    
  //   //before proceeding we have to make sure that the data is correct
  //   if (data.get('firstName').trim().length < 2){
  //     setFirstNameErr(true);}
  //   else{
  //     setFirstNameErr(false);}
  //     console.log(firstNameErr)

  //   if (data.get('lastName').trim().length < 2)
  //     setLastNameErr(true);
  //     else
  //     setLastNameErr(false);

  //   if (!validateEmail(data.get('email')))
  //     setEmailErr(true);
  //     else
  //     setEmailErr(false);

  //   if (data.get('username').trim().length < 6)
  //     setUsernameErr(true);
  //     else
  //     setUsernameErr(false);

  //   if (data.get('password').trim().length < 6)
  //     setPasswordErr(true);
  //     else
  //     setPasswordErr(false);

  //   if (!(data.get('password') === data.get('confirmpassword')) || data.get('confirmpassword').trim().length < 6) //passwords do not match
  //     setConfirmErr(true);
  //     else
  //     setConfirmErr(false);


  //   if (!data.get('maleButton') && !data.get('femaleButton')) //they did not choose their gender
  //     setGenderErr(true);
  //     else
  //     setGenderErr(false);
  //    return; 
  //      console.log(firstNameErr);
  //   // if(firstNameErr==false && lastNameErr==false && emailErr==false && passwordErr==false && confirmErr==false && genderErr==false &&
  //   //   usernameErr==false  ){
  //   //     handleClickOpen();
  //   //     console.log("in")
  //   //     //setInital(true)
  //   // }
    
    
  //   // if(inital==true){
  //   //   handleClickOpen();
  //   // }


  //   //if all the inputs are valid, open the contract dialogue
  //   //let errorsExist= false;
  //   //errorsExist = firstNameErr || lastNameErr || emailErr || passwordErr || confirmErr || genderErr || usernameErr;
  //   //setError(!errorsExist);
  //  // console.log(errorsExist)
  //   //if (errorsExist)
  //   //console.log(true);
  //   //else
  //  // handleClickOpen();
  // };

  const[first, setFirst] = useState(0);

  const handleChangeChange2 =  async ()  => {
    setFirst(1);
    const response = await axios.get(`http://localhost:8000/signUpError?username=${username}&email=${email}`
    ).catch((error) => setresErr(error.response.data.message))
     console.log(response.data)

    if (response.status === 200) {
      }
      console.log(firstName)
    if(!firstName=='' && !lastName=='' && !username=='' && !email=='' && !password==''  ){
      console.log('in')
      handleClickOpen();
    }
      
  

  }
  const change = async () => {

   
    const response = await axios.post(`http://localhost:8000/signUp/`, {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      gender: gender,
    
    }).

      catch((error) => setresErr(error.response.data.message))
  
    console.log(response.data)

    if (response.status === 200) {
        window.location.href = `/`
    }


  }
  


  return (
    <ThemeProvider theme={theme}>
      <Toolbar >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {
              responseErr &&
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>{responseErr}</strong>
              </Alert>
            }
            <Avatar sx={{ m: 1, bgcolor: '#00B4D8' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form"   sx={{ mt: 3 }}>
               {/* //onSubmit={handleSubmit} */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={first==1 && firstName==''}
                    helperText={first==1 && firstName.length<2 ? "Please enter at least 2 characters." : null}
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(event) => { handleChangeFirstName(event) }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    error={first==1 && lastName==''}
                    helperText={first==1 && lastName.length<2 ? "Please enter at least 2 characters." : null}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(event) => { handleChangeLastName(event) }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={first==1 &&  username==''}
                    helperText={first==1 && username.length<2 ? "Please enter at least 6 characters." : null}
                    name="username"
                    label="Username"
                    id="username"
                    autoComplete="new-password"
                    onChange={(event) => { handleChangeUsername(event) }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={first==1 && email==''}
                    //helperText={emailErr ? "Please enter a valid email." : null}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(event) => { handleChangeEmail(event) }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={first==1 && password==''}
                    helperText={first==1 && password.length<2 ? "Please enter at least 6 characters." : null}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(event) => { handleChangePassword(event) }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    //error={}
                   // helperText={ ? "The two passwords do not match." : null}
                    name="confirmpassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmpassword"
                    autoComplete="new-password"
                    onChange={(event) => { handleChangeConfirm(event) }}
                  />
                </Grid>
                &nbsp;
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label" >
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    onClick={handleChangeGender}
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel name="femaleButton" value={"FEMALE"} control={<Radio />} label="Female" />
                    <FormControlLabel name="maleButton" value={"MALE"} control={<Radio />} label="Male" />

                  </RadioGroup>
                  {
                    gender.length=='' && first==1 &&
                    <FormHelperText sx={{ color: '#cc0000' }}> Please choose a gender. </FormHelperText>
                  }
                </FormControl>



              </Grid>



              <Button 
                fullWidth
                variant="contained"
                sx={{ color: '#CAF0F8', backgroundColor: '#03045E', borderColor: '#03045E', mt: 3, mb: 2 }}
                onClick={()=> {handleChangeChange2()}}
                //onSubmit={handleSubmit}
                >
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
                  <Button autoFocus sx={{ color: '#CAF0F8', backgroundColor: '#03045E', borderColor: '#03045E' }} onClick={change}>
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