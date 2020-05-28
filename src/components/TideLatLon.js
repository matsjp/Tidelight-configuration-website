import React, { useState } from 'react';
import clsx from 'clsx';
import useStyles from '../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import {configServiceUUID, latLonCharacteristicUUID} from '../UUIDs';
import { str2ab, ab2str} from './../utils'

const TideLatLon = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const [readLatLon, setReadLatLon] = useState(null);
    const [readLat, setReadLat] = useState(null);
    const [readLon, setReadLon] = useState(null);

    const latLonText = 'LatLon: ' + readLatLon;

    const handleLatLonhange = (event) => {
        //const brightness = parseInt(document.querySelector('#LatLonInput').value);
        
        /*if (brightness < brightnessMin || brightness > brightnessMax){
            if (!invalidBrightness){
                setInvalidBrightness(true);
            }
        }
        else {
            if (invalidBrightness){
                setInvalidBrightness(false);
            }
        }*/
    }

    const handleOnClick = event => {
        //TODO
        event.preventDefault();

        const eventTarget = event.currentTarget.id;

        if (eventTarget === 'latLonSubmit'){
            const latValue = document.querySelector('#latInput').value;
            const lonValue = document.querySelector('#lonInput').value;
            const valueString = latValue + ":" + lonValue;
            const value = str2ab(valueString);
            props.writeValue(configServiceUUID, latLonCharacteristicUUID, successCallback, failureCallback, value);
        }
        else if (eventTarget === 'latLonRead'){
            props.readValue(configServiceUUID, latLonCharacteristicUUID, successCallback, failureCallback);
        }
    }

    const successCallback = value => {

        setReadLatLon(ab2str(value.buffer));
        const s = ab2str(value.buffer);
        const split = s.split(":")
        setReadLat(split[0]);
        setReadLon(split[1]);
    }
    
    const failureCallback = value => {
        console.log('Failure callback');
    }

    const formSubmit = (event) => {
        event.preventDefault();
    }

    return (<Paper className={fixedHeightPaper}>
    <p>Lat: {readLat}</p>
    <p>Lon: {readLon}</p>
    <Button variant='contained' id='latLonRead' onClick={handleOnClick}>Read latLon</Button>
    <form onSubmit={formSubmit}>
        <TextField id='latInput' label='New latitude' variant='filled' 
        type='number' /*onChange={handleLatChange}*/></TextField>
        <TextField id='lonInput' label='New longitude' variant='filled' 
        type='number' /*onChange={handlelonChange}*/></TextField>
        <Button variant='contained' id='latLonSubmit' onClick={handleOnClick}>Submit</Button>
    </form>
  </Paper>)
}

export default TideLatLon;