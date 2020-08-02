import React from 'react';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useStyles from './../Style';
import TideLatLon from './TideLatLon';
import TideLatLon1 from './TideLatLon1';


const TideApiDashboard = props => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
  <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
      <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
          <TideLatLon1 readValue={props.readValue1} writeValue={props.writeValue1} bluetoothDevice={props.bluetoothDevice}/>
          </Grid>
      </Grid>
      </Container>
  </main>);
}

export default TideApiDashboard;