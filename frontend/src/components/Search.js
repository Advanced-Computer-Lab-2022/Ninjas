
import * as React from 'react';
import axios from "axios";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider ,Rating,CircularProgress} from "@mui/material";
import { styled, createTheme, ThemeProvider , alpha} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ReactStars from "react-rating-stars-component";
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
import previewPic from '../coursesSearch2.jpg';
import noResult from '../no results.png';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useTheme } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IoFilterSharp } from "react-icons/io5";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactPlayer from 'react-player/youtube'
import { useEffect } from 'react';
import TraineeNav from '../nav/TraineeNav';
import InstructorNav from '../nav/InstructorNav';
import TextField from '@mui/material/TextField';
import { setbar } from '../nav/TraineeNav';
const traineeNav = {};

export  var searchtemp = null;
function setSearchtemp (x){
    searchtemp =x
    
}
function valuetext(value) {
  return value;
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



{/*back*/}


const [ready, setReady] = React.useState(false);
const params = new URLSearchParams(window.location.search);
const userId = params.get('userId');
const [search, setSearch] = React.useState( params.get('search'));
setSearchtemp(search);
//setSearch( params.get('search')); //search el mktob fl text box








{/*front*/}
const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);
  const [openSubject, setOpenSubject] = React.useState(false);
  const [openRating, setOpenRating] = React.useState(false);
  const [openPrice, setOpenPrice] = React.useState(false);
   const [subject, setSubject] = React.useState(null);
   const [rating, setRating] = React.useState(null);
   const [expanded, setExpanded] = React.useState(false);
   const [expandedf, setExpandedf] = React.useState(false);
   const [minOn, setMinOn] = React.useState(true);
   const [maxOn, setMaxOn] = React.useState(true);
   const [MinV, setMinV] = React.useState(null);
   const [MaxV, setMaxV] = React.useState(null);
   const [result, setResult] = React.useState([]);
   const [maxtemp, setMaxtemp] = React.useState(null);
   const [mintemp, setMintemp] = React.useState(null);
   const [price, setPrice] = React.useState(false);
   const [inst, setinst] = React.useState(null);

   const handleChange = (panel) => (event, isExpanded) => {
     setExpanded(isExpanded ? panel : false);
   };
   const handleChangef = (panel) => (event, isExpanded) => {
    setExpandedf(isExpanded ? panel : false);
  };
 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };
  
  const handleRating = (event) => {
    console.log(event.target.value)
    if (rating == event.target.value){
      setRating(null)
       
    }
    else
    {
    setRating(event.target.value);}
 
    
  };

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setSearchtemp(event.target.value);
    
  };

  const handlePrice = (event) => {
    if (MinV == ''){setMinV(null);
       setMintemp(null)}
    if (MaxV == ''){setMaxV(null);
       setMaxtemp(null)}
   setPrice(!price)
  }

  const handleMinV = (event) => {
    if ((minOn)){
    setMintemp( event.target.value)}
    setMinV(event.target.value)
    
  };

  const handleMaxV = (event) => {

    if ((maxOn)){
    setMaxtemp( event.target.value)}
    setMaxV(event.target.value)
    
  };

  const handleSubject = (event) => {

    console.log(event.target.value)
    console.log(subject)
    if (subject == event.target.value){
      setSubject(null)
      //getResult()
       
    }
    else
    {
    setSubject(event.target.value)
  //getResult()
  }
    console.log('//subjjj')
    console.log(subject)
   
    
  };


  const handlMaxON = (event) => {

  
    
    setMaxtemp((!maxOn)? MaxV : null)
    setMaxOn(!maxOn)}
     

    const handlMinON = (event) => {
  
      setMintemp((!minOn)? MinV : null)
          setMinOn(!minOn)}
       
    
  const handleClickS = (event) => {
    setOpenSubject(true);
    
  }
  
  
  const handleClickR = (event) => {
    setOpenRating(true);
    
  };
  
  const handleClickP = (event) => {
    setOpenPrice(true);
    
  };
  const handleClose = (event) => {
    console.log(event)
    setAnchorEl(null);
  };
  const handleKeypress = e => {
    //it triggers by pressing the enter key
  if (e.key === 'Enter') {
    console.log('renteeer')
    handleSearch(e)
  }
};
 
