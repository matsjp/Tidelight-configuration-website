import React, { useState } from 'react';
import clsx from 'clsx';
import useStyles from './../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Brightness from './Brightness';
import MovingSpeed from './MovingSpeed';
import LDRActive from './LDRActive'
import Color from './Color'
import MovingColor from './MovingColor'
import Reset from './Reset'
import {configServiceUUID, highTideDirectionColorCharacteristicUUID, 
    lowTideDirectionColorCharacteristicUUID,
    tideLevelIndicatorColorCharacteristicUUID,
    noTideLevelIndicatorColorCharacteristicUUID,
    tideLevelIndicatorMovingColorCharacteristicUUID,
    noTideLevelIndicatorMovingColorCharacteristicUUID} from './../UUIDs'

const LEDDashboard = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
    <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="md" className={classes.container}>
        <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
          <Grid item xs={12} md={6}>
            <Brightness readValue={props.readValue1} writeValue={props.writeValue1} bluetoothDevice={props.bluetoothDevice}/>
          </Grid>
            <Grid item xs={12} md={6}>
              <MovingSpeed readValue={props.readValue1} writeValue={props.writeValue1} bluetoothDevice={props.bluetoothDevice}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <LDRActive readValue={props.readValue1} writeValue={props.writeValue1} bluetoothDevice={props.bluetoothDevice}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Color settingName='High tide direction color' readValue={props.readValue}
                 writeValue={props.writeValue} serviceUUID={configServiceUUID} characteristicUUID={highTideDirectionColorCharacteristicUUID}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Color settingName='Low tide direction color' readValue={props.readValue}
                 writeValue={props.writeValue} serviceUUID={configServiceUUID} characteristicUUID={lowTideDirectionColorCharacteristicUUID}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Color settingName='Tide level indicator color' readValue={props.readValue}
                 writeValue={props.writeValue} serviceUUID={configServiceUUID} characteristicUUID={tideLevelIndicatorColorCharacteristicUUID}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Color settingName='No tide level indicator color' readValue={props.readValue}
                 writeValue={props.writeValue} serviceUUID={configServiceUUID} characteristicUUID={noTideLevelIndicatorColorCharacteristicUUID}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <MovingColor  readValue={props.readValue} writeValue={props.writeValue}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Reset  readValue={props.readValue} writeValue={props.writeValue} writeValueNoRead={props.writeValueNoRead}/>
              </Paper>
            </Grid>
        </Grid>
        </Container>
    </main>);
}

export default LEDDashboard;