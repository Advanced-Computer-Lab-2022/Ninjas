
import * as React from 'react';
import { styled, createTheme, ThemeProvider , alpha} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import logo from '../logo Ninjas.jpeg' ;
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import SettingsIcon from '@mui/icons-material/Settings'; //alll users
import HelpIcon from '@mui/icons-material/Help'; //all users
import ReportIcon from '@mui/icons-material/Report'; //all users
import CreateIcon from '@mui/icons-material/Create'; //instructor
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Wallet from '@mui/icons-material/Wallet';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import { searchtemp } from '../components/Search';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import {useState,useEffect} from "react";
import DialogActions from '@mui/material/DialogActions';
import { CircularProgress} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {TextField} from "@mui/material";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
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
export default function Temp() {
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
  const [open2, setOpen2] = React.useState(false);
  
  const[wait,setWait]=useState(false);
  const [emailSettings, setEmailSettings] = useState(false);
  const [passwordSettings, setPasswordSettings] = useState(false);
  const [countrySettings, setCountrySettings] = useState(false);
  const [biographySettings, setBiographySettings] = useState(false);

  const handleEmail = (event) => {
    setEmailSettings(true);
    setPasswordSettings(false);
    setCountrySettings(false);
    setBiographySettings(false);
};
const handlePassword = (event) => {
    setPasswordSettings(true);
    setEmailSettings(false);
    setCountrySettings(false);
    setBiographySettings(false);
   
};
const handleCountry = (event) => {
    setCountrySettings(true);
    setEmailSettings(false);
    setPasswordSettings(false);
    setBiographySettings(false);
   
};
const handleBiography = (event) => {
    setBiographySettings(true);
    setEmailSettings(false);
    setPasswordSettings(false);
    setCountrySettings(false);
   
};
  


 
  const handleClickBack = () => {
    setBiographySettings(false);
    setEmailSettings(false);
    setPasswordSettings(false);
    setCountrySettings(false);
    setOpen2(true);
  };
  const handleClickOpen = () => {
    setOpen2(true);
  };
  const handleClose = () => {
    setBiographySettings(false);
    setEmailSettings(false);
    setPasswordSettings(false);
    setCountrySettings(false);
    setOpen2(false);};

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const [editEmail, setEditEmail] = React.useState(false);
  const [editPassword, setEditPassword] = React.useState(false);
  const [editCountry, setEditCountry] = React.useState(false);
  const [editBiography,setEditBiography] = React.useState(false);



const handleChangeEmail = (event) => {
  setNewEmail(event.target.value)}

const handleChangeBiography = (event) => {
    setBiography(event.target.value)}

const handleChangeOldPassowrd = (event) => {
    setOldPassword(event.target.value)}

const handleChangeNewPassword = (event) => {
      setNewPassword(event.target.value)}
      const handleChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)}

const change = async ()=>{
  const response=await axios.put(`http://localhost:8000/editEmail/`,{
  newEmail:newEmail})
  .catch( (error) => alert(error.response.data.message))
  console.log(response.data)
  if(response.status===200){
      alert(response.data)
  }}

  const change2 = async ()=>{
    const response=await axios.put(`http://localhost:8000/editBiography/`,{
    newText:biography}).
    catch( (error) => alert(error.response.data.message))


    console.log(response.data)
    if(response.status===200){
        alert(response.data)
    }}

    const change3 = async ()=>{
      const response=await axios.put(`http://localhost:8000/changePassword/`,{
      oldPassword:oldPassword,
      newPassword:newPassword}).
      catch( (error) => alert(error.response.data.message))


      console.log(response.data)
      if(response.status===200){
          alert(response.data)
      }}



  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
//logout button function
const logout = async () => {
  const response = await axios.post('http://localhost:8000/logout')
  .catch(err => console.log(err));
  
  if(response.status===200)
  window.location.href='/';
}
const viewRatings = async () => {
  window.location.href='/Ratings';
}
const [user,setUser] = React.useState(async () => {
  await axios.get('http://localhost:8000/userBySession')
  .then(res => setUser(res.data))
  .catch(err => {
    if (err.response.status === 401) //you didn't login
    window.location.href='/';
  })
})
const[newEmail,setNewEmail]=useState(user.email);
const[biography,setBiography]=useState(user.biography);
const[oldPassword,setOldPassword]=useState('');
const[newPassword,setNewPassword]=useState('');
const[confirmPassword,setConfirmPassword]=useState('');
const [ready, setReady] = useState(false);
useEffect(() => {
    if (user._id) {
        setReady(true);
        setNewEmail(user.email);
        setBiography(user.biography);

        
    }
}, [user])

