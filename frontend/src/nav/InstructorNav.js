
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
import DialogContent from '@mui/material/DialogContent';


import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';

const countryEnums = [
  'Afghanistan',
  'AlandIslands',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Bouvet Island',
  'Brazil',
  'British Indian Ocean Territory',
  'Brunei Darussalam',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Cayman Islands',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Christmas Island',
  'Cocos Keeling Islands',
  'Colombia',
  'Comoros',
  'Congo',
  'Congo Democratic Republic',
  'Cook Islands',
  'Costa Rica',
  'CoteDIvoire',
  'Croatia',
  'Cuba',
  'Curaçao',
  'Cyprus',
  'CzechRepublic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Falkland Islands',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'French Polynesia',
  'French Southern Territories',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guadeloupe',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea Bissau',
  'Guyana',
  'Haiti',
  'Heard Island Mcdonald Islands',
  'Holy See Vatican City State',
  'Honduras',
  'HongKong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Isle Of Man',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Korea, Republic of',
  'Korea, Democratic People\'s Republic of',
  'Kuwait',
  'Kyrgyzstan',
  'Lao Peoples Democratic Republic',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libyan Arab Jamahiriya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macao',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Martinique',
  'Mauritania',
  'Mauritius',
  'Mayotte',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Niue',
  'Norfolk Island',
  'Northern Mariana Islands',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestinian Territory',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Pitcairn',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Reunion',
  'Republic of North Macedonia',
  'Romania',
  'Russian Federation',
  'Rwanda',
  'Saint Barthelemy',
  'Saint Helena',
  'Saint Kitts And Nevis',
  'Saint Lucia',
  'Saint Martin',
  'Saint Pierre And Miquelon',
  'Saint Vincent And Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome And Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Georgia And Sandwich Island',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'South Sudan',
  'Suriname',
  'Svalbard And Jan Mayen',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Sint Maarten (Dutch part)',
  'Syrian Arab Republic',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'TimorLeste',
  'Togo',
  'Tokelau',
  'Tonga',
  'Trinidad And Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks And Caicos Islands',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'United States Outlying Islands',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela',
  'Vietnam',
  'Virgin Islands British',
  'Virgin Islands US',
  'Wallis And Futuna',
  'Western Sahara',
  'Yemen',
  'Zambia',
  'Zimbabwe'
];
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
  const handleClickOpen = () => {
    setOpen2(true);
  };
  const handleClose = () => {
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
  setNewEmail(event.target.value)
}

const handleChangeBiography = (event) => {
    setBiography(event.target.value)}

const handleChangeOldPassowrd = (event) => {
    setOldPassword(event.target.value)}

const handleChangeNewPassword = (event) => {
      setNewPassword(event.target.value)}
      const handleChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)}

const saveSettings = async ()=>{  
  
    const response=await axios.put(`http://localhost:8000/editEmail/`,{
    newEmail:newEmail})
    .catch( (error) => alert(error.response.data.message))
    console.log(response.data)
    if(response.status===200){
    alert(response.data)
          }

    const response2=await axios.put(`http://localhost:8000/changePassword/`,{
      oldPassword:oldPassword,
      newPassword:newPassword}).
      catch( (error) => alert(error.response.data.message))


      console.log(response.data)
      if(response.status===200){
          alert(response.data)}


    const response3=await axios.put(`http://localhost:8000/editBiography/`,{
    newText:biography}).
    catch( (error) => alert(error.response.data.message))


    console.log(response.data)
    if(response.status===200){
        alert(response.data)
    }

  
        
        
        
      }

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
    }
  }

    const change3 = async ()=>{
      const response=await axios.put(`http://localhost:8000/changePassword/`,{
      oldPassword:oldPassword,
      newPassword:newPassword}).
      catch( (error) => alert(error.response.data.message))


      console.log(response.data)
      if(response.status===200){
          alert(response.data)
      }
    }


    const [open2, setOpen2] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open9, setOpen9] = React.useState(false);

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
const viewMyCourses = async () => {
  window.location.href='/SearchInstructor';
}
const CreateCourses = async () => {
  window.location.href='/InstructorCreate';
}
const OwedMoney = async () => {
        const response = await axios.get(`http://localhost:8000/owedMoney`).catch( (error) => alert(error.response.data.message)) 
        console.log(response.data)
        if(response.status===200){

          if(response.data < 0){
            let m = "You should pay this amount of money due to refunded courses";
            let m2 = "Do you want to pay back this balance from your bank account";
            let b = "pay back";
            setBtnText(b);
            setMessage2(m2);
            setMessage(m);
          }
          else{
            let c = "Here is your current balance";
            let c2 = "Do you want to add this balance to your bank account";
            let bt = "add to account";
            setBtnText(bt);
            setMessage2(c2);
            setMessage(c); 
          }

          setMoney(response.data);
          //setOpen9(true);
          
        }
      
      
      }
const handleClose9 = async () => {
        setOpen9(false);
};

const payOradd = async () => {
  const response = await axios.get(`http://localhost:8000/payOradd`).catch( (error) => alert(error.response.data.message)) 
  console.log(response.data)
  if(response.status===200){

    // if(response.data < 0){
    //   let m = "You should pay this amount of money due to refunded courses";
    //   let m2 = "Do you want to pay back this balance from your bank account";
    //   let b = "pay back";
    //   setBtnText(b);
    //   setMessage2(m2);
    //   setMessage(m);
    // }
    // else{
    //   let c = "Here is your current balance";
    //   let c2 = "Do you want to add this balance to your bank account";
    //   let bt = "add to account";
    //   setBtnText(bt);
    //   setMessage2(c2);
    //   setMessage(c); 
    // }

    // setMoney(response.data);
    // setOpen9(true);
    
  }


}