const mdTheme = createTheme();
const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  
  async function getResult () {
    console.log('funccccc')
   
      await axios.get(`http://localhost:8000/search?userId=${userId}&subject=${subject}&minPrice=${mintemp}&maxPrice=${maxtemp}&rating=${rating}&title=${search}&instructor=${inst}`)
          .then(res => {setSearchResult(res.data.data)
         // console.log(res.data.data)
        }
          )
          .catch((error) => {  
            if (error.response.status === 401) //you didn't login
          window.location.href='/';
            else alert(error.response.data.message)})
         
         // const c = searchResult.currency
        
          
    }


  const [searchResult, setSearchResult] = React.useState(getResult)
  
  // useEffect(() => 
  // {
  //  getResult () 
  // },[subject]) 
  

  useEffect(() => 
  {
    console.log('////min w max')
    console.log(MinV);
    console.log(MaxV);
    setReady(false);
   getResult ();
   }
  ,[subject,price,rating,search]) 
  
  useEffect(() => {
  
    console.log()
    if (searchResult.courses) {
        //result of the backend request is ready
        setReady(true);
  
       
      
    }
  }, [searchResult])

//console.log(searchResult.userType)

  return (
   
    <ThemeProvider theme={mdTheme} >
      <Box sx={{ display: 'flex'   }}>

       
        <CssBaseline />

        { searchResult.userType == 'GUEST' && 
          <TraineeNav post={traineeNav}/>}

        { searchResult.userType == 'CORPORATE_TRAINEE' && 
          <TraineeNav post={traineeNav}/>}

        { searchResult.userType == 'INDIVIDUAL_TRAINEE' && 
          <TraineeNav post={traineeNav}/>}

        { searchResult.userType == 'INSTRUCTOR' && 
          <InstructorNav post={traineeNav}/>}


 {/* box dh bta3 el body bta3t el page */}
        {
                        !ready &&
                        <Box
                        sx={{ml:'50%' , mt: 5}}
                        component="main"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            minHeight="100vh"
                        >
                          
                            <CircularProgress />
                        </Box>

                    }
                    
                   
                    
                     {  ready && 
       
        <Box
          component="main"
          sx={{
            backgroundColor: '#FFFFFF',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
          
        >
          <Toolbar />

          
{/* 
          <Toolbar>
          <Container maxWidth="lg" sx={{ mt: 0, mb: 0 ,mr: 0 , ml: 0 }}  >
            <Grid container spacing={0}>

    
      
       <Button id="demo-customized-button"
        aria-controls={open2 ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open2 ? 'true' : undefined}
        variant="text"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ color: 'black', ml: -3 }}>
      <ListItemIcon  sx={{ color: 'black', }}>
        < IoFilterSharp/>
      </ListItemIcon>
      <ListItemText primary="Filter " />
    </Button>


    
    <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open2}
        onClose={handleClose}
      >
        <MenuItem  disableRipple>
          
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Subject
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Toolbar>
          <RadioGroup
                        //aria-labelledby="demo-radio-buttons-group-label"
                       // name="controlled-radio-buttons-group"
                        onChange={ handleSubject}
                        onClick={handleSubject}
                    >
                      
                        <FormControlLabel value={'CS'} control={<Radio />} label={'CS'} checked={subject == 'CS'} />
                        <FormControlLabel value={'English'} control={<Radio />} label={'English'} checked={subject == 'English'} />
                        <FormControlLabel value={'Math'} control={<Radio />} label={'Math'} checked={subject == 'Math'} />
                       

                    </RadioGroup>
                    </Toolbar>
        </AccordionDetails>
      </Accordion>

        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem  disableRipple>
       
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
          Rating
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          <Rating
                                        name="simple-controlled"
                                     
                                        value = {rating}
                                        //precision={0.005}
                                        onChange={handleRating}
                                    />
                
        </AccordionDetails>
      </Accordion>
         
          
        </MenuItem> */}
        {/* { searchResult.userType != 'CORPORATE_TRAINEE' && <Divider sx={{ my: 0.5 }} />}
        { searchResult.userType != 'CORPORATE_TRAINEE' &&  <MenuItem  disableRipple>
        
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
         <Typography sx={{ width: '33%', flexShrink: 0 }}>
          Price
          </Typography>
        </AccordionSummary>
        <AccordionDetails>


      
          <Typography sx={{ width: '33%', flexShrink: 0 }}>

          <RadioGroup
                        //aria-labelledby="demo-radio-buttons-group-label"
                       // name="controlled-radio-buttons-group"
                        onChange={ handlMinON}
                        onClick={handlMinON}
                    >
          <FormControlLabel  control={<Radio />}  checked={minOn} />    {/* h3mlha on click */ }
          {/* </RadioGroup>
          
          minimum
          </Typography>
        

        <Slider
  aria-label="Temperature"
  defaultValue={0}
  value = {MinV}
  onChange={handleMinV}
  getAriaValueText={valuetext}
  valueLabelDisplay="auto"
  step={200}
  marks
  min={0}
  max={1000}
/>




<Typography sx={{ width: '33%', flexShrink: 0 }}>
<RadioGroup
                        //aria-labelledby="demo-radio-buttons-group-label"
                       // name="controlled-radio-buttons-group"
                        onChange={ handlMaxON}
                        onClick={handlMaxON}
                    >
          <FormControlLabel  control={<Radio />} checked={maxOn}   />    {/* h3mlha on click */ }
          {/* maximum
          </RadioGroup>
          </Typography>
        

        <Slider
  aria-label="Temperature"
  defaultValue={0}
  value = {MaxV}
  onChange={handleMaxV}
  getAriaValueText={valuetext}
  valueLabelDisplay="auto"
  step={500}
  marks
  min={0}
  max={5000}
/>
                
      
         
                
        </AccordionDetails>
      </Accordion>
         </MenuItem>}  */} 
      {/* </StyledMenu>

     
            </Grid>

            

          </Container>
         
          </Toolbar> */}
         




        <Toolbar>
          <Box sx={{mt:0 ,ml:-5}} bgcolor='#CAF0F8' color='black'>
         <Search   >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
             defaultValue = {searchtemp}
            
            // variant='contained'
              //onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeypress}
              
            />
          </Search>
          </Box>
       </Toolbar >

<Toolbar>
          <Grid container spacing={2} sx={{ ml: 1 , mt:0 , mb:2}} style={{ gap: 20 }}>

          <Box 
sx={{ml:-5}}
width='16.5%'>
                    <Box
                     display="flex"
                     flexDirection="column"
                     sx={{
                         overflow: "hidden",
                         overflowY: "scroll",
                     }}
                     alignItems="left"
                      
                     //minWidth={'50%'}
                     height='430px'
                    >
                       
 {/* <Button id="demo-customized-button"
        aria-controls={open2 ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open2 ? 'true' : undefined}
        variant="text"
        disableElevation
        onClick={handleClick}
        //endIcon={<KeyboardArrowDownIcon />}
        sx={{ color: 'black'}}> */}

<Accordion expanded={expandedf === 'panelf'  } onChange={handleChangef('panelf')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
      
       
          <Typography sx={{// width: '33%',
           flexShrink: 0 }}>
          < IoFilterSharp/>&nbsp;&nbsp; Filter
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          {/* hna kol el filters */}

          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Subject
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Toolbar>
          <RadioGroup
                        //aria-labelledby="demo-radio-buttons-group-label"
                       // name="controlled-radio-buttons-group"
                        onChange={ handleSubject}
                        onClick={handleSubject}
                    >
                      
                        <FormControlLabel value={'CS'} control={<Radio />} label={'CS'} checked={subject == 'CS'} />
                        <FormControlLabel value={'English'} control={<Radio />} label={'English'} checked={subject == 'English'} />
                        <FormControlLabel value={'Math'} control={<Radio />} label={'Math'} checked={subject == 'Math'} />
                       

                    </RadioGroup>
                    </Toolbar>
        </AccordionDetails>
      </Accordion>

        
        <Divider sx={{ my: 0.5 }} />
       
          {/* nkml */}
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
          Rating
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          <Rating
                                        name="simple-controlled"
                                     
                                        value = {rating}
                                        //precision={0.005}
                                        onChange={handleRating}
                                    />
                
        </AccordionDetails>
      </Accordion>
         
          
        
        { searchResult.userType != 'CORPORATE_TRAINEE' && <Divider sx={{ my: 0.5 }} />}
        { searchResult.userType != 'CORPORATE_TRAINEE' &&  
        
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
         <Typography sx={{ width: '33%', flexShrink: 0 }}>
          Price
          </Typography>
        </AccordionSummary>
        <AccordionDetails>


      
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
<Button
variant="contained" sx={{ color: 'white',  borderColor: '#03045E' }} 
onClick={handlePrice}
>
  Apply price
</Button>
          {/* <RadioGroup
                        //aria-labelledby="demo-radio-buttons-group-label"
                       // name="controlled-radio-buttons-group"
                        onChange={ handlMinON}
                        onClick={handlMinON}
                    >
          <FormControlLabel  control={<Radio />}  checked={minOn} />  
          </RadioGroup> */}
          
          minimum
          </Typography>
        

          <TextField
          id="outlined-helperText"
          //label="minimum price"
          defaultValue={MinV}
          onBlur={handleMinV}
        />

{/* changeable default value */}
        {/* <Slider
  aria-label="Temperature"
  defaultValue={0}
  value = {MinV}
  onChange={handleMinV}
  getAriaValueText={valuetext}
  valueLabelDisplay="auto"
  step={200}
  marks
  min={0}
  max={1000}
/> */}




<Typography sx={{ width: '33%', flexShrink: 0 }}>

          maximum
        
          </Typography>
          <TextField
          id="outlined-helperText"
          //label="minimum price"
          defaultValue={MaxV}
          onBlur={handleMaxV}
          ></TextField>
          

{/*    <Slider */}
{/* //   aria-label="Temperature"
//   defaultValue={0}
//   value = {MaxV}
//   onChange={handleMaxV}
//   getAriaValueText={valuetext}
//   valueLabelDisplay="auto"
//   step={500}
//   marks
//   min={0}
//   max={5000}
// />
                 */}
      
         
                
        </AccordionDetails>
      </Accordion>
         }




                
        </AccordionDetails>
      </Accordion>


    {/* </Button> */}
    </Box>

    </Box>


            
{/* trial   hyt3ml hna for loop */}

{
                        ready && searchResult.courses.length == 0 &&
                        <Box
                        sx={{ml:'33%' , mt:-7}}
                        component="main"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            minHeight="100vh"
                        >
                          
                          <img  style={{ width: 380, height: 300 }} src={noResult} alt="no results" />
                        </Box>

                    }





<Grid container spacing={0} 
//sx={{ ml: 1 , mt:0.5 , mb:2}}
 style={{ gap: 15 }}
 //alignItems="right"
 width = '85%'
>
{searchResult && searchResult.courses.length != 0 && searchResult.courses.map((course) => (

<Card  sx={{ display: 'flex' ,'&:hover': {    backgroundColor: '#90E0EF',
 },   backgroundColor: '#CAF0F8' }} style={ { width:"49%",
  height:"250px"}} 
onClick={()=>{window.location.href=`course/${course._id}`}} >
{(!course.videoLink) &&
 <CardMedia
 allow="autoPlay"
 controls={true}
         component="img"
      sx={{ width: '49%' }}
    
      // //style={{ width: 150, height: 200 }}
         src={previewPic}
        alt="Preview"
      > 

  </CardMedia> }
{/*if video hntl30 else hntl3 sora*/}
{(course.videoLink) &&
 <ReactPlayer url={course.videoLink}
                        controls={true}
                         alt="preview"
                        allow='autoplay'
                         width= '280px'
                         height = 'relative' 
                        /> 
}  
    
         {/* <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 80,
          left: 0,
        }}
      /> */}
       <CardContent sx={{ flex: '1 0 auto' }}>
      <Grid container>
        <Grid item md={0}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 0, md: 0 },
              pr: { md: 0 },
            }}
          >
           
            <Typography  component="h5" variant="h5" color="inherit" style={{width:'210px'}} >
              {course.title}
            
            </Typography>
            <Rating
                                  readOnly={true}
                                        value = {course.rating}
                                        precision={0.1}
                                    />

            <Typography variant="h6" color="inherit" style={{width:'210px'}}>
            total hours : {course.totalHours}
            </Typography>
            
            { searchResult.userType != 'CORPORATE_TRAINEE' &&  <Typography variant="h6" color="inherit"style={{width:'210px'}} >
            price : {course.price}  {searchResult.currency}
            </Typography>}

            <Typography variant="h6" color="inherit"style={{width:'210px'}} >
            subject : {course.subject} 
            </Typography>

{/*el link msh byban fy 7agat*/}
            {/* <Typography >
             <Link variant="subtitle1" onClick={()=>{window.location.href=`course/${course._id}` }}
            >   {/*href view course   hselo w a5ly el card bttdas */}
              {/* Lets explore */}
            {/*</Link>
            </Typography> */}
            
          </Box>
        </Grid>
      </Grid>
      </CardContent>
      
    </Card> ))}
   </Grid>
   
</Grid>
  
    </Toolbar>

        </Box>
}
      </Box>
          
        {/* //box for search results */}
     
       {/* End of box */}


    </ThemeProvider>
    
  );



} 
export default Temp;

