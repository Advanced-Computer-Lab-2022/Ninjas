
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
import axios from "axios";
import {useState,useEffect} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from "@mui/material/TextField";
import mainListItems from './listItems';

import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

import { CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // or for Day.js
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // or for Luxon
// import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
// // or for Moment.js
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

//import { DatePicker } from '@mui/x-date-pickers-pro/DatePicker';
// or
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// or
//import { DatePicker } from '@mui/x-date-pickers-pro';
// or
//import { DatePicker } from '@mui/x-date-pickers';

// function App({ children }) {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       {children}
//     </LocalizationProvider>
//   );}


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

let k = 0;

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

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClose = async () => {
    const response = await axios.put(`http://localhost:8000/admin/setPromotion`,
    { selectedCourses: selects, promotion })
    .catch(err=>console.log(err))

    if (response.status === 200)
    {
      window.location.href='/AdminSetPromo';
      setOpen(false)

    }
    else{
    setOpen(false);
    setOpen2(true);
  }
  };

  const handleClose2 = async () => {
    window.location.href='/AdminSetPromo';
    setOpen2(false);
  };
  

  const [selects, setSelected] = useState([]);
  const [promotion, setPromotion] = useState('');
  const [startDay, setStartDay] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [endDay, setEndDay] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [year, setYear] = useState('');



  const [courses, setCourses] = useState(async () => {
    await axios.get(`http://localhost:8000/admin/getAllCoursesss`)
        .then(res => { setCourses(res.data)})
        .catch((error) => alert(error.response.data.message))
})

// const [courses2, setCourses2] = useState(async () => {
//   await axios.get(`http://localhost:8000/admin/getAllCoursesss2`)
//       .then(res => { setCourses2(res.data)})
//       .catch((error) => alert(error.response.data.message))
// })

const [ready, setReady] = useState(false);
useEffect(() => {
    if (courses.length)
        setReady(true);
}, [courses])

const handleChangeCourse = (newSelected,checked) => {
  if (checked)
  setSelected([...selects, newSelected]);
  if(!checked)
  {
    setSelected(selects.filter(c => c!==newSelected));
  }

}
const handleChangePromotion = (event) => {
  setPromotion(event.target.value);
}

const handleChangeStDay = (event) => {
  setStartDay(event.target.value);
}

const handleChangeStMonth = (event) => {
  setStartMonth(event.target.value);
}
const handleChangeEDay = (event) => {
  setEndDay(event.target.value);
}

const handleChangeEMonth = (event) => {
  setEndMonth(event.target.value);
}

const handleChangeYear = (event) => {
  setYear(event.target.value);
}

const handleClickOpen = () => {
  //console.log(reportId)
  setOpen(true);
};
useEffect( () => {
  console.log(selects)

},[selects]);

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
         
          <Box>
            <Typography
           sx={{ mt: 6, ml:20, mb:4}}
            
             component="h4"
             variant="h4"
             fontWeight={'bold'}
             fontSize={'30px'}
             color="#03045E"
             glutterBottom
            >Please specify promotion amount and select course(s)</Typography>
            <TextField  label="Promotion" sx={{ml: 20, mb:2}}  id="promo" variant="outlined" onChange={(event)=>{handleChangePromotion(event)}}/>
            <br></br>
            <TextField  label="Start Day" sx={{ml: 20, mb:2}}  id="day" variant="outlined" onChange={(event)=>{handleChangeStDay(event)}}/>
            <TextField  label="Start Month" sx={{ml: 2, mb:2}}  id="month" variant="outlined" onChange={(event)=>{handleChangeStMonth(event)}}/>
            <TextField  label="Start Year" sx={{ml: 2, mb:2}}  id="month" variant="outlined" onChange={(event)=>{handleChangeStMonth(event)}}/>

            {/* <TextField  label="Start Year" sx={{ml: 2, mb:2}}  id="year" variant="outlined" onChange={(event)=>{handleChangeYear(event)}}/> */}
            <br></br>
            <TextField  label="End Day" sx={{ml: 20}}  id="day" variant="outlined" onChange={(event)=>{handleChangeEDay(event)}}/>
            <TextField  label="End Month" sx={{ml: 2}}  id="month" variant="outlined" onChange={(event)=>{handleChangeEMonth(event)}}/>
            <TextField  label="End Year" sx={{ml: 2, mt:0}}  id="year" variant="outlined" onChange={(event)=>{handleChangeYear(event)}}/>

            <Button  variant="contained"  sx={{ color: 'white', backgroundColor: '#03045E', borderColor: '#03045E', ml:4, mt:1 }} onClick={() =>
                  handleClickOpen()}>Set Promotion</Button>
            
        </Box>
<main>
<Container sx={{ py: 8 }} >
          {/* End hero unit */}
          <Grid container spacing={4} >
            {ready && courses.map((card) => (
              <Grid item key={k+1} xs={10} sm={7} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' , align:'center',backgroundColor:'#CAF0F8'}}
                >
               
                  <CardContent sx={{ flexGrow: 1 }}>
                 
                    <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#03045E', fontWeight:'bold'}}>
                       {card.title}<Checkbox
                      onChange={(event)=>
                      { 
                        event.target.checked? setSelected([...selects, card._id]) : setSelected(selects.filter( c => c!==(card._id)))
                      }}/>
                      </Typography>
                    <Typography >
                    Subject: {card.subject}
                    </Typography>
                    {/* <Typography>
                    Summary: {card.summary}
                    </Typography>
                    <Typography >
                    {card.rating}
                    </Typography> */}
                    <Typography >
                    Price: {card.price}
                    </Typography>
                    {/* <Typography id="courseId" >
                      {card._id}
                    </Typography> */}
                    <Typography id="status" align="center" size="small" 
                    sx={{ color: 'white', backgroundColor: '#00B4D8', fontWeight: 'bold', mt:2 }}>
                        {card.promoted}</Typography>

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
            Are you sure you want to set this promotion to selected course(s) ?
          </Typography>   
        </DialogContent>
        <DialogActions>
          <Button autoFocus sx={{ color: '#CAF0F8', backgroundColor: '#03045E', borderColor: '#03045E'  }} 
          onClick={() => handleClose()}>
            YES
          </Button>
        </DialogActions>
      </BootstrapDialog>

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
            Sorry you can't promote already promoted course(s)
          </Typography>   
        </DialogContent>
        <DialogActions>
          <Button autoFocus sx={{ color: '#CAF0F8', backgroundColor: '#03045E', borderColor: '#03045E'  }} 
          onClick={() => {handleClose2()}}>
            OK
          </Button>
        </DialogActions>
      </BootstrapDialog>
                  </CardContent>
                  <CardActions>
                    
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
</main>


         
      


  
        </Box>
      </Box>
    </ThemeProvider>
    
  );}
  
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

export default Temp;

