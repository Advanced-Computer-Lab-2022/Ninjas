import axios from 'axios';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const TraineePage = () => {
// this id is for a corporate trainee
  const userId = '635bcbc0b433a250dfd838a8'
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
            onClick={() => window.location.href=`/traineeSearch?${userId}`}
            key={userId}

          > Search and Filter Courses </Typography>



          <Avatar src="/broken-image.jpg" />
          </Toolbar>
      </AppBar>
        </div>
    )
}
export default TraineePage