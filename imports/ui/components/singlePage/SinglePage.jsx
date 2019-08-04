import React, { Component } from 'react';
import { Grid, LinearProgress, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

import Page from '../journalPage/Page';

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
    const { loading, classes, actions, index } = this.props;

    return (
      loading
        ? <LinearProgress />
        : (
          <div className={classes.spreadContainer}>
            <div className={classes.root}>
              <Grid container spacing={0} justify="center">
                <Grid item xs={12} sm={8}>
                  <Paper>
                    <Page type="DATED_SINGLE_PAGE" position="left" actions={actions} entryId={index} page="left" index={index} />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        )
    );
  }
}

export default (withStyles(styles))(withRouter(SinglePage));
