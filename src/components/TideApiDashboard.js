import React from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Chart from '../Chart';
import Deposits from '../Deposits';
import Orders from '../Orders';
import useStyles from './../Style'
import TideLatLon from './TideLatLon'

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


const TideApiDashboard = props => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
  <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
      <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
          <TideLatLon readValue={props.readValue} writeValue={props.writeValue}/>
          </Grid>
      </Grid>
      </Container>
  </main>);
}

export default TideApiDashboard;