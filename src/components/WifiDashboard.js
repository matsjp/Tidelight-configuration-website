import React from 'react';
import WifiScanner from './WifiScanner';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useStyles from './../Style'

const WifiDashboard = props => {
    const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
  <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
      <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
          <WifiScanner readValue={props.readValue} writeValue={props.writeValue} subscribe={props.subscribe} writeValueNoRead={props.writeValueNoRead}/>
          </Grid>
      </Grid>
      </Container>
  </main>);
}

export default WifiDashboard