
import * as React from 'react';
import axios from "axios";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider ,Rating} from "@mui/material";
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
import previewPic from '../coursesSearch2.jpg';
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



function valuetext(value) {
  return value;
}

const { post } = { description: "course gamel awyyy",
  image: logo ,
  imageText: "logo 3alabal ma nla2y sora",
  linkText: "matygy nshof",
  title: "course Gamed",};
  
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
const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);
  const [openSubject, setOpenSubject] = React.useState(false);
  const [openRating, setOpenRating] = React.useState(false);
  const [openPrice, setOpenPrice] = React.useState(false);
   const [search, setSearch] = React.useState(null);
   const [subject, setSubject] = React.useState(null);
   const [rating, setRating] = React.useState(null);
   const [expanded, setExpanded] = React.useState(false);
   const [minOn, setMinOn] = React.useState(false);
   const [maxOn, setMaxOn] = React.useState(false);
   const [MinV, setMinV] = React.useState(null);
   const [MaxV, setMaxV] = React.useState(null);
   const [result, setResult] = React.useState([]);

   const getResult = async () => {
    const response = await axios.get(`http://localhost:8000/`)
        .catch((error) => alert(error.response.data.message))

    setResult(response.data);
    console.log(response.data.link);
}



   const handleChange = (panel) => (event, isExpanded) => {
     setExpanded(isExpanded ? panel : false);
   };
 
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };
  
  const handleRating = (event) => {
    if (rating == event.target.value){
      setRating(null)
       
    }
    else
    {
    setRating(event.target.value);}
 
    
  };

  const handleSearch = (event) => {
    setSearch(event.target.value)
    
  };


  const handleMinV = (event) => {
    setMinV(event.target.value)
    
  };

  const handleMaxV = (event) => {
    setMaxV(event.target.value)
    
  };

  const handleSubject = (event) => {

    console.log(event.target.value)
    
    if (subject == event.target.value){
      setSubject(null)
       
    }
    else
    {
    setSubject(event.target.value);}
 
    
  };


  const handlMaxON = (event) => {

    
    setMaxOn(!maxOn)}
 

    const handlMinON = (event) => {
  
          
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

 
const mdTheme = createTheme();
const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
   
    <ThemeProvider theme={mdTheme} >
      <Box sx={{ display: 'flex'   }}>
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
              <img  style={{ width: 150, height: 60 }} src={logo} alt="Courses Planet" />
            </Typography >
           

{/* lw ms7t mn el search htb3t null wala l2 */}
            <Search  >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
             defaultValue = {search}
              //onChange={(e) => setSearch(e.target.value)}
              onBlur={handleSearch}
            />
          </Search>

          &nbsp;&nbsp;&nbsp;
          <box>

          <Button variant="contained"  sx={{ color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}>Sign In</Button>
          </box>
          &nbsp;&nbsp;&nbsp;
          <box>
          <Button variant="outlined" sx={{ color: 'white',  borderColor: '#CAF0F8' }}>Sign Up</Button>
          </box>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon  />
              </Badge>
            </IconButton> */}
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


 
    </List>
        </Drawer>


        {/* box dh bta3 el body bta3t el page */}
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

          <Toolbar>
          <Container maxWidth="lg" sx={{ mt: 0, mb: 0 ,mr: 0 , ml: 0 }}  >
            <Grid container spacing={0}>

                 {/* filters */}
       {/* el filter */}


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
                                        onChange={handleRating}
                                    />
                
        </AccordionDetails>
      </Accordion>
         
          
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem  disableRipple>

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
          </RadioGroup>
          
          minimum
          </Typography>
        
{/* changeable default value */}
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
          maximum
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
         </MenuItem>
      </StyledMenu>

     
            </Grid>

            

          </Container>
         
          </Toolbar>
         
        <Toolbar >
          <Grid container spacing={2} sx={{ ml: 1 , mt:0.5}} style={{ gap: 20 }}>
{/* trial   hyt3ml hna for loop */}

<Card  sx={{ display: 'flex' ,   backgroundColor: '#CAF0F8' }} style={{width:"48%", height:"30%"}} >
{/* <CardMedia
 allow="autoPlay"
 controls={true}
         component="img"
      sx={{ width: 280 }}
      // //style={{ width: 150, height: 200 }}
         src={previewPic}
        alt="Preview"
      > 

  </CardMedia> */}
{/*if video hntl30 else hntl3 sora*/}
 <ReactPlayer url='https://www.youtube.com/watch?v=1yKYDzFLyg0'
                        controls='true'
                         alt="preview"
                        allow='autoplay'
                         width= '280px'
                         height = 'relative' 
                        /> 
                       
    
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
           
            <Typography  component="h3" variant="h3" color="inherit"  gutterBottom>
              Tiltle
            
            </Typography>
            <Rating
                                  readOnly={true}
                                        value = {5}
                                    />

            <Typography variant="h6" color="inherit" paragraph>
            total hours : {}
            </Typography>
            
             <Link variant="subtitle1" href="">   {/*href view course */}
              Lets explore
            </Link>

            
          </Box>
        </Grid>
      </Grid>
      </CardContent>
      
    </Card>
   
   
    </Grid>
    </Toolbar>
        </Box>
       
      </Box>
  
        {/* //box for search results */}
     
       {/* End of box */}


    </ThemeProvider>
    
  );



} 
export default Temp;

