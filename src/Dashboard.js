import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MainListItems from './listItems';
import TideApiDashboard from './components/TideApiDashboard';
import LEDDashboard from './components/LEDDashboard';
import LDRDashboard from './components/LDRDashboard';
import WifiDashboard from './components/WifiDashboard';
import useStyles from './Style'

export default function Dashboard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [dashboard, setDashboard] = React.useState('TideApiDashboard');
    const [isConnected, setIsConnected] = React.useState(false);
    const [bluetoothDevice, setBluetoothDevice] = React.useState(null);

    const readValue = (serviceUUID, characteristicUUID, successCallback, failureCallback) => {
        if (!bluetoothDevice){
          console.log('No bluetoothdevice')
          failureCallback();
        }
        if (isConnected){
          bluetoothDevice.gatt.getPrimaryService(serviceUUID)
          .then(service => {
            return service.getCharacteristic(characteristicUUID)
            .then(characteristic => {
              return characteristic.readValue()
              .then(value => {
                successCallback(value)
              })
            })
          })
        }
        else {
          console.log('Readfailure not connected')
          failureCallback();
        }
      }
    
    const writeValue = (serviceUUID, characteristicUUID, successCallback, failureCallback, value) => {
        if (!bluetoothDevice){
          console.log('No bluetoothdevice')
          failureCallback();
        }
        if (isConnected){
          bluetoothDevice.gatt.getPrimaryService(serviceUUID)
          .then(service => {
            return service.getCharacteristic(characteristicUUID)
            .then(characteristic => {
              return characteristic.writeValue(value)
              .then(value => {
                return characteristic.readValue()
                .then(value => {
                  successCallback(value)
                })
              })
            })
          })
        }
        else {
          console.log('Readfailure not connected')
          failureCallback();
        }
      }

    let selectedDashboard;
    if (dashboard === 'TideApiDashboard'){
        selectedDashboard = <TideApiDashboard readValue={readValue} writeValue={writeValue}/>;
    }
    else if (dashboard === 'LEDDashboard'){
        selectedDashboard = <LEDDashboard readValue={readValue} writeValue={writeValue}/>
    }
    else if (dashboard === 'LDRDashboard'){
        selectedDashboard = <LDRDashboard readValue={readValue} writeValue={writeValue}/>
    }
    else if (dashboard === 'WifiDashboard'){
        selectedDashboard = <WifiDashboard readValue={readValue} writeValue={writeValue}/>
    }

    const handleOnClick = event => {
        if (event.currentTarget.id === 'toolbar'){
            if (!isConnected){
                connect();
            }
            else {
                disconnect();
            }
        }
    }

    const connect = () => {
        let options = {};
          options.acceptAllDevices = true;
          options.optionalServices = [0x13333333333333333333333333333337, 0xec00];
        navigator.bluetooth.requestDevice(options)
        .then(device => {
            console.log(device);
          setBluetoothDevice(device);
          console.log(device);
          console.log('> Name:             ' + device.name);
          console.log('> Id:               ' + device.id);
          console.log('> Connected:        ' + device.gatt.connected);
          device.addEventListener('gattserverdisconnected', onDeviceDisconnected);
          return device.gatt.connect()
            .then(()=>{
              setIsConnected(true);
            });
        })
      }

    const disconnect = () => {
        if (!bluetoothDevice){
          return;
        }
        if (bluetoothDevice.gatt.connected){
            bluetoothDevice.gatt.disconnect();
        }
        else {
          console.log('Already disconnected')
        }
      }
    
    const onDeviceDisconnected = (event)=>{
        console.log('Disconnected');
        setIsConnected(false);
    }

    return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar} onClick={handleOnClick} id='toolbar'>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          {isConnected ? 'Disconnect' : 'Connect'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><MainListItems setDashboard={setDashboard}/></List>
        <Divider />
      </Drawer>
      {selectedDashboard}
    </div>
    );
}