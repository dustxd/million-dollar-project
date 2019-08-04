import React, { Component } from 'react';
import { Grid, LinearProgress, Paper } from '@material-ui/core';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';

import Page from '../journalPage/Page';

const styles = {
  singleContainer: {
    padding: '20px',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: '100%',
    minHeight: '-webkit-fill-available',
  },
};

class SinglePage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { loading, classes, location, actions } = this.props;
    const { state } = location;

    let entryId = '';

    if (state) {
      const { entryId: redirectedEntryId } = state;
      entryId = redirectedEntryId;
    }

    return (
      loading
        ? <LinearProgress />
        : (
          <div className={classes.singleContainer}>
            <div className={classes.root}>
              <Grid container spacing={0} justify="center">
                <Grid item xs={12} sm={8}>
                  <Paper className={classes.paper}>
                    <Page type="DATED_SINGLE_PAGE" entryId={entryId} actions={actions} page="left" />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        )
    );
  }
}

export default withRouter(withStyles(styles)(SinglePage));
