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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Alert, AlertTitle, Dialog, DialogTitle, IconButton } from '@mui/material';
import { useState } from 'react';
import FormControl from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
//import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';


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

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Ninjas ACL '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const Login = () => {
  const [errMsg, setMsg] = useState('');
  const [open,setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }
  const handleClose2 = () => {
    setOpen(false);
  }

  const handleSubmit = async (event) => {
    //when the sign in button is clicked this function is called
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username');
    if (!username || username.trim().length == 0) {
      setMsg("Please enter a username.");
      return;
    }
    const password = data.get('password');
    if (!password || password.trim().length == 0) {
      setMsg("Please enter a password.");
      return;
    }
    //call the backend to login the user
    const response = await axios.get(`http://localhost:8000/login?username=${username}&password=${password}`)
      .catch((error) => {
        console.log(error)
        setMsg(error.response.data.message)
      })

    if (response.status == 200) {
      //the response in case the login succeeds is the user object with all its details.
      const user = response.data;

      //we should check the user type, and redirect to the appropriate home page
      //we usually append the userId to the params so that we can use it later on
      switch (user.type) {
        case ('INDIVIDUAL_TRAINEE'):
          window.location.href = `/tHome`; break;

        case ('CORPORATE_TRAINEE'):

          window.location.href = `/tHome`; break;

        case ('INSTRUCTOR'):
          setType(2);
          if (user.companyPolicy && user.contractStatus) {
            window.location.href = `/iHome`;
          }
          else if (!user.companyPolicy)
          {
            setOpen2(true)
          }
          else if(!user.contractStatus){
            setOpen3(true)
          }
          break;


        case ('ADMIN'):
          window.location.href = `/Admin`; break;
      }

      console.log(user.type);
    }
  };

  const change = async () => {
    //updates the user (instructor) to accept the companyPolice=true
  }
  const [type, setType] = React.useState(0);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen2(true);
  };
  const handleClickOpen3 = () => {
    setOpen2(false);
    setOpen3(true);
  };
  const change2 = async () => {
    const response = await axios.post(`http://localhost:8000/acceptPolicy?`
    
    ).

      catch((error) => (error.response.data.message))
  
    console.log(response.data)

    if (response.status === 200) {
      handleClickOpen3();
    }

    //let errorsExist= false;
    //errorsExist = firstNameErr || lastNameErr || emailErr || passwordErr || confirmErr || genderErr || usernameErr;
    //setError(!errorsExist);
    //console.log(errorsExist)
    //if (errorsExist)
    //console.log(true);
    //else
    //handleClickOpen();

  }

  const change3 = async () => {
    const response = await axios.post(`http://localhost:8000/acceptContract?`
    
    ).

      catch((error) => (error.response.data.message))
  
    console.log(response.data)

    if (response.status === 200) {
       window.location.href = `/iHome`;
    }

    //let errorsExist= false;
    //errorsExist = firstNameErr || lastNameErr || emailErr || passwordErr || confirmErr || genderErr || usernameErr;
    //setError(!errorsExist);
    //console.log(errorsExist)
    //if (errorsExist)
    //console.log(true);
    //else
    //handleClickOpen();

  }

  const continueAsGuest = async () => {
    //what if we want to continue as a guest?
    //we have a standard guest user in the database that we can use in that case
    const response = await axios.get(`http://localhost:8000/login?username=guest123&password=123456`)
      .catch((error) => {
        console.log(error)
        setMsg(error.response.data.message)
      })

    if (response.status === 200) {
      console.log("guest login ", response.data)
      window.location.href = `/tHome`;
    }
  }

  return (
    
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {errMsg != '' &&
          <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>{errMsg}</strong>
        </Alert>

          }

          <Avatar sx={{ m: 1, bgcolor: '#00B4D8' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#00B4D8' }}
            >
              Sign In
            </Button>
            <Button fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, bgcolor: '#00D8' }}
              onClick={continueAsGuest}
            >
              CONTINUE AS GUEST
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open2}
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
                    1. The student/user who accessed more than 50% of the online course AND the student/user requests a refund, through the system.
                    There will be no refunds for any online courses (or curricula) once a student is done with 50% of the course's progress in any manner.
                  </Typography>
                  <Typography gutterBottom>
                    2. The student/user who only watched less than 50% of the course's vidoes will recieve a full refund will be issued.
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus sx={{ color: '#CAF0F8', backgroundColor: '#03045E', borderColor: '#03045E' }} onClick={() =>{ change2()}}>
                    Accept and Proceed
                  </Button>
                </DialogActions>
              </BootstrapDialog>


              <BootstrapDialog
                onClose={handleClose2}
                aria-labelledby="customized-dialog-title"
                open={open3}
              >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose2}>
                  <Typography gutterBottom component="h1" variant="h5">
                    Online Career Course Refund Policy
                  </Typography>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                  <Typography gutterBottom component="h1" variant="h5">
                  Company Rights and Responsibilities
                  </Typography>
                  <Typography gutterBottom>
                  The instructor has the right and responsibility to develop curricula and to establish general course content. 
                  All faculty possess the right to determine the instructional pedagogy in the courses that they are assigned within the given modality.
                  Courses Planet has all the rights to posted videos and materials.
                  </Typography>
                  <Typography gutterBottom component="h1" variant="h5">
                    Salary Policy
                  </Typography>
                  <Typography gutterBottom>
                  Salaries and/or wages are to be calculated monthly and paid semi-monthly according to number of registered trainees in
                  each course and course price.
                  Courses Plant has the right to 14% of the profits made on each video by number of registered trainees.
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus sx={{ color: '#CAF0F8', backgroundColor: '#03045E', borderColor: '#03045E' }} onClick={() =>{change3()}}>
                    Accept and Proceed
                  </Button>
                </DialogActions>
              </BootstrapDialog>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}

export default Login;