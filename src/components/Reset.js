import React, { useState } from 'react';
import clsx from 'clsx';
import useStyles from '../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {configServiceUUID, resetUUID} from './../UUIDs';
import { str2ab, ab2str} from './../utils'

const Reset = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


    const handleOnClick = event => {
        event.preventDefault();

        const eventTarget = event.currentTarget.id;

        if (eventTarget === 'resetButton'){
            const value = Uint8Array.of(1);
            props.writeValueNoRead(configServiceUUID, resetUUID, successCallback, failureCallback, value)
        }
    }

    const successCallback = value => {
        console.log("Reset success")
    }
    
    const failureCallback = value => {
        console.log('Failure callback');
    }


    return (<Paper className={fixedHeightPaper}>
    <p>Reset</p>
    <Button variant='contained' id='resetButton' onClick={handleOnClick}>Factory reset</Button>
  </Paper>)
}

export default Reset;