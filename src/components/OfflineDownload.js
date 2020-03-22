import React, { useState } from 'react';
import clsx from 'clsx';
import useStyles from '../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import {offlineServiceUUID, offlineDownloadCharacteristicUUID} from './../UUIDs';
import {ab2str, str2ab} from './../utils'

const OfflineDownload = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const getTodaysDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    }

    const getTomorrowsDate = () => {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = tomorrow.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    }

    const dateToTimestamp = date => {
        return new Date(date).getTime()
    }

    const fromDateMin = getTodaysDate();
    const toDateMin = getTomorrowsDate();
    const [invalidFromDate, setInvalidFromDate] = useState(false);
    const [invalidToDate, setInvalidToDate] = useState(false);
    const [fromDateBiggest, setFromDateBiggest] = useState(false);
    const helperText = 'From date cannot before must be before ' + fromDateMin + '. To date cannot be before '+ toDateMin + '. From date cannot be after to date';
    const [readOfflineDownload, setReadOfflineDownload] = useState(null);

    const offlineDownloadText = 'Date range: ' + readOfflineDownload;

    const handleDateChange = (event) => {
        //TODO
        const toDate = document.querySelector('#toDateInput').value;
        const fromDate = document.querySelector('#fromDateInput').value;
        if (dateToTimestamp(fromDate) < dateToTimestamp(fromDateMin)){
            if (!invalidFromDate){
                setInvalidFromDate(true);
            }
        }
        else {
            if (invalidFromDate){
                setInvalidFromDate(false);
            }
        }

        if (dateToTimestamp(toDate) < dateToTimestamp(toDateMin)){
            if (!invalidToDate){
                setInvalidToDate(true);
            }
        }
        else {
            if (invalidToDate){
                setInvalidToDate(false);
            }
        }

        if (dateToTimestamp(fromDate) >= dateToTimestamp(toDate)){
            if (!fromDateBiggest){
                setFromDateBiggest(true);
            }
        }
        else {
            if (fromDateBiggest){
                setFromDateBiggest(false);
            }
        }
    }

    const handleOnClick = event => {
        //TODO
        event.preventDefault();

        const eventTarget = event.currentTarget.id;

        if (eventTarget === 'offlineDownloadSubmit'){
            const toDate = document.querySelector('#toDateInput').value;
            const fromDate = document.querySelector('#fromDateInput').value;
            const value = str2ab(fromDate + ':' + toDate);
            props.writeValue(offlineServiceUUID, offlineDownloadCharacteristicUUID, successCallback, failureCallback, value)
        }
        else if (eventTarget === 'offlineDownloadRead'){
            props.readValue(offlineServiceUUID, offlineDownloadCharacteristicUUID, successCallback, failureCallback);
        }
    }

    const successCallback = value => {
        setReadOfflineDownload(ab2str(value.buffer))
    }
    
    const failureCallback = value => {
        console.log('Failure callback');
    }

    const formSubmit = (event) => {
        event.preventDefault();
    }

    return (<Paper className={fixedHeightPaper}>
    <p>{offlineDownloadText}</p>
    <Button variant='contained' id='offlineDownloadRead' onClick={handleOnClick}>Read date range</Button>
    <form onSubmit={formSubmit}>
        <TextField id='fromDateInput' label='From date' variant='filled' 
        type='date' min={fromDateMin} onChange={handleDateChange}
        helperText={helperText} error={invalidFromDate || fromDateBiggest}></TextField>
        <TextField id='toDateInput' label='To date' variant='filled' 
        type='date' min={toDateMin} onChange={handleDateChange}
        helperText={helperText} error={invalidToDate || fromDateBiggest}></TextField>
        <Button variant='contained' disabled={invalidFromDate || invalidToDate || fromDateBiggest} id='offlineDownloadSubmit' onClick={handleOnClick}>Submit</Button>
    </form>
  </Paper>)
}

export default OfflineDownload;