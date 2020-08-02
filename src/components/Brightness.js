import React, { useState, useEffect } from 'react';
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
    const brightnessMax = 255;
    const [invalidBrightness, setInvalidBrightness] = useState(false);
    const helperText = 'Brightness must be between ' + brightnessMin + ' and ' + brightnessMax;
    const [readBrightness, setReadBrightness] = useState(null);
    const [progressDisplay, setProgressDisplay] = useState(false);

    const brightnessText = 'Brightness: ' + readBrightness;

    useEffect(() => {
        const getBrightness = async () => {
            setProgressDisplay(true);
            if (props.bluetoothDevice!=null){
                try{
                    const service = await props.bluetoothDevice.gatt.getPrimaryService(configServiceUUID);
                    const characteristic = await service.getCharacteristic(brightnessCharacteristicUUID);
                    if (characteristic.value != null){
                        const value = characteristic.value;
                        setReadBrightness(value.getUint8(0));
                    }
                    else {
                        const value = await props.readValue(configServiceUUID, brightnessCharacteristicUUID);
                        setReadBrightness(value.getUint8(0));
                    }
                    setProgressDisplay(false);
                }
                catch(e){
                    console.log(e);
                    setProgressDisplay(false);
                }
            }
        }
        getBrightness();
    }, []);

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

    const handleOnClick = async event => {
        event.preventDefault();

        const eventTarget = event.currentTarget.id;

        if (eventTarget === 'brightnessSubmit'){
            setProgressDisplay(true);
            try{
                const value = Uint8Array.of(parseInt(document.querySelector('#brightnessInput').value));
                await props.writeValue(configServiceUUID, brightnessCharacteristicUUID, value);
                setReadBrightness(document.querySelector('#brightnessInput').value)
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
    {progressDisplay ? <CircularProgress/> : <p>{brightnessText}</p>}
    <form onSubmit={formSubmit}>
        <TextField id='brightnessInput' label='New brightness' variant='filled' 
        type='number' min={brightnessMin} max={brightnessMax} onChange={handleBrightnessChange}
        helperText={helperText} error={invalidBrightness}></TextField>
        <Button variant='contained' disabled={invalidBrightness} id='brightnessSubmit' onClick={handleOnClick}>Submit</Button>
    </form>
  </Paper>)
}

export default Brightness;