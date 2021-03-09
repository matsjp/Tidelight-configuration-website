import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import useStyles from '../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {wifiServiceUUID, internetConnectionCharacteristicUUID} from './../UUIDs';
import { str2ab, ab2str} from './../utils'
import CircularProgress from '@material-ui/core/CircularProgress'

const InternetConnection = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [status, setStatus] = useState(null);
    const [progressDisplay, setProgressDisplay] = useState(false);


    useEffect(() => {
        const getOfflineDataStatus = async () => {
            setProgressDisplay(true);
            if (props.bluetoothDevice!=null){
                try{
                    const service = await props.bluetoothDevice.gatt.getPrimaryService(wifiServiceUUID);
                    const characteristic = await service.getCharacteristic(internetConnectionCharacteristicUUID);
                    let value = characteristic.value;
                    if (value === null){
                        value = await props.readValue(wifiServiceUUID, internetConnectionCharacteristicUUID);
                    }
                    const valueInt = value.getUint8(0);
                    console.log(valueInt);
                    switch(valueInt) {
                        case 0x1:
                            setStatus('connected');
                            break;
                        case 0x2:
                            setStatus('not connected');
                            break;
                        default:
                            setStatus('An unknown error has occured');
                        } 
                    setProgressDisplay(false);
                }
                catch(e){
                    console.log(e);
                    setProgressDisplay(false);
                }
            }
        }
        getOfflineDataStatus();
    }, []);

    return (<Paper className={fixedHeightPaper}>
    {progressDisplay ? <CircularProgress/> : <p>Internet status: {status}</p>}
  </Paper>)
}

export default InternetConnection;