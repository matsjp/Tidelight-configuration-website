import React, { useState, useEffect } from 'react';
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
import OfflineDashboard from './components/OfflineDashboard'
import useStyles from './Style'
import { configServiceUUID, offlineServiceUUID, wifiServiceUUID} from './UUIDs'
import {DeviceNotFoundError, NotConnectedError} from './errors'

export default function Dashboard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [dashboard, setDashboard] = React.useState('TideApiDashboard');
    const [isConnected, setIsConnected] = React.useState(false);
    const [bluetoothDevice, setBluetoothDevice] = React.useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
      try{
        if(!navigator.bluetooth.getAvailability()){
          setError("Nettleseren finner ingen bluetooth adapter. For å bruke denne nettsiden trenger du en fungerende bluetooth adapter");
        }
      }
      catch(e){
        if (e.name === "TypeError"){
          setError("Din nettleser støtter ikke web bluetooth. Bruk nyeste versjon av Google Chrome på Windows, Android eller Mac");
        }
        else{
          console.log(e);
          setError("En ukjent feil har oppstått");
        }
      };
    },[])

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
              }).catch(error => { console.log(error); });
            })
          })
        }
        else {
          console.log('Read failure not connected')
          failureCallback();
        }
      }

      const readValue1 = async (serviceUUID, characteristicUUID) => {
        if (!bluetoothDevice){
          throw new DeviceNotFoundError("No bluetooth device");
        }
        if (!isConnected){
          throw new NotConnectedError("Not connected");
        }
        const service = await bluetoothDevice.gatt.getPrimaryService(serviceUUID);
        const characteristic = await service.getCharacteristic(characteristicUUID);
        const value = await characteristic.readValue();
        return value;
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
                }).catch(error => { console.log(error); });
              })
            })
          })
        }
        else {
          console.log('Write failure not connected')
          failureCallback();
        }
      }

      const writeValue1 = async (serviceUUID, characteristicUUID, value) => {
        if (!bluetoothDevice){
          throw new DeviceNotFoundError("No bluetooth device");
        }
        if (!isConnected){
          throw new NotConnectedError("Not connected");
        }
        const service = await bluetoothDevice.gatt.getPrimaryService(serviceUUID);
        const characteristic = await service.getCharacteristic(characteristicUUID);
        await characteristic.writeValue(value);
      }

      const writeValueNoRead = (serviceUUID, characteristicUUID, successCallback, failureCallback, value) => {
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
                successCallback(value);
              }).catch(error => { console.log(error); });
            })
          })
        }
        else {
          console.log('Write failure not connected')
          failureCallback();
        }
      }

      const subscribe = (serviceUUID, characteristicUUID, successCallback, failureCallback, changeCallback) => {
        if (!bluetoothDevice){
          console.log('No bluetoothdevice');
          failureCallback();
        }
        if (isConnected){
          bluetoothDevice.gatt.getPrimaryService(serviceUUID)
          .then(service => {
            return service.getCharacteristic(characteristicUUID)
            .then(characteristic => {
              characteristic.startNotifications()
              .then(characteristic => {
                characteristic.addEventListener('characteristicvaluechanged', changeCallback);
                successCallback();
              }).catch(error => { console.log(error); });
            })
          })
        }
        else {
          console.log('Subscribe failure not connected');
          failureCallback();
        }
      }

    let selectedDashboard;
    if (dashboard === 'TideApiDashboard'){
        selectedDashboard = <TideApiDashboard readValue={readValue} writeValue={writeValue} readValue1={readValue1} writeValue1={writeValue1} bluetoothDevice={bluetoothDevice}/>;
    }
    else if (dashboard === 'LEDDashboard'){
        selectedDashboard = <LEDDashboard readValue={readValue} writeValue={writeValue} writeValueNoRead={writeValueNoRead} readValue1={readValue1} writeValue1={writeValue1} bluetoothDevice={bluetoothDevice}/>
    }
    else if (dashboard === 'LDRDashboard'){
        selectedDashboard = <LDRDashboard readValue={readValue} writeValue={writeValue}/>
    }
    else if (dashboard === 'WifiDashboard'){
        selectedDashboard = <WifiDashboard readValue={readValue} writeValue={writeValue} subscribe={subscribe} writeValueNoRead={writeValueNoRead}/>
    }
    else if (dashboard === 'OfflineDashboard'){
      selectedDashboard = <OfflineDashboard readValue={readValue} writeValue={writeValue}/>
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

    const connect = async () => {
        let options = {};
          options.acceptAllDevices = true;
          options.optionalServices = [configServiceUUID, offlineServiceUUID, wifiServiceUUID];

          try{
            const device = await navigator.bluetooth.requestDevice(options);
            console.log(device);
            setBluetoothDevice(device);
            console.log(device);
            console.log('> Name:             ' + device.name);
            console.log('> Id:               ' + device.id);
            console.log('> Connected:        ' + device.gatt.connected);
            device.addEventListener('gattserverdisconnected', onDeviceDisconnected);
            await device.gatt.connect();
            setIsConnected(true);
          }
          catch(e){
            console.log(e);
          }
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

    let sidebar;
    let dashboardContent;
    if (isConnected){
      sidebar = <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={false}
    >
      <div className={classes.toolbarIcon}>
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
        </div>
      <Divider />
      <List><MainListItems setDashboard={setDashboard}/></List>
      <Divider />
    </Drawer>;
    dashboardContent = selectedDashboard;
    }
    else {
      sidebar = "";
      dashboardContent = "";
    }



    if (error != null){
      return <p>{error}</p>
    }

    return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar} onClick={handleOnClick} id='toolbar'>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          {isConnected ? 'Disconnect' : 'Connect'}
          </Typography>
        </Toolbar>
      </AppBar>
      {sidebar}
      {dashboardContent};
    </div>
    );
}