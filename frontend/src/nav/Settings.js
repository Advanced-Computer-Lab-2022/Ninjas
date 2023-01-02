import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import axios from "axios";
import {useState,useEffect} from "react";
import { CircularProgress} from '@mui/material';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import CreateIcon from '@mui/icons-material/Create'; //instructor
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';
import SettingsIcon from '@mui/icons-material/Settings'; //alll users
import { ListItemIcon, ListItemText } from '@mui/material';
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

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  
  const[wait,setWait]=useState(false);
  const [passwordSettings, setPasswordSettings] = useState(false);
  const [countrySettings, setCountrySettings] = useState(false);


const handlePassword = (event) => {
    setPasswordSettings(true);
    setCountrySettings(false);
   
};
const handleCountry = (event) => {
    setCountrySettings(true);
    setPasswordSettings(false);
   
};

  const [user,setUser] = useState(async () => {
    await axios.get('http://localhost:8000/userBySession')
    .then(res => setUser(res.data))
    setWait(true)
    .catch(err => {
      if (err.response.status === 401) //you didn't login
      window.location.href='/';
    })
  })

  const[oldPassword,setOldPassword]=useState('');
  const[newPassword,setNewPassword]=useState('');
  const [ready, setReady] = useState(false);
  useEffect(() => {
      if (user._id) {
          setReady(true);

          
      }
  }, [user])
  const handleClickBack = () => {

    setPasswordSettings(false);
    setCountrySettings(false);
    setOpen(true);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setPasswordSettings(false);
    setCountrySettings(false);
    setOpen(false);};

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const [editPassword, setEditPassword] = React.useState(false);
  const [confrimPassword, setConfirmPassword] = React.useState(false);
  const [editCountry, setEditCountry] = React.useState(false);


const handleClickShowPassword = () => setShowPassword((show) => !show);
const handleEditPassword = () => setEditPassword((show) => !show);
const handleEditCountry = () => setEditCountry((show) => !show);


const handleChangeOldPassowrd = (event) => {
    setOldPassword(event.target.value)}

const handleChangeNewPassword = (event) => {
      setNewPassword(event.target.value)}
  const handleChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)}


    const change3 = async ()=>{
      const response=await axios.put(`http://localhost:8000/changePassword/`,{
      oldPassword:oldPassword,
      newPassword:newPassword}).
      catch( (error) => alert(error.response.data.message))


      console.log(response.data)
      if(response.status===200){
          alert(response.data)
      }}



  return (


    
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
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
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
        open={open}
      >
        
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
      
        
         
        </BootstrapDialogTitle>
{/* 
{!passwordSettings &&  !countrySettings  && open &&

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

    <Button key="two" sx={{ color: 'black', backgroundColor: '#CAF0F8', borderColor: '#03045E', borderRadius:0,border:"1px solid" }} onClick={()=> {handlePassword()}}>Password</Button>
    <Button key="three" sx={{ color: 'black', backgroundColor: '#CAF0F8', borderColor: '#03045E', borderRadius:0,border:"1px solid" }}  onClick={()=> {handleCountry()}}>Country</Button>

      </ButtonGroup>
      </Grid>
      </div>} */}




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

        </DialogActions>
      </div> 





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
</div> 

          
      </BootstrapDialog>
      </div>}
    
    </Box>
  );
}