const handleChangeCreditCard = (event) => {
  setCreditCard(event.target.value)
}

const [user,setUser] = React.useState(async () => {
  await axios.get('http://localhost:8000/userBySession')
  .then(res => setUser(res.data))
  .catch(err => {
    if (err.response.status === 401) //you didn't login
    window.location.href='/';
  })
})

const[showAmount,setShowAmount]= useState(false);
const [curr, setCurr] = useState('');
const getCurrency = async () => {
  await axios.get(`http://localhost:8000/myCurrency?country=${user.country}`)
  .then(res => setCurr(res.data.currency))
  .catch(err => {
    console.log(err)
    if (err.response.status === 401) //you didn't login
    window.location.href='/';
  })
}

const[newEmail,setNewEmail]=useState('');
const[biography,setBiography]=useState('');
const[oldPassword,setOldPassword]=useState('');
const[money,setMoney]=useState('');
const[message,setMessage]=useState('');
const[message2,setMessage2]=useState('');
const[btnText,setBtnText]=useState('');
const[newPassword,setNewPassword]=useState('');
const[confirmPassword,setConfirmPassword]=useState('');
const[creditCard,setCreditCard]=useState('');
// const [ready, setReady] = useState(false);
// useEffect(() => {
//     if (user._id) {
//         getCurrency();
//         setReady(true);
//         // setNewEmail(user.email);
//         // setBiography(user.biography);

        
//     }
// }, [user])

const handleKeypress = e => {
  //it triggers by pressing the enter key
if (e.key === 'Enter') {
  console.log('renteeer')
 // handleSearch(e)
  window.location.href=`/temp?userId=${user._id}&search=${e.target.value}`
}
}

const [country, setCountry] = useState('');
// const changeCountry = async () => {
//   const response = await axios.post(`http://localhost:8000/selectCountry/${userId}`, { country })
//   console.log(response.data)
//   if (response.status == 201)
//   {
//       alert(response.data.message)
//   }
// }
const handleChange = (event) => {
  console.log(event.target.value)
  //sets the country to the selected one
  setCountry(event.target.value);
};

const handleClickBack = () => {


  setOpen2(true);
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
            <Button variant="contained" sx={{ color: 'black',  bgcolor: '#CAF0F8' }} onClick={() => window.location.href='/temp'}>All courses</Button>
          &nbsp;&nbsp;
          <box>

          <ListItemButton  >
            <ListItemIcon >
          <HomeIcon sx={{color:'#CAF0F8' }} onClick={ () => window.location.href='/iHome'} />
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
          <ListItemText primary='My Courses' onClick={viewMyCourses}/>
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
          <ListItemText primary='Create Course' onClick={CreateCourses}/>
          </ListItemButton>
          <ListItemButton onClick={() => setShowAmount(!showAmount)}>
            <ListItemIcon>
          <Wallet sx={{color:'black' }} />
          </ListItemIcon>
          <ListItemText primary='Wallet' onClick={OwedMoney}/>
          </ListItemButton>
          {showAmount &&
            <ListItemButton
            
              sx={{ backgroundColor:'#eeeeee', width:15}}
            >
              <Grid conatainer spacing={0} width='15' sx={{ml:-1}}>
             <Typography> Account balance: </Typography>
             <Typography>last month:100.7 {curr} </Typography> 
              <Typography>This month:{parseInt(money,).toFixed(2)} {curr} </Typography> 
              </Grid>
            </ListItemButton>
          } 
          <ListItemButton onClick={handleClickOpen}>
            <ListItemIcon>
          <SettingsIcon sx={{color:'black' }} />
          </ListItemIcon>
          <ListItemText primary='Settings'/>
          </ListItemButton>
          <BootstrapDialog
     PaperProps={{
        sx: {
          
          height : '380px',
          width :'470px'
        }
      }}
      fullWidth='true'
      //maxWidth='sm' 
       // onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open2}
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
          <Button sx={{mt:25 , ml:5, color: 'black', backgroundColor: '#CAF0F8', borderColor: '#03045E'}} autoFocus 
          
          >
            Save changes
          </Button>
        </DialogActions>
</div> 

          
      </BootstrapDialog>


          <ListItemButton onClick={()=>{window.location.href='/myReports'}}>
            <ListItemIcon>
          <ReportIcon sx={{color:'black' }} />
          </ListItemIcon>
          <ListItemText primary='Report'/>
          </ListItemButton>
          </List>

          <BootstrapDialog
        onClose={handleClose9}
        aria-labelledby="customized-dialog-title"
        open={open9}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose9}>
        <Typography gutterBottom component="h1" variant="h5" sx={{color:'#03045E'}}>
          Owed Money
        </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Typography gutterBottom>{message}</Typography>
        <Typography>Balance: {money}</Typography>
          <Typography>
            {message2}
          </Typography>
          <TextField
                  required
                  fullWidth
                  name="Credit Card"
                  label="Credit Card Number"
                  type="Credit Card"
                  id="CreditCard"
                  onChange={(event)=>{handleChangeCreditCard(event)}}
                />
                <Button onClick={() => {payOradd()}}>{btnText}</Button> 
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus sx={{ color: '#CAF0F8', backgroundColor: '#03045E', borderColor: '#03045E'  }} 
          onClick={() => {handleClose()}}>
            
          </Button> */}
         
        </DialogActions>
      </BootstrapDialog>

        </Drawer>
      </Box>
    </ThemeProvider>
    
  );



} 


