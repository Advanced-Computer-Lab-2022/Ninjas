
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
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import mainListItems from './listItems';


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


const cards = [{key:1, title:"Reports", description:"These are different users problems and reports", buttonText: "VIEW"
,image: "https://tse1.mm.bing.net/th?id=OIP.dqrTkwneORt0KZLWKyANEgHaHa&pid=Api&P=0", function: change2}, 
{key:1, title:"Refund Requests", description:"These are different trainees' refund requests", buttonText: "VIEW",
image: "https://tse1.mm.bing.net/th?id=OIP.vs5A0x1ooueCgKPdiwzDLgHaHa&pid=Api&P=0", function: change3}, 
{key:1, title:"Access Course Requests", description:"These are corporate trainees requests to access a specific course", buttonText: "VIEW",
image: "https://tse2.mm.bing.net/th?id=OIP.UABD9Mb1oYouQvydJGUiTAHaHa&pid=Api&P=0", function: change4}, 
{key:1, title:"Courses Promotion", description:"Set a promotion for course(s)", buttonText: "SET",
image: "https://tse3.mm.bing.net/th?id=OIP.GdBTwlyTzIG2tPr__bzTTgHaHa&pid=Api&P=0", function: change5}, 
{key:1, title:"Add Users", description:"Create accounts for different users", buttonText: "ADD",
image: "https://tse1.mm.bing.net/th?id=OIP.0qMbAJ3oDdsvBO9JVsZzDQHaHa&pid=Api&P=0", function: change6}];

//const mainListItems = ["Profile", "Change username", "Change password", "Change email"]

const theme = createTheme();

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

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex'  }}>
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
            {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          &nbsp;&nbsp;&nbsp;
          {/* <box>

          <Button variant="contained"  sx={{ color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}>Sign In</Button>
          </box>
          &nbsp;&nbsp;&nbsp; */}
          <box>
          <Button variant="outlined" sx={{ color: 'black', backgroundColor: '#CAF0F8',  borderColor: '#CAF0F8' }}>LOG OUT</Button>
          </box>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon  />
              </Badge>
            </IconButton> */}
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
         
  
          <CssBaseline />
      {/* <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar> 
      #CAF0F8
      */}
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: '#CAF0F8',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h4"
              variant="h4"
              align="center"
              fontWeight={'bold'}
              fontSize={'50px'}
              color="#03045E"
              gutterBottom
            >
              Welcome to your page Admin !
            </Typography>
           
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} >
          {/* End hero unit */}
          <Grid container spacing={4} >
            {cards.map((card) => (
              <Grid item key={card.key} xs={10} sm={7} md={2.35}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' , align:'center'}}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={card.image}
                   
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>
                    {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={()=> {card.function()}}>{card.buttonText}</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box> */}

        </Box>
      </Box>
 
    </ThemeProvider>
    
                )};
 function Copyright(props) {
                    return (
                      <Typography variant="body2" color="text.secondary" align="center" {...props}>
                        {' '}
                        <Link color="inherit" >
                        </Link>{' '}
                        {''}
                      </Typography>
                    );
                  }

 

export default Temp;

