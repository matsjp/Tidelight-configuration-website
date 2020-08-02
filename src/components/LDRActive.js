import React, { useState } from 'react';
import clsx from 'clsx';
import useStyles from '../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {configServiceUUID, ldrActiveCharacteristicUUID} from './../UUIDs';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const LDRActive = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [readLdrActive, setReadLdrActive] = useState(null);
    const [status, setStatus] = useState(null);



    const handleOnClick = event => {
        event.preventDefault();

        const eventTarget = event.currentTarget.id;

        if (eventTarget === 'ldrActiveOn'){
            const value = Uint8Array.of(1);
            props.writeValue(configServiceUUID, ldrActiveCharacteristicUUID, successCallback, failureCallback, value);
        }
        else if (eventTarget === 'ldrActiveOff'){
            const value = Uint8Array.of(2);
            props.writeValue(configServiceUUID, ldrActiveCharacteristicUUID, successCallback, failureCallback, value);
        }
        else if (eventTarget === 'ldrActiveRead'){
            props.readValue(configServiceUUID, ldrActiveCharacteristicUUID, successCallback, failureCallback);
        }
    }

    const successCallback = value => {
        if (value.getUint8(0) === 1){
            setReadLdrActive('On')
        }
        else {
            setReadLdrActive('Off')
        }
    }
    
    const failureCallback = value => {
        console.log('Failure callback');
    }

    const formSubmit = (event) => {
        event.preventDefault();
    }

    const handleAlignment = (event, newAlignment) => {
        setStatus(newAlignment);
      };

    return (<Paper>
    <ToggleButtonGroup
        value={status}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        >
        <ToggleButton value="on" aria-label="left aligned">
                On
        </ToggleButton>
        <ToggleButton value="off" aria-label="centered">
                Off
        </ToggleButton>
    </ToggleButtonGroup>
    <p>{readLdrActive}</p>
    <Button variant='contained' id='ldrActiveRead' onClick={handleOnClick}>Read ldr active</Button>
    <form onSubmit={formSubmit}>
        <Button variant='contained' id='ldrActiveOn' onClick={handleOnClick}>On</Button>
        <Button variant='contained' id='ldrActiveOff' onClick={handleOnClick}>Off</Button>
    </form>
  </Paper>)
}

export default LDRActive;