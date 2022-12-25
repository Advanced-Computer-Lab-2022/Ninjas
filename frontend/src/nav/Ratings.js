
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Alert, AlertTitle, Backdrop, CircularProgress, Dialog, DialogTitle, LinearProgress, Rating, TextField } from '@mui/material';
import img from "../components/backgroundCourse.png";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PersonIcon from '@mui/icons-material/Person';
import InstructorNav from './InstructorNav';


const instructorNav = {};


const CoursePage = () => {

    const mdTheme = createTheme();


    const [rating, setRating] = useState(0);
    const [text, setText] = useState("")
    const handleRating = (event) => {
        setRating(event.target.value);
    };
    const handleText = (event) => {
        setText(event.target.value);
    };

    //endpoint code
 
    const [user, setUser] = useState(async () => {
        await axios.get(`http://localhost:8000/currentUser`)
            .then(res => {
                setUser(res.data);
            })
            .catch((error) => {
                console.log(error)
                if (error.response.data.message === "you did not login")
                    window.location.href = '/';
            })
    })
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (user._id) {
            setReady(true);
        }
    }, [user])
  
 
 
    



    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                    <InstructorNav post={instructorNav} />
                

                <Box
                    component="main"
                    sx={{
                        backgroundColor: '#ffffff',
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >

                    {/*start writing your body code*/}
                    {
                        !ready &&
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            minHeight="100vh"
                        >
                            <CircularProgress />
                        </Box>

                    }





{ready &&   
                    <div>

                         

                            

{/*Course ratings*/}
<Box
    sx={{
        mb: 2,
        mr: 0,
        p: 1, border: 2, borderColor: '#00B4D8',
        mt:9
    }}>

    <Typography color="#03045E" sx={{ width: 155, fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}> My  Reviews </Typography>
    <Typography color="#03045E" sx={{ width: 155, fontSize: 14, fontWeight: 'bold' }}> Average Rating </Typography>
    <Rating defaultValue={user.rating} precision={0.1} readOnly />
    {  
        user.review.map((review) => (
            <div>
                <Typography color="#03045E" sx={{ fontSize: 14, fontWeight: 'bold' }}> <PersonIcon /> {review.firstName} {review.lastName}
                </Typography>
                <Rating defaultValue={review.rating} precision={0.1} readOnly />

                <Typography color="#000000" sx={{ fontSize: 14 }}>{review.text}</Typography>
                <Divider />
            </div>
        ))
    }
    <Button></Button>
</Box>

</div>}
                    


                </Box>
            </Box>
        </ThemeProvider>

    );



}
export default CoursePage;

