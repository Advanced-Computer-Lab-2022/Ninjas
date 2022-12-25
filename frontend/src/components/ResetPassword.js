
import * as React from 'react';
import { styled, createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import logo from '../logo Ninjas.jpeg';
import Button from '@mui/material/Button';
import { Alert, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material';
import Wallet from '@mui/icons-material/Wallet';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';



const drawerWidth = 240;
const ResetPasswordPage = () => {
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

  const mdTheme = createTheme();

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { id: userId } = useParams();
  const [password, setPassword] = useState('');
  const [confirmedPassword, setconfPassword] = useState('');
  const [changed, setChanged] = useState(false);
  const [err, setErr] = useState('')


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setconfPassword(event.target.value);
  };

  const resetPass = async () => {
    setErr("")
    if (!password || password.trim().length == 0)
      return setErr('Please enter a password.');

    if (password != confirmedPassword)
      return setErr('Please make sure that both passwords match.');

    const response = await axios.post(`http://localhost:8000/resetPassword/${userId}`, { password })
      .catch((error) => {
        console.log(error)
        setErr(error.response.data.message)
      })

    if (response.status == 201)
      setChanged(true);

  }



  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
              bgcolor: '#03045E'
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
            </IconButton >
            <Typography
              component="h1"
              variant="h6"
              bgcolor='#03045E'
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <img style={{ width: 150, height: 60 }} src={logo} alt="React Image" />
            </Typography >
            &nbsp;&nbsp;&nbsp;
            <box>

              <Button variant="contained" sx={{ color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                onClick={() => window.location.href = '/'}>
                Sign In</Button>
            </box>
            &nbsp;&nbsp;&nbsp;
            <box>
              <Button variant="outlined" sx={{ color: 'white', borderColor: '#CAF0F8' }} onClick={() => window.location.href = '/signUp'}>
                Sign Up</Button>
            </box>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon  />
              </Badge>
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >

          </Toolbar>
          <Divider />
        </Drawer>
      </Box>
      <Box display="flex"
        mt={10}
        mb={1}
        flexDirection="column"
        alignItems="center"
        justifyContent="center">

        <TextField
          margin="normal"
          required
          sx={{ mb: 3, mt: 3, width: '30%' }}
          id="password"
          label="Password"
          type="password"
          name="password"
          onChange={handlePasswordChange}
        />
        <TextField
          margin="normal"
          required
          sx={{ mb: 5, mt: 3, width: '30%' }}
          name="cpassword"
          label="Confirm Password"
          type="password"
          id="cpassword"
          onChange={handleConfirmPasswordChange}
        />
        <Button variant="outlined" sx={{ align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
          onClick={resetPass}
        > Reset my Password </Button>

        {
          changed &&
          <Alert sx={{ mt: 5 }}
            action={
              <Button color="inherit" size="medium" onClick={() => window.location.href = `/`}
              >
                GO TO LOGIN
              </Button>
            }
          >
            Your password has been changed successfully.
          </Alert>
          }

        {err !== "" &&
          <Alert severity="error" sx={{ mt: 5 }}>{err}</Alert>
        }
      </Box>

    </ThemeProvider>

  );



}
export default ResetPasswordPage;

