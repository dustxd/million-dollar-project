import React, { Component } from 'react';
import { Grid, LinearProgress, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Page from './Page';

const styles = {
  spreadContainer: {
		padding: '20px',
  },
  root: {
		flexGrow: 1,
  },
};

class SinglePage extends Component {
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
              <Grid container spacing={0} justify="center">
                <Grid item xs={12} sm={8}>
                  <Paper>
                    <Page actions={actions} page="left" />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        )
    );
  }
}

export default withStyles(styles)(SinglePage);