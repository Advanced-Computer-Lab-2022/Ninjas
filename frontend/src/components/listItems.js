import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

const  change1 =()=>{
  window.location.href=`/admin`
}
// const  change2 =()=>{
//   window.location.href=`/AdminProfile`
// }
// const  change3 =()=>{
//   window.location.href=`/AdminSettings`
// }


const mainListItems = (
  <React.Fragment>
    <ListItemButton onClick={()=> {change1()}}>
      <ListItemIcon sx={{ color: '#CAF0F8' }}>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText />
    </ListItemButton>
     {/* <ListItemButton onClick={()=> {change2()}}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
    <ListItemText primary="Profile" />
    </ListItemButton>
    <ListItemButton onClick={()=> {change3()}}>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>  */}
 
  </React.Fragment>
);
export default mainListItems;