const handleKeypress = e => {
  //it triggers by pressing the enter key
if (e.key === 'Enter') {
  console.log('renteeer')
 // handleSearch(e)
  window.location.href=`/temp?userId=${user._id}&search=${e.target.value}`
}
};
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex'  }}>
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
              <MenuIcon />
            </IconButton >
            <Typography
              component="h1"
              variant="h6"
              bgcolor= '#03045E'
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <img  style={{ width: 150, height: 60 }} src={logo} alt="React Image" />
            </Typography >
            <Search  >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
             defaultValue = {searchtemp}
              //onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeypress}
              
            />
          </Search>
          &nbsp;&nbsp;
          <box>

          <ListItemButton  >
            <ListItemIcon >
          <HomeIcon sx={{color:'#CAF0F8' }} />
          </ListItemIcon>
          </ListItemButton>
          </box>
      
          <box>
          <Button variant="outlined" sx={{ color: 'white',  borderColor: '#CAF0F8' }} onClick={logout}>Log Out</Button>
          </box>
            
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
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          
          <Divider />
          <List component="nav">
          <ListItemButton>
            <ListItemIcon>
          <MenuBookIcon sx={{color:'black' }} />
          </ListItemIcon>
          <ListItemText primary='My Courses'/>
          </ListItemButton>
          <ListItemButton onClick={viewRatings} >
            <ListItemIcon>
          <StarIcon sx={{color:'black' }} />
          </ListItemIcon>
          <ListItemText primary='My Reviews'/>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
          <CreateIcon sx={{color:'black' }} />
          </ListItemIcon>
          <ListItemText primary='Create Course'/>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
          <Wallet sx={{color:'black' }} />
          </ListItemIcon>
          <ListItemText primary='Wallet'/>
          </ListItemButton>
          <ListItemButton onClick={handleClickOpen}>
            <ListItemIcon>
          <SettingsIcon sx={{color:'black' }} />
          </ListItemIcon>
          <ListItemText primary='Settings'/>
          </ListItemButton>
          {ready && 
    <div>
    
      <BootstrapDialog
     PaperProps={{
        sx: {
          
          height : '380px',
          width :'470px'
        }
      }}
      fullWidth='true'
      //maxWidth='sm' 
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open2}
      >
        
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
      
        
         
        </BootstrapDialogTitle>

{!emailSettings && !passwordSettings && !biographySettings && !countrySettings  && open &&

        <div>
            <ListItemIcon>
          <SettingsIcon sx={{color:'#757575' }} />
          <ListItemText primary='Account Settings' sx={{color:'black' }}/>
          </ListItemIcon>
        <Grid
        alignItems="center"
        justify="center">
        <Stack direction="row" spacing={2} ml={25}>
      <Avatar
        sx={{ bgcolor: '#03045E', width: 56, height: 56,ml:'5%'  }}
        alt={user.firstName}
        src="/broken-image.jpg"
      />

    </Stack>
    &nbsp;
        <Typography ml='45%'>
        {user.firstName} {user.lastName}
    </Typography>
    &nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;
    <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
        sx={{ width: '80%' , ml:3 }}
      >
    <Button key="one"  sx={{ color: 'black', backgroundColor: '#CAF0F8', borderColor: '#03045E',  borderRadius:0,border:"1px solid"}} onClick={()=> {handleEmail()}}>Email</Button>
    <Button key="two" sx={{ color: 'black', backgroundColor: '#CAF0F8', borderColor: '#03045E', borderRadius:0,border:"1px solid" }} onClick={()=> {handlePassword()}}>Password</Button>
    <Button key="three" sx={{ color: 'black', backgroundColor: '#CAF0F8', borderColor: '#03045E', borderRadius:0,border:"1px solid" }}  onClick={()=> {handleCountry()}}>Country</Button>
    <Button key="four" sx={{ color: 'black', backgroundColor: '#CAF0F8', borderColor: '#03045E' , borderRadius:0,border:"1px solid"}} onClick={()=> {handleBiography()}}>Biography</Button>
      </ButtonGroup>
      </Grid>
      </div>}


 {emailSettings && open &&
      <div>
        <IconButton
      aria-label="close"
      onClick={handleClickBack}
      sx={{
        position: 'absolute',
        right: 425,
        top: 8,
        color: (theme) => theme.palette.grey[500],
          }}
        >
 <ArrowBackIosIcon/>
 </IconButton>
        <Typography variant="h5" sx={{mt:-2.5 , ml:5}}>
            Email
        </Typography>
        <OutlinedInput 
            onChange={(event)=>{handleChangeEmail(event)}}
            sx={{mt:2 , ml:5}}
            label="Email"
            type= {editEmail} 
            defaultValue={newEmail}
            endAdornment={
              <InputAdornment position="end">
                <IconButton 
                 
                  aria-label="toggle password visibility"
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <CreateIcon /> : <CreateIcon />}
                </IconButton>
              </InputAdornment>
            }

          />
         <DialogActions>
          <Button sx={{mt:25 , ml:5, color: 'black', backgroundColor: '#CAF0F8', borderColor: '#03045E'}} autoFocus onClick={()=> {change()}}>
            Save Changes
          </Button>
        </DialogActions>
      </div> }

      {passwordSettings && open &&

      <div>
        <IconButton
      aria-label="close"
      onClick={handleClickBack}
      sx={{
        position: 'absolute',
        right: 425,
        top: 8,
        color: (theme) => theme.palette.grey[500],
          }}
        >
 <ArrowBackIosIcon/>
 </IconButton>

        <Typography variant="h5" sx={{mt:-2.5 , ml:5}}>
            Password
        </Typography>
        <TextField
        onChange={(event)=>{handleChangeOldPassowrd(event)}}
          type='password'
          sx={{mt:2 , ml:5}}
          label="Old Password"
          id="old Passowrd"
          defaultValue=""
        />
         <TextField
          onChange={(event)=>{handleChangeNewPassword(event)}}
         type='password'
         sx={{mt:1, ml:5}}
          label="New Passowrd"
          id="old Passowrd"
          defaultValue=""
        />
        <TextField
         onChange={(event)=>{handleChangeConfirmPassword(event)}}
        type='password'
        sx={{ mt:1,ml:5}}
          label="Confrim New Passowrd"
          id="old Passowrd"
          defaultValue=""
        />
    
   

           <DialogActions>
          <Button sx={{mt:8 , ml:5, color: 'black', backgroundColor: '#CAF0F8', borderColor: '#03045E'}} autoFocus onClick={()=> {change3()}}>
            Save changes
          </Button>
        </DialogActions>
      </div> }



