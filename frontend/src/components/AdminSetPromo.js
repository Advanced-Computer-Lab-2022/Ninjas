
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

    // const theId = document.getElementById("courseId"); 
    // const[promotion,setPromotion]=useState('');
    // const[course,setCourse]=useState('');
  
    // const handleChangPromotion = (event) => {
    //     setPromotion(event.target.value);
    // }
    // const handleChangCourse = (event) => {
    //     setPromotion(event.target.value);
    // }
  
      
    //         const change2 = async ()=>{
    //             const response=await axios.put(`http://localhost:8000/admin/setPromotion`,{courseId:course,
    //             promotion:promotion}).
    //             catch( (error) => alert(error.response.data.message))
        
        
    //             console.log(response.data)
    //             if(response.status===200){
    //                 alert(response.data)
    //             }}

             



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

  const [courses, setCourses] = useState(async () => {
    await axios.get(`http://localhost:8000/admin/getAllCoursesss`)
        .then(res => { setCourses(res.data)})
        .catch((error) => alert(error.response.data.message))
})

const [ready, setReady] = useState(false);
useEffect(() => {
    if (courses.length)
        setReady(true);
}, [courses])

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
          
          &nbsp;&nbsp;&nbsp;
         
          
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
           sx={{ mt: 4, ml: 4 , mb:2}}
            
             component="h4"
             variant="h4"
             fontWeight={'bold'}
             fontSize={'30px'}
             color="#03045E"
             align="center"
             glutterBottom
            >Please Specify Promotion amount & course ID</Typography>
            <TextField  label="Promotion" sx={{ml: 53}}  id="promo" variant="outlined" /*onChange={(event)=>{handleChangPromotion(event)}}*//>
            <TextField  label="Course ID" sx={{ml: 4}}  id="promo" variant="outlined" /*onChange={(event)=>{handleChangCourse(event)}}*//>
            <Button  variant="contained"  sx={{ color: '#03045E', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8', ml:4, mt:1 }} /* onClick={()=> {change2()}}*/>Set Promotion</Button>

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
                    <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#03045E', fontWeight:'bold'}}>{card.title}</Typography>
                    <Typography >
                    {card.subject}
                    </Typography>
                    <Typography>
                    {card.summary}
                    </Typography>
                    <Typography >
                    {card.rating}
                    </Typography>
                    <Typography >
                    {card.price}
                    </Typography>
                    <Typography id="courseId" >
                      {card._id}
                    </Typography>
                    <Typography id="status" align="center" size="small" sx={{ color: 'white', backgroundColor: '#03045E', borderColor: '#CAF0F8' }}>
                        {card.promoted}</Typography>

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

