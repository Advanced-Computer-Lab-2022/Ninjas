
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
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import axios from "axios";
import {useState,useEffect} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import InstructorNav from './InstructorNav';

const instructorNav = {};

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

let k =0;

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {''}
      <Link color="inherit" >
        
      </Link>{' '}
      {}
      {''}
    </Typography>
  );
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
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

  const [reports, setReports] = useState(async () => {
    await axios.get(`http://localhost:8000/viewReportedProblems`)
        .then(res => { setReports(res.data)})
        .catch((error) => alert(error.response.data.message))
})

const [ready, setReady] = useState(false);
useEffect(() => {
    if (reports.length>=0)
        setReady(true);
}, [reports])
//const [requestId, setRequestId] = useState('');
const change = async (requestId) => {
    const response = await axios.post(`http://localhost:8000/followUp?reportId=${requestId}`)
    .catch((error) => (error.response.data.message))
  
    if (response.status === 200) {
        console.log(response)
    }
  }



  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex'  }}>
        <CssBaseline />
        
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
             
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
          <main>
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
          <Container sx={{ py: 1, mt:1}} >
          {/* End hero unit */}
          
          <Typography sx={{ color: '#03045E', fontWeight: 'bold' , mb: 2, mt : -5}}>Pending Reports</Typography>
          <Grid container spacing={4} >

          {ready && reports[0].map((card) => (
               <Grid item key={k+1} xs={10} sm={7} md={4}>
              <Card 
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' , align:'center' ,backgroundColor:'#CAF0F8'}}
                >
                
                  <CardContent sx={{ flexGrow: 1 , align: 'center' }}>
                  <Typography sx={{ color: '#03045E', fontWeight: 'bold' , align: 'center', mb:2 }}>Report</Typography>
                    <Typography sx={{ color: '#03045E'}}>Course ID: {card.title}</Typography>
                    <Typography sx={{ color: '#03045E'}}>Problem: {card.problem}</Typography>
                    <Typography sx={{ color: '#03045E'}}>Problem description: {card.description}</Typography>
                    <Button onClick={() => {change(card.id)}} sx={{ backgroundColor: '#03045E' , color:'#CAF0F8', align: 'center', mt:0, ml:27 }} >Follow Up</Button> 
                   
                  <br></br>
 

                  </CardContent>
                  <CardActions>
                    
                  </CardActions>
                </Card>
             </Grid>
                 ))}
</Grid>
<Typography sx={{ color: '#03045E', fontWeight: 'bold', mb: 2, mt:2}}>Resolved Reports</Typography>
          <Grid container spacing={4} >
            {ready && reports[1].map((card) => (
              <Grid item key={k+1} xs={10} sm={7} md={4}>
                <Card 
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' , align:'center' ,backgroundColor:'#CAF0F8'}}
                >
                
                  <CardContent sx={{ flexGrow: 1 , align: 'center' }}>
                  <Typography sx={{ color: '#03045E', fontWeight: 'bold' , align: 'center', mb:2 }}>Report</Typography>
                    <Typography sx={{ color: '#03045E'}}>Course ID: {card.title}</Typography>
                    <Typography sx={{ color: '#03045E'}}>Problem: {card.problem}</Typography>
                    <Typography sx={{ color: '#03045E'}}>Problem description: {card.description}</Typography>
                    <Button onClick={() => {change(card.id)}} 
                    sx={{ backgroundColor: '#03045E' , color:'#CAF0F8', align: 'center', mt:0, ml:27 }} >Follow Up</Button>  
                   
                  </CardContent>
                 
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
          </main>

        
 
        </Box>
      </Box>
    </ThemeProvider>
    
  )};

export default Temp;

