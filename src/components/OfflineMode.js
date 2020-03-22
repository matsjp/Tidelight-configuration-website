import React, { useState } from 'react';
import clsx from 'clsx';
import useStyles from '../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {offlineServiceUUID, offlineModeCharacteristicUUID} from './../UUIDs';
import { str2ab, ab2str} from './../utils'

const OfflineMode = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [readMode, setReadMode] = useState(null);



    const handleOnClick = event => {
        event.preventDefault();

        const eventTarget = event.currentTarget.id;

        if (eventTarget === 'offlineModeOn'){
            const value = Uint8Array.of(1);
            props.writeValue(offlineServiceUUID, offlineModeCharacteristicUUID, successCallback, failureCallback, value);
        }
        else if (eventTarget === 'offlineModeOff'){
            const value = Uint8Array.of(2);
            props.writeValue(offlineServiceUUID, offlineModeCharacteristicUUID, successCallback, failureCallback, value);
        }
        else if (eventTarget === 'modeRead'){
            props.readValue(offlineServiceUUID, offlineModeCharacteristicUUID, successCallback, failureCallback);
        }
    }

    const successCallback = value => {
        if (value.getUint8(0) === 1){
            setReadMode('On')
        }
        else {
            setReadMode('Off')
        }
    }
    
    const failureCallback = value => {
        console.log('Failure callback');
    }

    const formSubmit = (event) => {
        event.preventDefault();
    }

    return (<Paper className={fixedHeightPaper}>
    <p>{readMode}</p>
    <Button variant='contained' id='modeRead' onClick={handleOnClick}>Read offline mode</Button>
    <form onSubmit={formSubmit}>
        <Button variant='contained' id='offlineModeOn' onClick={handleOnClick}>On</Button>
        <Button variant='contained' id='offlineModeOff' onClick={handleOnClick}>Off</Button>
    </form>
  </Paper>)
}

export default OfflineMode;