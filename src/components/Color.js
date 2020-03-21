import React, { useState } from 'react';
import clsx from 'clsx';
import useStyles from '../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {configServiceUUID, brightnessCharacteristicUUID} from './../UUIDs';
import { hex2rgb, rgb2hex, str2ab, ab2str} from './../utils'
import { SketchPicker  } from 'react-color';

const Brightness = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [readColor, setReadColor] = useState('#ffffff');
    const [color, setColor] = useState('#ffff00');


    const handleOnClick = event => {
        event.preventDefault();

        const eventTarget = event.currentTarget.id;

        if (eventTarget === 'colorSubmit'){
            //TODO
            const value = Uint8Array.of(color.r, color.g, color.b);
            console.log(value);
            props.writeValue(props.serviceUUID, props.characteristicUUID, successCallback, failureCallback, value)
        }
        else if (eventTarget === 'colorRead'){
            props.readValue(props.serviceUUID, props.characteristicUUID, successCallback, failureCallback);
        }
    }

    const successCallback = value => {
        const r = value.getUint8(0);
        const g = value.getUint8(1);
        const b = value.getUint8(2);
        const hex = rgb2hex(r, g, b);
        console.log(hex);
        setReadColor(hex);
    }
    
    const failureCallback = value => {
        console.log('Failure callback');
    }

    const formSubmit = (event) => {
        event.preventDefault();
    }

    const handleChange = (color) => {
        setColor(color.rgb)
      };

    return (<Paper className={fixedHeightPaper}>
<p style={{backgroundColor: readColor}}>{props.settingName}: {readColor}</p>
    <Button variant='contained' id='colorRead' onClick={handleOnClick}>Read color</Button>
    <form onSubmit={formSubmit}>
    <SketchPicker  color={color} onChange={handleChange}/>
    <Button variant='contained' id='colorSubmit' onClick={handleOnClick}>Submit</Button>
    </form>
  </Paper>)
}

export default Brightness;