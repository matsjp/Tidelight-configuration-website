import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';

const MainListItems = props => {

    const handleClick = (event) => {
        let eventTarget = event.currentTarget;
        if (eventTarget.id === 'apiButton'){
            props.setDashboard('TideApiDashboard');
        }
        else if (eventTarget.id === 'LEDButton'){
            props.setDashboard('LEDDashboard');
        }
        else if (eventTarget.id === 'LDRButton'){
            props.setDashboard('LDRDashboard');
        }
        else if (eventTarget.id === 'wifiButton'){
            props.setDashboard('WifiDashboard');
        }
        else if (eventTarget.id === 'offlineButton'){
          props.setDashboard('OfflineDashboard');
      }
    }

    return (
        <div>
    <ListItem button onClick={handleClick} id='apiButton'>
    <ListItemIcon>
      <DashboardIcon />
    </ListItemIcon>
    <ListItemText primary="Tide api" />
  </ListItem>
  <ListItem button onClick={handleClick} id='LEDButton'>
    <ListItemIcon>
      <ShoppingCartIcon />
    </ListItemIcon>
    <ListItemText primary="LED" />
  </ListItem>
  <ListItem button onClick={handleClick} id='LDRButton'>
    <ListItemIcon>
      <PeopleIcon />
    </ListItemIcon>
    <ListItemText primary="LDR" />
  </ListItem>
  <ListItem button onClick={handleClick} id='wifiButton'>
    <ListItemIcon>
      <BarChartIcon />
    </ListItemIcon>
    <ListItemText primary="Wifi" />
  </ListItem>
  <ListItem button onClick={handleClick} id='offlineButton'>
    <ListItemIcon>
      <BarChartIcon />
    </ListItemIcon>
    <ListItemText primary="Offline" />
  </ListItem>
</div>)
}

export default MainListItems