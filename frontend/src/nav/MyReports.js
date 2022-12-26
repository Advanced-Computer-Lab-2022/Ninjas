import * as React from 'react';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TraineeNav from './TraineeNav';
import InstructorNav from './InstructorNav';
import { useEffect,useState } from 'react';
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const traineeNav = {};
const instructorNav = {};


  
 
    const Temp = () => {
    const [user,setUser] = useState(async () => {
      await axios.get('http://localhost:8000/userBySession')
      .then(res => setUser(res.data))
      .catch(err => {
        if (err.response.status === 401) //you didn't login
        window.location.href='/';
      })
    })
 
    const [report,setReport] = useState(async () => {
      await axios.get('http://localhost:8000/viewMyReports')
      .then(res => setReport(res.data))
      .catch(err => {
        if (err.response.status === 401) //you didn't login
        window.location.href='/';
      })
    })
  
    const [ready, setReady] = useState(false);
    useEffect(() => {
       if (report.length>0) {
            setReady(true);
        }
    }, [report]);

    const [ready2, setReady2] = useState(false);
    useEffect(() => {
      if (user._id) {
          setReady2(true);

          
      }
  }, [user])

  
  const mdTheme = createTheme();
   
    
  
    return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex'  }}>
        
          <CssBaseline />
          {ready2 && user.type=='INSTRUCTOR' &&
          <InstructorNav post={instructorNav}/>
          }

        {ready2 && user.type!='INSTRUCTOR' &&
          <TraineeNav post={TraineeNav}/>
          }
          
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
                      

      { ready2&&
       <main>
        <Typography component="h1" variant="h4" align="left" sx={{mt:11,ml:3}}>
          Reported Problems
          </Typography>
          <Toolbar sx={{mt:2}}>
          
          <Grid container spacing={2} sx={{ ml: 1 , mt:0.5 , mb:2}} style={{ gap: 20 }}> 



            


{ready && ready2 && report.map((report) => (
  

<Card  sx={{ display: 'flex' ,'&:hover': {    backgroundColor: 'white',
 },   backgroundColor: 'white' }} style={{width:"48%", height:"200px"}} 
 >


 {report.progress ==='PENDING'?( 
 <CardContent sx={{ flex: '1 0 auto' }}>

      <Grid container>
        <Grid item md={0}>
          <Typography>
            Pending problems
          </Typography>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 0, md: 0 },
              pr: { md: 0 },
            }}
          >
           
            <Typography  component="h5" variant="h5" color="inherit" style={{width:'210px'}} >
              {report.problem}
            
            </Typography>
           

            <Typography variant="h6" color="inherit" style={{width:'210px'}}>
            Status : {report.progress}
            </Typography>
            
           

            


            
          </Box>
        </Grid>
      </Grid>
      </CardContent>):( 
       
      <CardContent sx={{ flex: '1 0 auto' }}>
        <Typography>
            Resolved Problems
          </Typography>
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
              {report.problem}
            
            </Typography>
           

            <Typography variant="h6" color="inherit" style={{width:'210px'}}>
            Status : {report.progress}
            </Typography>
            
           

            


            
          </Box>
        </Grid>
      </Grid>
      </CardContent>)}


      
      
    </Card> ))}
   
                    
    </Grid>
    </Toolbar>
        </main>}
      
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
               
              </Grid>
            </Container>
  
  
  
           
        
  
  
    
          </Box>
        </Box>
      </ThemeProvider>
      
    );
  
  
  
  } 
  export default Temp;
  
  