{countrySettings && open &&

<div>
<IconButton
      aria-label="close"
      onClick={handleClickBack}
      sx={{
        position: 'absolute',
        right: 425,
        top: 8,
        color: (theme) => theme.palette.grey[500],
          }}
        >
 <ArrowBackIosIcon/>
 </IconButton>
<Typography variant="h5" sx={{mt:-2.5 , ml:5}}>
            Country
        </Typography>
<OutlinedInput
 sx={{mt:2 , ml:5}}
    label="Password"
    defaultValue={user.country}
    endAdornment={
      <InputAdornment position="end">
        <IconButton 
         
          aria-label="toggle password visibility"
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <CreateIcon /> : <CreateIcon />}
        </IconButton>
      </InputAdornment>
    }

  />
   <DialogActions>
          <Button sx={{mt:25 , ml:5, color: 'black', backgroundColor: '#CAF0F8', borderColor: '#03045E'}} autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
</div> }
{biographySettings && open &&


<div>
<IconButton
      aria-label="close"
      onClick={handleClickBack}
      sx={{
        position: 'absolute',
        right: 425,
        top: 8,
        color: (theme) => theme.palette.grey[500],
          }}
        >
 <ArrowBackIosIcon/>
 </IconButton>
<Typography variant="h5" sx={{mt:-2.5 , ml:5}}>
            Biography
        </Typography>
        <OutlinedInput
         onChange={(event)=>{handleChangeBiography(event)}}
         sx={{mt:2 , ml:5}}
            label="Password"
            defaultValue={biography}
            endAdornment={
              <InputAdornment position="end">
                <IconButton 
                 
                  aria-label="toggle password visibility"
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <CreateIcon /> : <CreateIcon />}
                </IconButton>
              </InputAdornment>
            }

          />
           <DialogActions>
          <Button sx={{mt:25 , ml:5, color: 'black', backgroundColor: '#CAF0F8', borderColor: '#03045E'}} autoFocus onClick={()=> {change2()}}>
            Save changes
          </Button>
        </DialogActions>
      </div>}
          
      </BootstrapDialog>
      </div>}
          <ListItemButton onClick={()=>{window.location.href='/myReports'}}>
            <ListItemIcon>
          <ReportIcon sx={{color:'black' }} />
          </ListItemIcon>
          <ListItemText primary='Report'/>
          </ListItemButton>
          </List>

        </Drawer>
      </Box>
    </ThemeProvider>
    
  );



} 


