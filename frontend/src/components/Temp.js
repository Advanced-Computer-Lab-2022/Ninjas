
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
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useTheme } from '@mui/material/styles';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbar
} from '@mui/x-data-grid';

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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };

  const handleClickS = (event) => {
    setOpenSubject(true);
    
  };
  
  
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
              <img  style={{ width: 150, height: 60 }} src={logo} alt="React Image" />
            </Typography >
           
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
            
      <Button
        id="demo-customized-button"
        aria-controls={open2 ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open2 ? 'true' : undefined}
        variant="text"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        style = {{ position: "relative", left: '-24px' }}
        sx={{ color: 'black', }}
      >
        Filter
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
        <MenuItem onClick={handleClickS} disableRipple>
          {/* <EditIcon /> */}
          Subject
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          {/* <FileCopyIcon /> */}
          Rating
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          {/* <ArchiveIcon /> */}
          Price
        </MenuItem>
        
        <StyledMenu
        id="demo-customized-menu2"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        sx={{ ml: 10 }}
        anchorEl={anchorEl}
        open={openSubject && open2}
        onClose={handleClose}
        
      >
        {/* handel close kol wa7da */}
        <MenuItem onClick={handleClose} value='CS' disableRipple>
          CS
        </MenuItem>

      </StyledMenu>



      </StyledMenu>

     

      <Button
        id="demo-customized-button2"
        //onClick={handleClick} w ashel on double click w lma aft7 wa7da kolo y2fl
        variant="outlined"
        style = {{ position: "relative" , left: '955px' }}
        sx={{ color: 'black', borderColor: '#03045E' }}
      >
        Search
      </Button>


      <Search  style = {{ position: "relative" , left: '260px' }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

            </Grid>

            

          </Container>
         
          </Toolbar>
         
         <Divider/>
         &nbsp;&nbsp;&nbsp;
          <Toolbar>
{/* trial   hyt3ml hna for loop */}

<Card sx={{ display: 'flex' ,   backgroundColor: '#CAF0F8' }} style={{width:"98%", height:"30%"}} >
<CardMedia
        component="img"
      sx={{ width: 300 }}
      //style={{ width: 150, height: 200 }}
        image={logo}
        alt="Live from space album cover"
      />
         <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 80,
          left: 0,
        }}
      />
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
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              hello
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
            hello
            </Typography>
            <Link variant="subtitle1" href="#">
            hello
            </Link>

            
          </Box>
        </Grid>
      </Grid>
      </CardContent>
      
    </Card>
    &nbsp;&nbsp;&nbsp;
    </Toolbar>
      
        </Box>
       
      </Box>
  
        {/* //box for search results */}
     
       {/* End of box */}


    </ThemeProvider>
    
  );



} 
export default Temp;

