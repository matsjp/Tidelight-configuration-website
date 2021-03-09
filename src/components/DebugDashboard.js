import React from 'react';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useStyles from './../Style';
import OfflineData from './OfflineData';
import InternetConnection from './InternetConnection';


const DebugDashboard = props => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  console.log(props);

  return (
  <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
      <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
          <OfflineData readValue={props.readValue} bluetoothDevice={props.bluetoothDevice}/>
          <InternetConnection readValue={props.readValue} bluetoothDevice={props.bluetoothDevice}/>
          </Grid>
      </Grid>
      </Container>
  </main>);
}

export default DebugDashboard;