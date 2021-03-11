import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import useStyles from '../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import {configServiceUUID, LEDCountUUID} from './../UUIDs';

const LEDCount = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [LEDCount, setLEDCount] = useState(null);
    const [progressDisplay, setProgressDisplay] = useState(false);

    const LEDCountText = 'LED count: ' + LEDCount;

    useEffect(() => {
        const getLEDCount = async () => {
            setProgressDisplay(true);
            if (props.bluetoothDevice!=null){
                try{
                    const service = await props.bluetoothDevice.gatt.getPrimaryService(configServiceUUID);
                    const characteristic = await service.getCharacteristic(LEDCountUUID);
                    if (characteristic.value != null){
                        const value = characteristic.value;
                        setLEDCount(value.getUint8(0));
                    }
                    else {
                        const value = await props.readValue(configServiceUUID, LEDCountUUID);
                        setLEDCount(value.getUint8(0));
                    }
                    setProgressDisplay(false);
                }
                catch(e){
                    console.log(e);
                    setProgressDisplay(false);
                }
            }
        }
        getLEDCount();
    }, []);

    const handleLEDContChange = (event) => {
        const brightness = parseInt(document.querySelector('#LEDCountInput').value);
    }

    const handleOnClick = async event => {
        event.preventDefault();

        const eventTarget = event.currentTarget.id;

        if (eventTarget === 'LEDCountSubmit'){
            setProgressDisplay(true);
            try{
                const value = Uint8Array.of(parseInt(document.querySelector('#LEDCountInput').value));
                await props.writeValue(configServiceUUID, LEDCountUUID, value);
                setLEDCount(document.querySelector('#LEDCountInput').value)
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

    return (<Paper >
    {progressDisplay ? <CircularProgress/> : <p>{LEDCountText}</p>}
    <form onSubmit={formSubmit}>
        <TextField id='LEDCountInput' label='New LED count' variant='filled' 
        type='number' onChange={handleLEDContChange}></TextField>
        <Button variant='contained' id='LEDCountSubmit' onClick={handleOnClick}>Submit</Button>
    </form>
    <p>After chaning the LED count, restart the tide light to apply the change</p>
  </Paper>)
}

export default LEDCount;