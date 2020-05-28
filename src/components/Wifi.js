import React, { useState } from 'react';
import clsx from 'clsx';
import useStyles from '../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import {wifiServiceUUID, addWifiCharacteristicUUID} from '../UUIDs';
import { str2ab, ab2str} from './../utils'

const Wifi = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const ssid = props.wifiName.split(":")[0];
    const passwordID = ssid + "Password";

    const handleOnClick = event => {
        //TODO
        event.preventDefault();

        const eventTarget = event.currentTarget.id;

        if (eventTarget === 'addWifiButton'){
            if (props.hasPassword){
                const password = document.querySelector('#' + passwordID).value;
                var value = ssid + ":" + password;
            }
            else{
                var value = ssid
            }
            props.writeValueNoRead(wifiServiceUUID, addWifiCharacteristicUUID, successCallback, failureCallback, str2ab(value));
        }
    }
    
    const successCallback = value => {
        console.log(value);
    }

    
    const failureCallback = value => {
        console.log('Failure callback');
    }

    return (<Paper>
    <p>{ssid}</p>
    {props.hasPassword ? <TextField id={passwordID} label='Wifi password' variant='filled' 
        type='text' /*onChange={handleLatChange}*/></TextField> : null }
    <Button variant='contained' id='addWifiButton' onClick={handleOnClick}>Add wifi</Button>
  </Paper>)
}

export default Wifi;