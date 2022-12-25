
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
import axios from 'axios';
import { searchtemp } from '../components/Search';


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
//logout button function
const logout = async () => {
  const response = await axios.post('http://localhost:8000/logout')
  .catch(err => console.log(err));
  
  if(response.status===200)
  window.location.href='/';
}
const [user,setUser] = React.useState(async () => {
  await axios.get('http://localhost:8000/userBySession')
  .then(res => setUser(res.data))
  .catch(err => {
    if (err.response.status === 401) //you didn't login
    window.location.href='/';
  })
})
const handleKeypress = e => {
  //it triggers by pressing the enter key
if (e.key === 'Enter') {
  console.log('renteeer')
 // handleSearch(e)
  window.location.href=`/temp?userId=${user._id}&search=${e.target.value}`
}
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
            <Search  >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
             defaultValue = {searchtemp}
              //onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeypress}
              
            />
          </Search>
          &nbsp;&nbsp;
          <box>

          <ListItemButton  >
            <ListItemIcon >
          <HomeIcon sx={{color:'#CAF0F8' }} />
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
          <ListItemText primary='My Courses'/>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
          <CreateIcon sx={{color:'black' }} />
          </ListItemIcon>
          <ListItemText primary='Create Course'/>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
          <Wallet sx={{color:'black' }} />
          </ListItemIcon>
          <ListItemText primary='Wallet'/>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
          <SettingsIcon sx={{color:'black' }} />
          </ListItemIcon>
          <ListItemText primary='Settings'/>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
          <ReportIcon sx={{color:'black' }} />
          </ListItemIcon>
          <ListItemText primary='Report'/>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
          <HelpIcon sx={{color:'black' }} />
          </ListItemIcon>
          <ListItemText primary='Help'/>
          </ListItemButton>
          </List>

        </Drawer>
      </Box>
    </ThemeProvider>
    
  );



} 
export default Temp;

