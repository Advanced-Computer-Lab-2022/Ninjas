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
import { Alert } from '@mui/material';
import { useState } from 'react';

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
      // switch (user.type) {
      //   case ('INDIVIDUAL_TRAINEE'):
      //     window.location.href = `/individualTrainee/${user._id}`; break;

      //   case ('CORPORATE_TRAINEE'):
      //     window.location.href = `/corporateTrainee/${user._id}`; break;

      //   case ('INSTRUCTOR'):
      //     window.location.href = `/instructor/${user._id}`; break;

      //   case ('ADMIN'):
      //     window.location.href = `/admin/${user._id}`; break;
      // }

      console.log(user.type);
    }
  };

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
      const user = response.data;
      // window.location.href = `/guest/${user._id}`;
    }
  }

  return (
    <div>
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
          {errMsg != '' &&
            <Alert variant="filled" severity="error">
              {errMsg}
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
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </div>
  );
}

export default Login;