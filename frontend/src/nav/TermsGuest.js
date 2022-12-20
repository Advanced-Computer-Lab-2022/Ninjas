import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Temp from './Temp';

const drawerWidth = 240;

const temp = {};

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Temp post={temp}/>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography component="h1" variant="h3">
        Online Career Course Refund Policy
        </Typography>
        <Typography paragraph>
Students who register for a training course occasionally change their mind for one reason or another. Regardless of the reason, we believe there should be a definite refund policy for students who decide not to take the course. Refunds for online courses are only given under the following circumstances:
</Typography>
<Typography paragraph>
1. The student/user did not access any portion of the online course AND the student/user requests a refund, in writing via email within three business days from the date of the registration (email notification sent). There will be no refunds for any online courses (or curricula) once a course has been accessed in any manner.
</Typography>
<Typography paragraph>
2. A full refund will be issued less an administrative fee of $100.
</Typography>
<Typography paragraph>
3. All shipped course materials (books, study guides, CDs, Self-Study Kits, Videos, etc.) are returned, unopened/unused at your own expense if you accept delivery of the package. There are no refunds for Kindle books or e-books.
Additional restocking and shipping costs may apply to returned books.
Please understand that with the enrollment and accessing of your online course, you have read and agree to the aforementioned refund policy. There are no extensions granted for your course. If you do not complete your course by the end-date on your welcome letter, there will be additional fees for extended access.
</Typography>
<Typography component="h1" variant="h5">
 

Online Professional Development Refund Policy
</Typography>
<Typography paragraph>
The student/user did not access any portion of the online course AND the student/user requests a refund, in writing via email within 72 hours of enrolling in the course.
We are unable to offer refunds after the exam has been attempted.
</Typography>
<Typography component="h1" variant="h5">
Online Enrichment Course Refund Policy
</Typography>
<Typography paragraph>
The student/user did not access any portion of the online course AND the student/user requests a refund, in writing via email within 72 hours of enrolling in the course.
We are unable to offer refunds after the exam has been attempted.
A refund will be issued less the materials fee for the course.
        </Typography>
        
      </Main>
    </Box>
  );
}