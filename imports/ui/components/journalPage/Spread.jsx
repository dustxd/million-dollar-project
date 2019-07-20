import React, { Component } from 'react';
import { Grid, LinearProgress, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Page from './Page';

const styles = {
  spreadContainer: {
    padding: '20px',
    height: '-webkit-fill-available',
  },
  root: {
    flexGrow: 1,
    height: 'inherit',
  },
  inheritHeight: {
    height:'inherit',
  },
  paper: {
    backgroundColor: '#fbfbfb',
  }
};

class Spread extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { loading, classes, actions } = this.props;

    return (
      loading
        ? <LinearProgress />
        : (
          <div className={classes.spreadContainer}>
            <div className={classes.root}>
              <Grid container spacing={0} className={classes.inheritHeight}>
                <Grid className={classes.inheritHeight} item xs={12} sm={6}>
                  <Paper className={classes.paper} className={classes.inheritHeight} >
                    <Page actions={actions} page="left" />
                  </Paper>
                </Grid>
                <Grid item className={classes.inheritHeight} xs={12} sm={6}>
                  <Paper className={classes.paper} className={classes.inheritHeight} >
                    <Page actions={actions} page="right" />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        )
    );
  }
}

export default withStyles(styles)(Spread);
