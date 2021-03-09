import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import useStyles from '../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {configServiceUUID, colorFormatCharacteristicUUID} from './../UUIDs';

const ColorFormat = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [format, setFormat] = useState(null);



    useEffect(() => {
        const getLdrActive = async () => {
            if (props.bluetoothDevice!=null){
                try{
                    const service = await props.bluetoothDevice.gatt.getPrimaryService(configServiceUUID);
                    const characteristic = await service.getCharacteristic(colorFormatCharacteristicUUID);
                    if (characteristic.value != null){
                        const value = characteristic.value;
                        if (value.getUint8(0) === 1){
                            setFormat('RGB');
                        }
                        else {
                            setFormat('BGR');
                        }
                    }
                    else {
                        const value = await props.readValue(configServiceUUID, colorFormatCharacteristicUUID);
                        if (value.getUint8(0) === 1){
                            setFormat('RGB');
                        }
                        else {
                            setFormat('BGR');
                        }
                    }
                }
                catch(e){
                    console.log(e);
                }
            }
        }
        getLdrActive();
    }, []);



    const handleOnClick = async event => {
        event.preventDefault();

        const eventTarget = event.currentTarget.id;

        if (eventTarget === 'rgb'){
            const value = Uint8Array.of(1);
            await props.writeValue(configServiceUUID, colorFormatCharacteristicUUID, value);
            const value2 = await props.readValue(configServiceUUID, colorFormatCharacteristicUUID);
            if (value2.getUint8(0) === 1){
                setFormat('RGB');
            }
            else {
                setFormat('BGR');
            }
        }
        else if (eventTarget === 'bgr'){
            const value = Uint8Array.of(2);
            await props.writeValue(configServiceUUID, colorFormatCharacteristicUUID, value);
            const value2 = await props.readValue(configServiceUUID, colorFormatCharacteristicUUID);
            if (value2.getUint8(0) === 1){
                setFormat('RGB');
            }
            else {
                setFormat('BGR');
            }
        }
    }

    const formSubmit = (event) => {
        event.preventDefault();
    }


    return (<Paper>
    <p>{format}</p>
    <form onSubmit={formSubmit}>
        <Button variant='contained' id='rgb' onClick={handleOnClick}>RGB</Button>
        <Button variant='contained' id='bgr' onClick={handleOnClick}>BGR</Button>
    </form>
    <p>After changing the color format, restart the tide light to apply it</p>
  </Paper>)
}

export default ColorFormat;