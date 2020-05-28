import React, { useState } from 'react';
import clsx from 'clsx';
import useStyles from '../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {configServiceUUID, tideLevelIndicatorMovingColorCharacteristicUUID, noTideLevelIndicatorMovingColorCharacteristicUUID} from './../UUIDs';

const MovingColor = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [readMoving, setReadMoving] = useState(null);
    const [readNoMoving, setReadNoMoving] = useState(null);



    const handleOnClick = event => {
        event.preventDefault();

        const eventTarget = event.currentTarget.id;

        if (eventTarget === 'ldrActiveOn'){
            const value = Uint8Array.of(1);
            props.writeValue(configServiceUUID, tideLevelIndicatorMovingColorCharacteristicUUID, movingSuccessCallback, failureCallback, value);
            props.writeValue(configServiceUUID, noTideLevelIndicatorMovingColorCharacteristicUUID, noMovingSuccessCallback, failureCallback, value)
        }
        else if (eventTarget === 'ldrActiveOff'){
            const value = Uint8Array.of(2);
            props.writeValue(configServiceUUID, tideLevelIndicatorMovingColorCharacteristicUUID, movingSuccessCallback, failureCallback, value);
            props.writeValue(configServiceUUID, noTideLevelIndicatorMovingColorCharacteristicUUID, noMovingSuccessCallback, failureCallback, value)
        }
        else if (eventTarget === 'readColors'){
            console.log('Reading colors')
            props.readValue(configServiceUUID, tideLevelIndicatorMovingColorCharacteristicUUID, movingSuccessCallback, failureCallback);
            props.readValue(configServiceUUID, noTideLevelIndicatorMovingColorCharacteristicUUID, noMovingSuccessCallback, failureCallback)
        }
    }

    const movingSuccessCallback = value => {
        const valueArray = [];
        for (let i = 0; i < value.byteLength; i++){
            valueArray.push(value.getUint8(i))
        }
        setReadMoving(valueArray);
    }

    const noMovingSuccessCallback = value => {
        const valueArray = [];
        for (let i = 0; i < value.byteLength; i++){
            valueArray.push(value.getUint8(i))
        }
        setReadNoMoving(valueArray);
    }
    
    const failureCallback = value => {
        console.log('Failure callback');
    }

    const formSubmit = (event) => {
        event.preventDefault();
    }

    return (<Paper className={fixedHeightPaper}>
    <p>{readMoving}</p>
    <p>{readNoMoving}</p>
    <Button variant='contained' id='readColors' onClick={handleOnClick}>Reac colors</Button>
    <form onSubmit={formSubmit}>
        <Button variant='contained' id='ldrActiveOn' onClick={handleOnClick}>On</Button>
        <Button variant='contained' id='ldrActiveOff' onClick={handleOnClick}>Off</Button>
    </form>
  </Paper>)
}

export default MovingColor;