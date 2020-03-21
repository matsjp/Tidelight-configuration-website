import React, { useState } from 'react';
import clsx from 'clsx';
import useStyles from '../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import {configServiceUUID, brightnessCharacteristicUUID} from './../UUIDs';

const Brightness = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const brightnessMin = 0;
    const brightnessMax = 100;
    const [invalidBrightness, setInvalidBrightness] = useState(false);
    const helperText = 'Brightness must be between ' + brightnessMin + ' and ' + brightnessMax;
    const [readBrightness, setReadBrightness] = useState(null);
    const [progressDisplay, setProgressDisplay] = useState(false);

    const brightnessText = 'Brightness: ' + readBrightness;

    const handleBrightnessChange = (event) => {
        const brightness = parseInt(document.querySelector('#brightnessInput').value);
        
        if (brightness < brightnessMin || brightness > brightnessMax){
            if (!invalidBrightness){
                setInvalidBrightness(true);
            }
        }
        else {
            if (invalidBrightness){
                setInvalidBrightness(false);
            }
        }
    }

    const handleOnClick = event => {
        event.preventDefault();

        const eventTarget = event.currentTarget.id;

        if (eventTarget === 'brightnessSubmit'){
            setProgressDisplay(true);
            const value = Uint8Array.of(parseInt(document.querySelector('#brightnessInput').value));
            props.writeValue(configServiceUUID, brightnessCharacteristicUUID, successCallback, failureCallback, value)
        }
        else if (eventTarget === 'brightnessRead'){
            setProgressDisplay(true);
            props.readValue(configServiceUUID, brightnessCharacteristicUUID, successCallback, failureCallback);
        }
    }

    const successCallback = value => {
        setReadBrightness(value.getUint8(0));
        setProgressDisplay(false);
    }
    
    const failureCallback = value => {
        setProgressDisplay(false);
        console.log('Failure callback');
    }

    const formSubmit = (event) => {
        event.preventDefault();
    }

    return (<Paper className={fixedHeightPaper}>
    <p>{brightnessText}</p>
    <Button variant='contained' id='brightnessRead' onClick={handleOnClick}>Read brightness</Button>
    <form onSubmit={formSubmit}>
        <TextField id='brightnessInput' label='New brightness' variant='filled' 
        type='number' min={brightnessMin} max={brightnessMax} onChange={handleBrightnessChange}
        helperText={helperText} error={invalidBrightness}></TextField>
        <Button variant='contained' disabled={invalidBrightness} id='brightnessSubmit' onClick={handleOnClick}>Submit</Button>
        {progressDisplay ? null : null}
    </form>
  </Paper>)
}

export default Brightness;