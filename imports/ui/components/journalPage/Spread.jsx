import React, { Component } from 'react';
import { Grid, LinearProgress, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Page from './Page';
import { Entries } from '../../../api/entries';

const styles = {
  spreadContainer: {
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

class Spread extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { loading, classes, actions, entries } = this.props;

    let leftEntryId = '';
    let rightEntryId = '';

    if (entries && entries.length > 0) {
      if (entries.length === 1) {
        leftEntryId = entries[0] && entries[0]._id;
      } else {
        // Entries are sorted in descending order
        leftEntryId = entries[1] && entries[1]._id;
        rightEntryId = entries[0] && entries[0]._id;
      }
    }

    return (
      loading
        ? <LinearProgress />
        : (
          <div className={classes.spreadContainer}>
            <div className={classes.root}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>
                    <Page actions={actions} position="left" entryId={leftEntryId} />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>
                    <Page actions={actions} position="right" entryId={rightEntryId} />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        )
    );
  }
}

const dataSource = (props) => {
  Meteor.subscribe('entries');

  return {
    entries: Entries.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
};

export default withTracker(dataSource)(withStyles(styles)(Spread));
