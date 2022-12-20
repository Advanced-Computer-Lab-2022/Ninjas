
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
import mainListItems from './listItems';


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

const [open, setOpen] = React.useState(false);
const toggleDrawer = () => {
 setOpen(!open);
  };

  const [reports, setReports] = useState(async () => {
    await axios.get(`http://localhost:8000/admin/viewReportedProblems`)
        .then(res => { setReports(res.data)})
        .catch((error) => alert(error.response.data.message))
})

const [ready, setReady] = useState(false);
useEffect(() => {
    if (reports.length)
        setReady(true);
}, [reports])

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex'  }}>
        <CssBaseline />
        <AppBar position="absolute">
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
          
          &nbsp;&nbsp;&nbsp;
          <box>{mainListItems}</box>

          <box>

          <Button variant="contained"  sx={{ color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}>Log out</Button>
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
            <Copyright sx={{ pt: 4 }} />
          </Container>
          <main>
          <Container sx={{ py: 1, mt:1}} >
          {/* End hero unit */}
          <Grid container spacing={4} >
            {ready && reports.map((card) => (
              <Grid item key={k+1} xs={10} sm={7} md={4}>
                <Card 
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' , align:'center' ,backgroundColor:'#CAF0F8'}}
                >
                
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography sx={{ color: '#03045E'}}>User ID: {card.accountId} </Typography>
                    <Typography sx={{ color: '#03045E'}}>Course ID: {card.courseId}</Typography>
                    <Typography sx={{ color: '#03045E'}}>Problem: {card.problem}</Typography>
                    <Typography sx={{ color: '#03045E'}}>Status: {card.progress}</Typography>

                  <br></br>
            <box>
  <RadioGroup sx={{ml:8 }} aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
    <FormControlLabel fontWeight={'bold'} value="PENDING" control={<Radio fontWeight={'bold'}/>} label="Pending" />
    <FormControlLabel fontWeight={'bold'} value="RESOLVED" control={<Radio fontWeight={'bold'}/>} label="Resolved" />
   </RadioGroup>            </box>
           
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
    
  )};

export default Temp;

