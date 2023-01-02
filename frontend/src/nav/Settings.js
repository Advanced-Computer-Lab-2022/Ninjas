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
import TraineeNav from './TraineeNav';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider , alpha} from '@mui/material/styles';
import InstructorNav from './InstructorNav';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Alert, AlertTitle, Backdrop } from '@mui/material';
const instructorNav = {};
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
const mdTheme = createTheme();
export default function CustomizedDialogs() {

  
  const[wait,setWait]=useState(false);

 

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
        setNewEmail(user.email);
        setBiography(user.biography);
        setUsername(user.username);
        setPass(user.password);


          
      }
  }, [user])
  const[newEmail,setNewEmail]=useState(user.email);
  const[biography,setBiography]=useState(user.biography);
  const[username,setUsername]=useState(user.username);
  const[oldPassword,setOldPassword]=useState('');
  const[newPassword,setNewPassword]=useState('');
  const[confirmPassword,setConfirmPassword]=useState('');
  const[pass,setPass]=useState(false);
  const[pass2,setPass2]=useState(false);

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

  const [country, setCountry] = useState(user.country);
  const handleChange = (event) => {
    console.log(event.target.value)
    //sets the country to the selected one
    setCountry(event.target.value);
  };
  const[first, setFirst] = useState(0);
  const [exercisesuccess, setsuccess] = useState(false);
  const saveSettings = async ()=>{  
  setFirst(1);
    if(newEmail!=user.email && validateEmail(newEmail)){
    const response=await axios.put(`http://localhost:8000/editEmail/`,{
    newEmail:newEmail})
    .catch( (error) => alert(error.response.data.message))
    console.log(response.data)
    if(response.status===200){
      setsuccess(true);
        setNewEmail(newEmail)}}
    console.log(oldPassword)    
    console.log(pass)    
    if(newPassword!='' && newPassword==confirmPassword && newPassword.length>=6){
    const response=await axios.put(`http://localhost:8000/changePassword/`,{
      oldPassword:oldPassword,
      newPassword:newPassword}).
      catch( (error) => {if(error.response.data.message=="old Password is incorrect, try again")
      setPass(true);
      if(error.response.data.message=="Cant't change new password to old password")
      setPass2(true);})
      if(response.status===200){
        setsuccess(true);
     }}
      
 if(biography!=user.biography && biography.length>=20){
    const response=await axios.put(`http://localhost:8000/editBiography/`,{
    newText:biography}).
    catch(error => alert(error.response.data.message))
  
    



    if(response.status===200){
      setsuccess(true);
 
    }
  }
 

  if(country!=user.country){
    console.log(country);
    const response = await axios.post(`http://localhost:8000/selectCountry/`, { selectedCountry:country })
    console.log(response.data)
    if (response.status == 201)
    {   
    }}

    setsuccess(true);
}

  
             
        
      

      var validateEmail = function (email) {
        var re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        return re.test(email)
      };


  return (


    <ThemeProvider theme={mdTheme}>
    <CssBaseline />
      <Box sx={{ display: 'flex'  }}>
        <CssBaseline />

        <InstructorNav post={instructorNav}/>
                

     
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
  
  <main>
  <Typography variant="h4" sx={{ mt: 4, mb: 4 , ml: 7, color:'#03045E', fontWeight:'bold'}}>Account Settings</Typography>
<Grid container spacing={2}  sx={{ ml: 5 }}>
<Grid item xs={5}>
      <TextField
        required
        fullWidth
        name="Username"
        label="Username"
        type="Username"
        id="Username"
        defaultValue={username}
        InputProps={{
          disabled: true,
        }}
      />
    </Grid>
  
    <Grid item xs={5}>
      <TextField
        required
        fullWidth
        name="Email"
        label="Email"
        type="Email"
        id="Email"
        error={first==1 &&  !validateEmail(newEmail)}
        helperText={first==1 && !validateEmail(newEmail) ? "Please enter a valid email." : null}
        defaultValue={newEmail}
        onChange={(event)=>{handleChangeEmail(event)}}
      />
    </Grid>

    <Grid item xs={5}>
      <TextField
        required
        fullWidth
        error={first==1 && setPass}
        helperText={first==1 && setPass? "Password doesn't match your password" : null}
        name="Password"
        label="Password"
        type="Password"
        id="Password"
        onChange={(event)=>{handleChangeOldPassowrd(event)}}
      />
    </Grid>
    
    <Grid item xs={5}>
      <TextField
        required
        fullWidth
        type="Password"
        error={first==1 && newPassword.length<6 && newPassword!=''}
        helperText={first==1 && newPassword.length<6 && newPassword!=''? "Password must be at least 6 characters" : null}
        name="New Password"
        label="New Password"
        id="New Password" 
        onChange={(event)=>{handleChangeNewPassword(event)}}
      />
    </Grid>

   
    
    <Grid item xs={5}>
      <TextField
        required
        fullWidth
        type="Password"
        error={first==1 && confirmPassword!=newPassword}
        helperText={  first==1 && confirmPassword!=newPassword? "The two passwords do not match." : null}
        name="Confrim New Password"
        label="Confrim New Password"
        id="Confrim New Password"
        onChange={(event)=>{handleChangeConfirmPassword(event)}}
      />
    </Grid>
    <Grid item xs={5}>
    <FormControl sx={{ width: '100%' }}>
                <InputLabel id="country-select-label">Country</InputLabel>
                <Select
                    id="country-select"
                    defaultValue={user.country}
                    value={country}
                    label="Country"
                    onChange={handleChange}
                >
                    {
                        countryEnums.map((country) => (
                            <MenuItem value={country}>{country}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
    </Grid>
    <Grid item xs={10}>
      <TextField 
        required
        fullWidth
        error={first==1 && biography.length<20}
        helperText={first==1 && biography.length<20? "Biography must be at least 20 characters" : null}
        id="Biorgaphy"
        label="Biography"
        name="Biography"
        defaultValue={biography}
        onChange={(event)=>{handleChangeBiography(event)}}
      />
    </Grid>
    <Grid item xs={5} sx={{ mt : 4}}>

</Grid>
 
    </Grid>
   
<box>
      <Button variant="outlined" sx={{ color: 'white', backgroundColor:'#03045E', ml: 139 }} 
      onClick={()=> {saveSettings()}}
      >
        Save Changes</Button>
</box>
{/* <BootstrapDialog
//onClose={handleClose3}
aria-labelledby="customized-dialog-title"
//open={open} >*/}

   <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={exercisesuccess}
                                onClick={() => window.location.href=`settings`}
                            >
                                <Alert sx={{ tabSize: 'l' }} severity="info">
                                    { exercisesuccess &&
                                        <div>
                                            <AlertTitle>Settings updated successfully</AlertTitle>
                                            Click anywhere to continue
                                        </div>

                                    }
                                </Alert>
                            </Backdrop>
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={pass2}
                                onClick={() => window.location.href=`settings`}
                            >
                                <Alert sx={{ tabSize: 'l' }} severity="info">
                                    { pass2 &&
                                        <div>
                                            <AlertTitle>Cant change new password into old password</AlertTitle>
                                            Click anywhere to continue
                                        </div>

                                    }
                                </Alert>
                            </Backdrop>


</main>
       
}
</Box>
    </Box>
      </Box>
    </ThemeProvider>
  );
}