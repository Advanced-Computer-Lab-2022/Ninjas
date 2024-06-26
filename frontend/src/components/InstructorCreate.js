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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InstructorNav from '../nav/InstructorNav'

const traineeNav = {};
export  var searchtemp = null;

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

  
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));

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
const InstructorCreate = () => {
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
//go to anothr page of adding subs not this page
    window.location.href=`/InstructorSubtitle?courseId=${courseId}`;
    setOpen(false);
  };
  const handleClose3 = async () => {
    setOpen(false);
  };
  const handleClose10 = async () => {
    setOpen2(false);
  };  
  const handleClose11 = async () => {
    setOpen3(false);
  };  

  const handleClickOpen = async ()=>{
    setfirst2(1);
    //check on it
    if(subject != '' && price != '' && hours != '' && summary != '' && title != '' && video != ''){
      if(hours > 0 && price > 0){
    const response = await axios.put(`http://localhost:8000/createcourse/`,{
        subject: subject,
        price: price,
        totalHours: hours,
        summary: summary,
        title: title,
        videoLink: video
    }).
    catch( (error) => alert(error.response.data.message)) 
    console.log(response.data)
    if(response.status===200){
      setCourseId(response.data._id);
      setOpen(true);
      // alert(response.data);
    }
      }
      else{
        setOpen3(true)
      }
  }
  else{
    setOpen2(true);
  }
  
  }
 

  const[title,setTitle]=useState('');
  const[price,setPrice]=useState('');
  const[hours,setHours]=useState('');
  const[video,setVideo]=useState('');
  const[summary,setSummary]=useState('');
  const[subject,setSubject]=useState('');
  const[courseId,setCourseId]=useState('');
  const[first2, setfirst2] = useState(0);

 
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  }
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  }
  const handleChangeHours = (event) => {
    setHours(event.target.value);
  }
  const handleChangeVideo = (event) => {
    setVideo(event.target.value);
  }
  const handleChangeSummary = (event) => {
    setSummary(event.target.value);
  }

const handleChangeSubject = (event) => {
  setSubject(event.target.value);
}


  
return (
   
    <ThemeProvider theme={mdTheme} >
      <Box sx={{ display: 'flex'   }}>
        <CssBaseline />
          <InstructorNav post={traineeNav}/>
          
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
            <Typography variant="h4" sx={{ mt: 4, mb: 4 , ml: 7, color:'#03045E', fontWeight:'bold'}}>Create New Course</Typography>
          <Grid container spacing={2}  sx={{ ml: 5 }}>
          <Grid item xs={5}>
                <TextField
                  error={first2==1 && title==''}
                  required
                  fullWidth
                  name="Course Title"
                  label="Course Title"
                  type="Course Title"
                  id="courseTitle"
                  autoComplete="Course Title" onChange={(event)=>{handleChangeTitle(event)}}
                />
              </Grid>
            
              <Grid item xs={5}>
                <TextField
                  error={first2==1 && price==''}
                  required
                  fullWidth
                  name="Price"
                  label="Price"
                  type="Price"
                  id="Price"
                  onChange={(event)=>{handleChangePrice(event)}}
                />
              </Grid>
        
              <Grid item xs={5}>
                <TextField
                  error={first2==1 && hours==''}
                  required
                  fullWidth
                  name="Total Hours"
                  label="Total Hours"
                  type="Total Hours"
                  id="Total Hours"
                   onChange={(event)=>{handleChangeHours(event)}}
                />
              </Grid>
              
              <Grid item xs={5}>
                <TextField
                error={first2==1 && video==''}

                  required
                  fullWidth
                  name="Preview Video Link"
                  label="Preview Video Link"
                  type="Preview Video Link"
                  id="Preview Video Link"
                  autoComplete="preview-video" onChange={(event)=>{handleChangeVideo(event)}}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField 
                  error={first2==1 && summary==''}
                  required
                  fullWidth
                  id="Summary"
                  label="Summary"
                  name="Summary"
                  onChange={(event)=>{handleChangeSummary(event)}}
                />
              </Grid>
              <Grid item xs={5} sx={{ mt : 4}}>
              <FormControl >
              <FormLabel id="demo-radio-buttons-group-label" sx={{ ml:2, mb:1}}>Subject</FormLabel>
  <RadioGroup sx={{ml:2}}
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="female"
    name="radio-buttons-group"
  >
    <FormControlLabel value="CS" control={<Radio />} label="CS" onChange={(event)=>{handleChangeSubject(event)}}/>
    <FormControlLabel value="English" control={<Radio />} label="English" onChange={(event)=>{handleChangeSubject(event)}}/>
    <FormControlLabel value="Math" control={<Radio />} label="Math" onChange={(event)=>{handleChangeSubject(event)}}/>
  
  </RadioGroup>
</FormControl >
</Grid>
           
              </Grid>
             
<box>
                <Button variant="outlined" sx={{ color: 'white', backgroundColor:'#03045E', ml: 73 }} 
                onClick={()=> {handleClickOpen()}}>Add Course</Button>
</box>
<BootstrapDialog
        onClose={handleClose3}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose3}>
        <Typography gutterBottom component="h1" variant="h5" sx={{color:'#03045E'}}>
          Alert
        </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Add subtitles and exercises to course
          </Typography>   
        </DialogContent>
        <DialogActions>
          <Button autoFocus sx={{ color: '#CAF0F8', backgroundColor: '#03045E', borderColor: '#03045E'  }} 
          onClick={() => handleClose()}>
            proceed
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <BootstrapDialog
        onClose={handleClose10}
        aria-labelledby="customized-dialog-title"
        open={open2}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose10}>
        <Typography gutterBottom component="h1" variant="h5" sx={{color:'#03045E'}}>
          Alert
        </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Please fill all fields
          </Typography>   
        </DialogContent>
        <DialogActions>
          <Button autoFocus sx={{ color: '#CAF0F8', backgroundColor: '#03045E', borderColor: '#03045E'  }} 
          onClick={() => handleClose10()}>
            ok
          </Button>
        </DialogActions>
      </BootstrapDialog>

      <BootstrapDialog
        onClose={handleClose11}
        aria-labelledby="customized-dialog-title"
        open={open3}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose11}>
        <Typography gutterBottom component="h1" variant="h5" sx={{color:'#03045E'}}>
          Alert
        </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Something wrong with hours or price
          </Typography>   
        </DialogContent>
        <DialogActions>
          <Button autoFocus sx={{ color: '#CAF0F8', backgroundColor: '#03045E', borderColor: '#03045E'  }} 
          onClick={() => handleClose11()}>
            ok
          </Button>
        </DialogActions>
      </BootstrapDialog>


          </main>



         
      


  
        </Box>























          </Box>
          </ThemeProvider>
          )
        }
        export default InstructorCreate;
