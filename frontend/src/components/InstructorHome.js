import axios from 'axios';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const InstructorPage = () => {
  const [instructor, setInstructor] = useState(null);

  //when this page is first loaded, we get the instructor object from the backend.
  const userId = '6352fbe57a237a799c9ed29f';

  // const getInstructor = async () => {
  //   await axios.get(`http://localhost:8000/instructor/${userId}`).then(
  //     (res) => {
  //       const instructor = res.data
  //       console.log(instructor)
  //       setInstructor(instructor)
  //     }
  //   );
  // }

  // useEffect(() => {
  //       getInstructor();
  // },[])




  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {/*Inside the IconButton, we 
           can render various icons*/}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          {/* The Typography component applies 
           default font weights and sizes */}

          <Typography variant="h6"
            component="div" sx={{ flexGrow: 1 }}>
            Welcome back
          </Typography>

          <Typography variant="h7" align="center"
            hover
            sx={{
              "&:hover": {
                cursor: "pointer",
              }
            }}

          > hello</Typography>



          <Avatar src="/broken-image.jpg" />
        </Toolbar>
      </AppBar>
      <br></br>
      <Button component={Link} to='/changeCountry' variant="outlined">Change Country</Button>
      <br></br>
      <Button component={Link} to='/forgotPassword' variant="outlined">I forgot my password</Button>

    </div>
  )
}
export default InstructorPage