import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import useStyles from '../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {offlineServiceUUID, OfflineDataCharacteristicUUID} from './../UUIDs';
import { str2ab, ab2str} from './../utils'
import CircularProgress from '@material-ui/core/CircularProgress'

const OfflineData = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [status, setStatus] = useState(null);
    const [progressDisplay, setProgressDisplay] = useState(false);


    useEffect(() => {
        const getOfflineDataStatus = async () => {
            setProgressDisplay(true);
            if (props.bluetoothDevice!=null){
                try{
                    const service = await props.bluetoothDevice.gatt.getPrimaryService(offlineServiceUUID);
                    const characteristic = await service.getCharacteristic(OfflineDataCharacteristicUUID);
                    let value = characteristic.value;
                    if (value === null){
                        value = await props.readValue(offlineServiceUUID, OfflineDataCharacteristicUUID);
                    }
                    const valueInt = value.getUint8(0);
                    switch(valueInt) {
                        case 0x1:
                            setStatus('Offline data works');
                            break;
                        case 0x2:
                            setStatus('Not enough data in file');
                            break;
                        case 0x3:
                            setStatus('File not found');
                            break
                        case 0x4:
                            setStatus('An error has occured');
                            break
                        case 0x5:
                            setStatus('An unknown error has occured');
                            break
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
    {progressDisplay ? <CircularProgress/> : <p>Offline data status: {status}</p>}
  </Paper>)
}

export default OfflineData;