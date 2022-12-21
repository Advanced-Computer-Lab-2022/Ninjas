
import * as React from 'react';
import { styled, createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import logo from '../logo Ninjas.jpeg';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import SettingsIcon from '@mui/icons-material/Settings'; //alll users
import HelpIcon from '@mui/icons-material/Help'; //all users
import ReportIcon from '@mui/icons-material/Report'; //all users
import CreateIcon from '@mui/icons-material/Create'; //instructor
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; //instructor
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'; //certificates trainess
import { Alert, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material';
import Wallet from '@mui/icons-material/Wallet';
import axios from 'axios';
import { useState } from 'react';




const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const drawerWidth = 240;
const ForgotPasswordPage = () => {
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

  const [username, setUsername] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const handleChange = (event) => {
    //sets the username to the selected one
    setUsername(event.target.value);
  };

  const sendEmail = async () => {
    setErr("");
    const response = await axios.post(`http://localhost:8000/forgotPassword`, { username })
      .catch((error) => {
        setDone(false);
        console.log(error)
        setErr(error.response.data.message)
      })
    //clear the error message if it was previously set
    console.log(response.data.message)
    setDone(true)
  }


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
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
              onClick={() => window.location.href='/'}>
              Sign In</Button>
            </box>
            &nbsp;&nbsp;&nbsp;
            <box>
              <Button variant="outlined" sx={{ color: 'white', borderColor: '#CAF0F8' }} onClick={() => window.location.href='/signUp'}>
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

        <TextField required onChange={handleChange} label="Enter your username" sx={{ mb: 3, mt: 3, width: '30%' }} />
        <Button variant="outlined" sx={{ align: 'center', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
          onClick={sendEmail}>
          Send Email</Button>

        {done &&
          <Alert severity="success" sx={{ mt: 5 }}>
            A reset password link has been sent to your email.
          </Alert>
        }

        {err !== "" &&
          <Alert severity="error" sx={{ mt: 5 }}>{err}</Alert>
        }
      </Box>

    </ThemeProvider>

  );



}
export default ForgotPasswordPage;

