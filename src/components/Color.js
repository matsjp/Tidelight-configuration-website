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
import reactCSS from 'reactcss'

const Color = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [readColor, setReadColor] = useState('#ffffff');
    const [color, setColor] = useState('#ffff00');
    const [displayColorPicker, setDisplayColorPicker] = useState(false);

    const styles = reactCSS({
        'default': {
          color: {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: color,
          },
          swatch: {
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
          },
          popover: {
            position: 'absolute',
            zIndex: '2',
          },
          cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          },
          colorContainer: {
              position:"relative",
          },
        },
      });

    


    const handleOnClick = event => {
        event.preventDefault();

        const eventTarget = event.currentTarget.id;

        if (eventTarget === 'colorSubmit'){
            const value = Uint8Array.of(color.r, color.g, color.b);
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
      }

      const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
      }
    
      const handleClose = () => {
        setDisplayColorPicker(false);
      }

    return (<Paper style={styles.colorContainer}>
<p style={{backgroundColor: readColor}}>{props.settingName}: {readColor}</p>
    <Button variant='contained' id='colorRead' onClick={handleOnClick}>Read color</Button>
    <form onSubmit={formSubmit}>
    {/*<div>
        <div style={ styles.swatch } onClick={handleClick}>
          <div style={ styles.color } />
        </div>
        {displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={handleClose}/>
          <SketchPicker color={color} onChange={handleChange} />
        </div> : null }
    </div>*/}
    <SketchPicker color={color} onChange={handleChange} />
    <Button variant='contained' id='colorSubmit' onClick={handleOnClick}>Submit</Button>
    </form>
  </Paper>)
}

export default Color;