import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import useStyles from '../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {configServiceUUID, ldrActiveCharacteristicUUID} from './../UUIDs';

const LDRActive = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [readLdrActive, setReadLdrActive] = useState(null);



    useEffect(() => {
        const getLdrActive = async () => {
            if (props.bluetoothDevice!=null){
                try{
                    const service = await props.bluetoothDevice.gatt.getPrimaryService(configServiceUUID);
                    const characteristic = await service.getCharacteristic(ldrActiveCharacteristicUUID);
                    if (characteristic.value != null){
                        const value = characteristic.value;
                        if (value.getUint8(0) === 1){
                            setReadLdrActive('On');
                        }
                        else {
                            setReadLdrActive('Off');
                        }
                    }
                    else {
                        const value = await props.readValue(configServiceUUID, ldrActiveCharacteristicUUID);
                        if (value.getUint8(0) === 1){
                            setReadLdrActive('On');
                        }
                        else {
                            setReadLdrActive('Off');
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

        if (eventTarget === 'ldrActiveOn'){
            const value = Uint8Array.of(1);
            await props.writeValue(configServiceUUID, ldrActiveCharacteristicUUID, value);
            const value2 = await props.readValue(configServiceUUID, ldrActiveCharacteristicUUID);
            if (value2.getUint8(0) === 1){
                setReadLdrActive('On');
            }
            else {
                setReadLdrActive('Off');
            }
        }
        else if (eventTarget === 'ldrActiveOff'){
            const value = Uint8Array.of(2);
            await props.writeValue(configServiceUUID, ldrActiveCharacteristicUUID, value);
            const value2 = await props.readValue(configServiceUUID, ldrActiveCharacteristicUUID);
            if (value2.getUint8(0) === 1){
                setReadLdrActive('On');
            }
            else {
                setReadLdrActive('Off');
            }
        }
    }

    const formSubmit = (event) => {
        event.preventDefault();
    }

    return (<Paper>
    <p>{readLdrActive}</p>
    <form onSubmit={formSubmit}>
        <Button variant='contained' id='ldrActiveOn' onClick={handleOnClick}>On</Button>
        <Button variant='contained' id='ldrActiveOff' onClick={handleOnClick}>Off</Button>
    </form>
  </Paper>)
}

export default LDRActive;