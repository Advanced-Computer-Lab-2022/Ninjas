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
import { Alert, AlertTitle, Backdrop, CircularProgress} from '@mui/material';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import CreateIcon from '@mui/icons-material/Create'; //instructor
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';

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
  const [user,setUser] = useState(async () => {
    await axios.get('http://localhost:8000/userBySession')
    .then(res => setUser(res.data))
    setWait(true)
    .catch(err => {
      if (err.response.status === 401) //you didn't login
      window.location.href='/';
    })
  })

  const [ready, setReady] = useState(false);
  useEffect(() => {
      if (user._id) {
          setReady(true);
      }
  }, [user])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setBiographySettings(false);
    setEmailSettings(false);
    setPasswordSettings(false);
    setCountrySettings(false);
    setOpen(false);};

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const [editEmail, setEditEmail] = React.useState(false);
  const [editPassword, setEditPassword] = React.useState(false);
  const [editCountry, setEditCountry] = React.useState(false);
  const [editBiography,setEditBiography] = React.useState(false);

const handleClickShowPassword = () => setShowPassword((show) => !show);
const handleEditEmail = () => setEditEmail((show) => !show);
const handleEditPassword = () => setEditPassword((show) => !show);
const handleEditCountry = () => setEditCountry((show) => !show);
const handleEditBiography= () => setEditBiography((show) => !show);


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
          Account Settings 
        </BootstrapDialogTitle>

{!emailSettings && !passwordSettings && !biographySettings && !countrySettings  && open &&

        <div>
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
        <Typography>
            Email
        </Typography>
        <OutlinedInput
            label="Email"
            type= {editEmail} 
            defaultValue={user.email}
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
          <Button autoFocus onClick={handleClose}>
            Save Changes
          </Button>
        </DialogActions>
      </div> }

      {passwordSettings && open &&

      <div>
        <Typography>
            Password
        </Typography>
        <OutlinedInput
            label="Password"
            type='password'
            defaultValue={user.password}
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
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </div> }



{countrySettings && open &&

<div>
<Typography>
            Country
        </Typography>
<OutlinedInput
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
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
</div> }
{biographySettings && open &&


<div>
<Typography>
            Biography
        </Typography>
        <OutlinedInput
            label="Password"
            defaultValue={user.biography}
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
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </div>}
          
      </BootstrapDialog>
      </div>}
    
    </Box>
  );
}