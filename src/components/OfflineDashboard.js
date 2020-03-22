import React, { useState } from 'react';
import clsx from 'clsx';
import useStyles from './../Style'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import OfflineMode from './OfflineMode'
import OfflineDownload from './OfflineDownload'

const OfflineDashboard = props => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
    <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
            <OfflineMode readValue={props.readValue} writeValue={props.writeValue}/>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
            <OfflineDownload readValue={props.readValue} writeValue={props.writeValue}/>
            </Grid>
        </Grid>
        </Container>
    </main>);
}

export default OfflineDashboard;