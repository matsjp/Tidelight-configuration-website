import React, { useState } from 'react';
import clsx from 'clsx';
import useStyles from './../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Brightness from './Brightness';
import MovingSpeed from './MovingSpeed';
import Color from './Color'
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
        <Container maxWidth="lg" className={classes.container}>
        <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
            <Brightness readValue={props.readValue} writeValue={props.writeValue}/>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <MovingSpeed readValue={props.readValue} writeValue={props.writeValue}/>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Color settingName='High tide direction color' readValue={props.readValue}
                 writeValue={props.writeValue} serviceUUID={configServiceUUID} characteristicUUID={highTideDirectionColorCharacteristicUUID}/>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Color settingName='Low tide direction color' readValue={props.readValue}
                 writeValue={props.writeValue} serviceUUID={configServiceUUID} characteristicUUID={lowTideDirectionColorCharacteristicUUID}/>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Color settingName='Tide level indicator color' readValue={props.readValue}
                 writeValue={props.writeValue} serviceUUID={configServiceUUID} characteristicUUID={tideLevelIndicatorColorCharacteristicUUID}/>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Color settingName='No tide level indicator color' readValue={props.readValue}
                 writeValue={props.writeValue} serviceUUID={configServiceUUID} characteristicUUID={noTideLevelIndicatorColorCharacteristicUUID}/>
              </Paper>
            </Grid>
        </Grid>
        </Container>
    </main>);
}

export default LEDDashboard;