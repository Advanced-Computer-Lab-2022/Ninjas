import { AppBar, Button, FormControl, IconButton, Input, InputLabel, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const [username, setUsername] = useState('');


  const handleChange = (event) => {
    //sets the username to the selected one
    setUsername(event.target.value);
  };

  const sendEmail = async () => {
    const response = await axios.post(`http://localhost:8000/forgotPassword`, { username })
    console.log(response.data)
    alert(response.data.message)
  }

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

          <Typography variant="h6" align="center"
            component="div" sx={{ flexGrow: 1 }}>
            Reset your password
          </Typography>
        </Toolbar>
      </AppBar>
      <br></br>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <TextField required align="center"
          id="username_field"
          label="enter your username"
          onChange={handleChange}
        />
        <br></br>
        <br></br>
        <Button align="center" variant="contained" onClick={sendEmail}>Send Email</Button>
      </Box>

    </div>
  )
}
export default ForgotPasswordPage;