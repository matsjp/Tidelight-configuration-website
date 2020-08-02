import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import useStyles from '../Style'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import {configServiceUUID, latLonCharacteristicUUID} from '../UUIDs';
import { str2ab, ab2str} from '../utils';
import Map from './Map';

const TideLatLon = props => {
    const classes = useStyles();
    const paper = clsx(classes.paper);

    const [readLatLon, setReadLatLon] = useState(null);
    const [readLat, setReadLat] = useState(null);
    const [readLon, setReadLon] = useState(null);
    const [progressDisplay, setProgressDisplay] = useState(false);
    const [newLatLon, setNewLatLon] = useState(null);
    const [disableButton, setDisableButton] = useState(true);
    const [buttonProgressDisplay, setButtonProgressDisplay] = useState(false);

    const latLonText = 'LatLon: ' + readLatLon;


    useEffect(() => {
        const apiCall = async () => {
            try{
                setButtonProgressDisplay(true);
                const split = newLatLon.split(":");
                const lat = parseFloat(split[0]).toFixed(5);
                const lon = parseFloat(split[1]).toFixed(5);
                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);


                const url = new URL("https://cors-anywhere.herokuapp.com/http://api.sehavniva.no/tideapi.php");
                const params = new URLSearchParams();

                params.append("lat", lat);
                params.append("lon", lon);
                params.append("dts", 1);
                params.append("tide_request", "locationdata");
                params.append("refcode", "CD");
                params.append("lang", "en");
                params.append("fromtime", formatDate(today));
                params.append("totime", formatDate(tomorrow));
                const response = await fetch(url + "?" + params.toString());
                const text = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(text,"text/xml");
                if (xmlDoc.getElementsByTagName("data").length > 0){
                    setDisableButton(false);
                }
                else {
                    setDisableButton(true);
                }
            }
            catch(e){
                console.log(e);
                setDisableButton(true);
                
            }
            finally{
                setButtonProgressDisplay(false);
            }
        }
        if (newLatLon != null){
            apiCall();
        }
    }, [newLatLon])


    useEffect(() => {
        const getLatLon = async () => {
            setProgressDisplay(true);
            if (props.bluetoothDevice!=null){
                try{
                    let value;
                    const service = await props.bluetoothDevice.gatt.getPrimaryService(configServiceUUID);
                    const characteristic = await service.getCharacteristic(latLonCharacteristicUUID);
                    if (characteristic.value != null){
                        value = characteristic.value;
                    }
                    else {
                        value = await props.readValue(configServiceUUID, latLonCharacteristicUUID);
                    }
                    setReadLatLon(ab2str(value.buffer));
                    const s = ab2str(value.buffer);
                    const split = s.split(":")
                    setReadLat(split[0]);
                    setReadLon(split[1]);
                    setProgressDisplay(false);
                }
                catch(e){
                    console.log(e);
                    setProgressDisplay(false);
                }
            }
        }
        getLatLon();
    }, [props]);

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const handleOnClick = async event => {
        //TODO
        event.preventDefault();

        const eventTarget = event.currentTarget.id;

        if (eventTarget === 'latLonSubmit'){
            try{
                setProgressDisplay(true);
                const split = newLatLon.split(":");
                const latValue = parseFloat(split[0]).toFixed(5);
                const lonValue = parseFloat(split[1]).toFixed(5);
                const valueString = latValue + ":" + lonValue;
                const value = str2ab(valueString);
                await props.writeValue(configServiceUUID, latLonCharacteristicUUID, value);
                setReadLatLon(valueString);
                setReadLat(latValue);
                setReadLon(lonValue);
            }
            catch(e){
                console.log(e);
            }
            finally{
                setProgressDisplay(false);
            }
        }
    }

    const formSubmit = (event) => {
        event.preventDefault();
    }

    const updateNewLatLon = (newLatLon) => {
        setNewLatLon(newLatLon);
    }

    let map;
    if (readLatLon != null || newLatLon != null){
        let lat;
        let lon;
        if (newLatLon != null){
            const split = newLatLon.split(":");
            lat = parseFloat(split[0]);
            lon = parseFloat(split[1]);
        }
        else {
            const split = readLatLon.split(":");
            lat = parseFloat(split[0]);
            lon = parseFloat(split[1]);
        }
        
        map = <Map center={{lat:lat, lng:lon}} updateNewLatLon={updateNewLatLon}></Map>;
    }
    else {
        map = null;
    }

    return progressDisplay ? <CircularProgress/> : <Paper className={paper}>
    <p>Lat: {readLat}</p>
    <p>Lon: {readLon}</p>
    <form onSubmit={formSubmit}>
        {buttonProgressDisplay ? <CircularProgress/> : <Button variant='contained' id='latLonSubmit' onClick={handleOnClick} disabled={disableButton}>Update location</Button>}
    </form>
    {map}
  </Paper>
}

export default TideLatLon;