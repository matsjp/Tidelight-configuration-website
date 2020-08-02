import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import useStyles from '../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {configServiceUUID, movingSpeedCharacteristicUUID} from './../UUIDs';
import { str2ab, ab2str} from './../utils'
import CircularProgress from '@material-ui/core/CircularProgress'

const MovingSpeed = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const movingSpeedMin = 0.01;
    const [invalidMovingSpeed, setInvalidMovingSpeed] = useState(false);
    const helperText = 'Moving speed must be a positive number. Can be both integers and decimals';
    const [readMovingSpeed, setReadMovingSpeed] = useState(null);
    const [progressDisplay, setProgressDisplay] = useState(false);

    const movingSpeedText = 'Moving speed: ' + readMovingSpeed;

    useEffect(() => {
        const getMovingSpeed = async () => {
            setProgressDisplay(true);
            if (props.bluetoothDevice!=null){
                try{
                    const service = await props.bluetoothDevice.gatt.getPrimaryService(configServiceUUID);
                    const characteristic = await service.getCharacteristic(movingSpeedCharacteristicUUID);
                    if (characteristic.value != null){
                        const value = characteristic.value;
                        setReadMovingSpeed(ab2str(value.buffer));
                    }
                    else {
                        const value = await props.readValue(configServiceUUID, movingSpeedCharacteristicUUID);
                        setReadMovingSpeed(ab2str(value.buffer));
                    }
                    setProgressDisplay(false);
                }
                catch(e){
                    console.log(e);
                    setProgressDisplay(false);
                }
            }
        }
        getMovingSpeed();
    }, []);



    const handleMovingSpeedChange = (event) => {
        const validationRegex = new RegExp('^\d+(\.?\d{1,2}){0,1}$');
        const movingSpeed = document.querySelector('#movingSpeedInput').value;

        if (parseFloat(movingSpeed) < movingSpeedMin){
            if (!invalidMovingSpeed){
                setInvalidMovingSpeed(true);
            }
        }
        else if(movingSpeed.length > 4){
            setInvalidMovingSpeed(true);
        }
        else {
            if (invalidMovingSpeed){
                setInvalidMovingSpeed(false);
            }
        }
    }

    const handleOnClick = async event => {
        event.preventDefault();

        const eventTarget = event.currentTarget.id;

        if (eventTarget === 'movingSpeedSubmit'){
            try{
                const value = str2ab(document.querySelector('#movingSpeedInput').value);
                await props.writeValue(configServiceUUID, movingSpeedCharacteristicUUID, value);
                setReadMovingSpeed(document.querySelector('#movingSpeedInput').value)
                setProgressDisplay(false);
            }
            catch(e){
                console.log(e);
                setProgressDisplay(false);
            }
        }
    }

    const formSubmit = (event) => {
        event.preventDefault();
    }

    return (<Paper className={fixedHeightPaper}>
        {progressDisplay ? <CircularProgress/> : <p>{movingSpeedText}</p>}
    <form onSubmit={formSubmit}>
        <TextField id='movingSpeedInput' label='New moving speed' variant='filled' 
        type='number' min={movingSpeedMin} onChange={handleMovingSpeedChange}
        helperText={helperText} error={invalidMovingSpeed} step='0.01'></TextField>
        <Button variant='contained' disabled={invalidMovingSpeed} id='movingSpeedSubmit' onClick={handleOnClick}>Submit</Button>
    </form>
  </Paper>)
}

export default MovingSpeed;