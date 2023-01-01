import * as React from 'react';
import { styled, createTheme, ThemeProvider , alpha} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import InstructorNav from './InstructorNav';
import { useEffect,useState } from 'react';
import axios from "axios";
import previewPic from '../coursesSearch2.jpg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ReactPlayer from 'react-player/youtube';
import {CircularProgress, Rating} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import home from '../home3.jpeg' ;
const instructorNav = {};

const mainFeaturedPost = {
    title: 'Title of a longer featured blog post',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imageText: 'main image description',
    linkText: 'Continue reading…',
  };

  const featuredPosts = [
    {
      title: 'Featured post',
      date: 'Nov 12',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random',
      imageLabel: 'Image Text',
    },
    {
      title: 'Post title',
      date: 'Nov 11',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://source.unsplash.com/random',
      imageLabel: 'Image Text',
    },
  ];

  
  const drawerWidth = 240;
  const Temp = () => {
  
  const mdTheme = createTheme();
  
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
      setOpen(!open);
    };
    const [course,setCourse] = useState(async () => {
      await axios.get('http://localhost:8000/mostPopularCourses')
      .then(res => setCourse(res.data))
      .catch(err => {
        if (err.response.status === 401) //you didn't login
        window.location.href='/';
      })
    })
  
    const [ready, setReady] = useState(false);
    useEffect(() => {
       if (course.length>0) {
            setReady(true);
        }
    }, [course]);
  
    return (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex'  }}>
        
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
                      

        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          {
            !ready &&
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="center"
                            alignItems="center"
                            minHeight="100vh"
                        >
                            <CircularProgress />
                        </Box>

                    }   
          {/* start of card popular */}
             <Toolbar >
          <Grid container spacing={2} sx={{ ml: 1 , mt:0.5 , mb:2}} style={{ gap: 20 }}>
            


{ready && course.map((course) => (

<Card  sx={{ display: 'flex' ,'&:hover': {    backgroundColor: 'white',
 },   backgroundColor: 'white' }} style={{width:"48%", height:"200px"}} 
onClick={()=>{window.location.href=`course/${course._id}`}} >

 <CardMedia
 allow="autoPlay"
 controls={true}
         component="img"
      sx={{ width: 250 }}
    
      // //style={{ width: 150, height: 200 }}
         src={home}
        alt="Preview"
      > 

  </CardMedia> 
{/*if video hntl30 else hntl3 sora*/}

    
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
            
           

            <Typography variant="h6" color="inherit"style={{width:'210'}} >
            subject : {course.subject} 
            </Typography>


            
          </Box>
        </Grid>
      </Grid>
      </CardContent>
      
    </Card> ))}
   
                    
    </Grid>
    </Toolbar>
      {/* end of card popular */}
        </main>
      
    
          </Box>
        </Box>
      </ThemeProvider>
      
    );
  
  
  
  } 
  export default Temp;
  
  