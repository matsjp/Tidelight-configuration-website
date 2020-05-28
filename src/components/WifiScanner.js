import React, { useState } from 'react';
import clsx from 'clsx';
import useStyles from '../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import {wifiServiceUUID, wifiScanCharacteristicUUID} from '../UUIDs';
import { str2ab, ab2str} from './../utils'
import Wifi from './Wifi'

const WifiScanner = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [wifis, setWifis] = useState([]);

    const handleOnClick = event => {
        //TODO
        event.preventDefault();

        const eventTarget = event.currentTarget.id;

        if (eventTarget === 'scanButton'){
            props.subscribe(wifiServiceUUID, wifiScanCharacteristicUUID, subscribeSuccessCallback, failureCallback, handleWifiChange);
        }
    }

    const subscribeSuccessCallback = () => {
        const value = Uint8Array.of(1);
        console.log('Starting scan')
        props.writeValueNoRead(wifiServiceUUID, wifiScanCharacteristicUUID, startScanningSuccessCallback, failureCallback, value);
    }
    
    const startScanningSuccessCallback = value => {
        console.log(value);

    }

    const handleWifiChange = event => {
        var value = ab2str(event.target.value.buffer);
        console.log('Wifi change: ' + value);
        updateWifis(value);
    }

    const updateWifis = (wifi) => {
        setWifis(wifis => {
            if (wifi == undefined || wifi.length == 0 || wifis.includes(wifi)|| wifi.indexOf(':') == 0){
                return wifis;
            }
            else {
                return [...wifis, wifi]
            }
        })
    }
    
    const failureCallback = value => {
        console.log('Failure callback');
    }

    return (<Paper className={fixedHeightPaper}>
    <Button variant='contained' id='scanButton' onClick={handleOnClick}>Scan</Button>
    {wifis.map(wifi => <Wifi key={wifi} hasPassword={wifi.indexOf(":") != -1} writeValueNoRead={props.writeValueNoRead} wifiName={wifi}/>)}
  </Paper>)
}

export default WifiScanner;