import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import home from '../home3.jpeg' ;
import {useState,useEffect} from "react";
import axios from "axios";
import { Alert, AlertTitle, Backdrop, CircularProgress} from '@mui/material';
import Box from '@mui/material/Box';

function FeaturedPost(props) {
  const { post } = props;
  const[wait,setWait]=useState(false);
  //mostPopularCourses
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



    <Grid item sm={12} md={6} ml={4}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
            {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={home}
            alt="React Image"
          />
        </Card>
      </CardActionArea>
    </Grid>


  );
}

FeaturedPost.propTypes = {
   post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;