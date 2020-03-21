import React, { useState } from 'react';
import clsx from 'clsx';
import useStyles from '../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {configServiceUUID, movingSpeedCharacteristicUUID} from './../UUIDs';
import { str2ab, ab2str} from './../utils'

const MovingSpeed = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const movingSpeedMin = 0.01;
    const [invalidMovingSpeed, setInvalidMovingSpeed] = useState(false);
    const helperText = 'Moving speed must be a positive number. Can be both integers and decimals';
    const [readMovingSpeed, setReadMovingSpeed] = useState(null);

    const movingSpeedText = 'Moving speed: ' + readMovingSpeed;

    const handleMovingSpeedChange = (event) => {
        const validationRegex = new RegExp('^\d+(\.?\d{1,2}){0,1}$');
        const movingSpeed = document.querySelector('#movingSpeedInput').value;

        //TODO: figure this out
        /*if (parseFloat(movingSpeed) < movingSpeedMin){
            if (!invalidMovingSpeed){
                setInvalidMovingSpeed(true);
            }
            else{
                if (invalidMovingSpeed){
                    setInvalidMovingSpeed(false);
                }
            }
        }
        /*if (validationRegex.test(movingSpeed)){
            if (invalidMovingSpeed){
                setInvalidMovingSpeed(false);
            }
        }
        else {
            if (!invalidMovingSpeed){
                setInvalidMovingSpeed(true);
            }
        }*/
    }

    const handleOnClick = event => {
        event.preventDefault();

        const eventTarget = event.currentTarget.id;

        if (eventTarget === 'movingSpeedSubmit'){
            const value = str2ab(document.querySelector('#movingSpeedInput').value);
            props.writeValue(configServiceUUID, movingSpeedCharacteristicUUID, successCallback, failureCallback, value)
        }
        else if (eventTarget === 'movingSpeedRead'){
            props.readValue(configServiceUUID, movingSpeedCharacteristicUUID, successCallback, failureCallback);
        }
    }

    const successCallback = value => {
        setReadMovingSpeed(ab2str(value.buffer))
    }
    
    const failureCallback = value => {
        console.log('Failure callback');
    }

    const formSubmit = (event) => {
        event.preventDefault();
    }

    return (<Paper className={fixedHeightPaper}>
    <p>{movingSpeedText}</p>
    <Button variant='contained' id='movingSpeedRead' onClick={handleOnClick}>Read moving speed</Button>
    <form onSubmit={formSubmit}>
        <TextField id='movingSpeedInput' label='New moving speed' variant='filled' 
        type='number' min={movingSpeedMin} onChange={handleMovingSpeedChange}
        helperText={helperText} error={invalidMovingSpeed} step='0.01'></TextField>
        <Button variant='contained' disabled={invalidMovingSpeed} id='movingSpeedSubmit' onClick={handleOnClick}>Submit</Button>
    </form>
  </Paper>)
}

export default MovingSpeed;