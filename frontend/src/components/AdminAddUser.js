
import * as React from 'react';
import { styled, createTheme, ThemeProvider , alpha} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from '../logo Ninjas.jpeg' ;
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import mainListItems from './listItems';
import {useState,useEffect} from "react";
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

const  change2 =()=>{
  window.location.href=`/AdminViewReports`
}
const  change3 =()=>{
  window.location.href=`/AdminRefundRequests`
}
const  change4 =()=>{
  window.location.href=`/AdminAccessCourse`
}
const  change5 =()=>{
  window.location.href=`/AdminSetPromo`
}
const  change6 =()=>{
  window.location.href=`/AdminAddUser`
}

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
      {''}
      <Link color="inherit" >
      </Link>{' '}
      {''}
    </Typography>
  );
}
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
const Temp = () => {
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
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);


  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClose = async () => {
    window.location.href='/AdminAddUser';
    setOpen(false);
  };

  const handleClose2 = async () => {
   // window.location.href='/AdminAddUser';
    setOpen2(false);
  };
  const handleClose3 = async () => {
    // window.location.href='/AdminAddUser';
     setOpen3(false);
   };

  const handleClickOpen = async ()=>{
    setfirst2(1);
    if(username != '' && password !='' && firstName !='' && lastName!= '' && email != '' && gender != '' && type != ''){
      if(password == confirmPassword){
    const response = await axios.put(`http://localhost:8000/admin/create/`,{
    username:username,
    password:password,
    firstName:firstName,
    lastName:lastName,
    email: email,
    gender: gender,
    type: type,
    corporateName: corporate}).
    catch( (error) => alert(error.response.data.message)) 
    console.log(response.data)
    if(response.status===200){
      setOpen(true);

      // alert(response.data);
    }
  }
  else{
    setOpen3(true);
  }
}
  else{
    setOpen2(true);
  }
  
  }
 

  const[firstName,setFirstName]=useState('');
  const[lastName,setLastName]=useState('');
  const[username,setUsername]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[gender,setGender]=useState('');
  const[type,setType]=useState('');
  const[corporate,setCorporate]=useState('');
  const[confirmPassword,setConfirmPassword]=useState('');
  const [errMsg, setMsg] = useState('');
 const[first2, setfirst2] = useState(0);

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  }
  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  }
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  }
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }
  const handleChangeConfirm = (event) => {
    setConfirmPassword(event.target.value);
}
const handleChangeGender = (event) => {
  setGender(event.target.value);
}
const handleChangeType = (event) => {
  setType(event.target.value);
}
const handleChangeCorporate = (event) => {
  setCorporate(event.target.value);
}

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex'  }}>
        <CssBaseline />
        <AppBar position="absolute" >
          <Toolbar 
            sx={{
              pr: '24px', // keep right padding when drawer closed
              bgcolor: '#03045E'
            }}
          >
           
            <Typography
              component="h1"
              variant="h6"
              bgcolor= '#03045E'
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <img  style={{ width: 150, height: 60 }} src={logo} alt="React Image" />
            </Typography >
           
            <Box>
            
            </Box>
                       
              <Tabs sx={{color:'white', mt:2}} aria-label="basic tabs example">
                <Tab label="Reports" sx={{color:'#CAF0F8', ml:5}} onClick={()=> {change2()}}/>
                <Tab label="Refund Requests" sx={{color:'#CAF0F8', ml:5}} onClick={()=> {change3()}}/>
                <Tab label="Access Course Requests" sx={{color:'#CAF0F8', ml:5}} onClick={()=> {change4()}}/>
                <Tab label="Courses Promotion" sx={{color:'#CAF0F8', ml:5}} onClick={()=> {change5()}}/>
                <Tab label="Add User" sx={{color:'#CAF0F8', ml:5}} onClick={()=> {change6()}}/>
            
              </Tabs>
                    
                      &nbsp;&nbsp;&nbsp;
                      <box><Typography fontWeight={'bold'} sx={{ color: '#CAF0F8', ml:7}}>ADMIN</Typography></box>
                      &nbsp;&nbsp;&nbsp;          
                      <box>{mainListItems}</box>

          <box>

          <Button variant="contained"  sx={{ color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}>LOG OUT</Button>
          </box>
          &nbsp;&nbsp;&nbsp;
         
     
          </Toolbar>
        </AppBar>
      
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
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
             
            </Grid>
            <Copyright sx={{ pt: 4 }}  />
          </Container>
          <main>
          <Grid container spacing={2}  sx={{ ml: 5 }}>
          <Grid item xs={5}>
                <TextField
                  error={first2==1 && firstName==''}
                  required
                  fullWidth
                  name="First Name"
                  label="First Name"
                  type="First Name"
                  id="firstName"
                  autoComplete="First Name" onChange={(event)=>{handleChangeFirstName(event)}}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  error={first2==1 && lastName==''}
                  required
                  fullWidth
                  name="Last Name"
                  label="Last Name"
                  type="Last Name"
                  id="lastName"
                  autoComplete="Last Name" onChange={(event)=>{handleChangeLastName(event)}}
                />
              </Grid>
             
<Grid item xs={5}>
                <TextField 
                  error={first2==1 && username==''}
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  name="Usename"
                  autoComplete="Username" onChange={(event)=>{handleChangeUsername(event)}}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  error={first2==1 && email==''}
                  required
                  fullWidth
                  name="Email"
                  label="Email"
                  type="Email"
                  id="Email"
                  autoComplete="Email" onChange={(event)=>{handleChangeEmail(event)}}
                />
              </Grid>
        
              <Grid item xs={5}>
                <TextField
                  error={first2==1 && password==''}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password" onChange={(event)=>{handleChangePassword(event)}}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  error={first2==1 && confirmPassword==''}
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="new-password" onChange={(event)=>{handleChangeConfirm(event)}}
                />
              </Grid>
              <Grid item xs={5} sx={{ mt : 4}}>
              <FormControl >
              <FormLabel id="demo-radio-buttons-group-label" sx={{ ml:2, mb:1}}>Gender</FormLabel>
  <RadioGroup sx={{ml:2}}
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="female"
    name="radio-buttons-group"
  >
    <FormControlLabel value="FEMALE" control={<Radio />} label="female" onChange={(event)=>{handleChangeGender(event)}}/>
    <FormControlLabel value="MALE" control={<Radio />} label="male" onChange={(event)=>{handleChangeGender(event)}}/>
  
  </RadioGroup>
</FormControl >
</Grid>
              <FormControl  sx={{ mt : 6}}>
  <FormLabel id="demo-radio-buttons-group-label" sx={{ml:2, mb:1}}>Account Type</FormLabel>
  <RadioGroup sx={{ml:2}}
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="female"
    name="radio-buttons-group"
  >
    <FormControlLabel value="INSTRUCTOR" control={<Radio />} label="Instructor" onChange={(event)=>{handleChangeType(event)}}/>
    {/* <FormControlLabel value="INDIVIDUAL_TRAINEE" control={<Radio />} label="Individual Trainee" onChange={(event)=>{handleChangeType(event)}}/> */}
    <FormControlLabel value="CORPORATE_TRAINEE" control={<Radio />} label="Corporate Trainee" onChange={(event)=>{handleChangeType(event)}}/>
    <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" onChange={(event)=>{handleChangeType(event)}}/>

  </RadioGroup>
</FormControl>
              </Grid>
            
              <Grid item xs={5}  sx={{ml:7, mr: 24, mt: 2}}>
              <TextField
                  error={first2==1 && corporate==''}
                  required
                  fullWidth
                  name="corporate name"
                  label="Corporate Name only if user is corporate trainee otherwise write NA"
                  type="corporate name"
                  id="corporateName"
                  onChange={(event)=>{handleChangeCorporate(event)}}
                />
                </Grid>
                

             
<box>
                <Button variant="outlined" sx={{ color: 'white', backgroundColor:'#03045E', mt:2, ml: 7 }} 
                onClick={()=> {handleClickOpen()}}>Add User</Button>
</box>
<BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <Typography gutterBottom component="h1" variant="h5" sx={{color:'#03045E'}}>
          Alert
        </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            User Created Successfully
          </Typography>   
        </DialogContent>
        <DialogActions>
          <Button autoFocus sx={{ color: '#CAF0F8', backgroundColor: '#03045E', borderColor: '#03045E'  }} 
          onClick={() => handleClose()}>
            OK
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <BootstrapDialog
        onClose={handleClose2}
        aria-labelledby="customized-dialog-title"
        open={open2}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose2}>
        <Typography gutterBottom component="h1" variant="h5" sx={{color:'#03045E'}}>
          Alert
        </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Sorry you should fill all text boxes
          </Typography>   
        </DialogContent>
        <DialogActions>
          <Button autoFocus sx={{ color: '#CAF0F8', backgroundColor: '#03045E', borderColor: '#03045E'  }} 
          onClick={() => handleClose2()}>
            OK
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <BootstrapDialog
        onClose={handleClose3}
        aria-labelledby="customized-dialog-title"
        open={open3}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose3}>
        <Typography gutterBottom component="h1" variant="h5" sx={{color:'#03045E'}}>
          Alert
        </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Password and Confirm Password do not match
          </Typography>   
        </DialogContent>
        <DialogActions>
          <Button autoFocus sx={{ color: '#CAF0F8', backgroundColor: '#03045E', borderColor: '#03045E'  }} 
          onClick={() => handleClose3()}>
            OK
          </Button>
        </DialogActions>
      </BootstrapDialog>


          </main>



         
      


  
        </Box>
      </Box>
    </ThemeProvider>
    
  );



} 
export default Temp;

