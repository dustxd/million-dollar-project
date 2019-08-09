import React, { Component } from 'react';
import {
  Button,
  Icon,
  Grid,
  LinearProgress,
  Paper,
} from '@material-ui/core';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { withStyles } from '@material-ui/core/styles';

import { Entries } from '../../../api/entries';
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

  changeModeToType = (modeString) => {
    if (modeString === 'entries') {
      return 'dated';
    }
    return 'collection';
  }

  checkModeReturnArray = (bookmark, entries, modeString) => {
    if (modeString === 'createdAt') {
      return bookmark.page;
    }
    return this.filterEntriesByType(entries, this.changeModeToType(modeString));
  }

  changeMode = (modeString, entries) => {
    const { actions, bookmark } = this.props;

    actions.updateIndexPage({
      index: this.checkModeReturnArray(bookmark, entries, modeString)[0]._id,
      mode: modeString,
    });
  }

  modeButtonColor = (mode) => {
    const { bookmark } = this.props;
    if (bookmark.mode === mode) {
      return 'primary';
    }
    return 'default';
  }

  filterEntriesByType = (arrayEntries, type) => {
    return arrayEntries.filter(entry => entry.type === type);
  }

  filterEntries = (entries) => {
    const { bookmark } = this.props;
    if (bookmark.mode === 'entries') {
      const datedEntries = this.filterEntriesByType(entries, 'dated');
      return datedEntries;
    }
    if (bookmark.mode === 'collections') {
      const collectionEntries = this.filterEntriesByType(entries, 'collection');
      return collectionEntries;
    }
    return undefined;
  }


  render() {
    const {
      loading,
      classes,
      actions,
      bookmark,
      entries,
    } = this.props;
    const filteredEntries = this.filterEntries(entries);

    return (
      loading
        ? <LinearProgress />
        : (
          <div className={classes.singleContainer}>
            <div className={classes.root}>
              <Grid container spacing={0} justify="center">
                <Grid item xs={12} sm={8}>
                  <Button size="small" variant="contained" color={this.modeButtonColor('entries')} className={classes.button} onClick={() => this.changeMode('entries', entries)}>
                    <Icon>date_range</Icon>
                    Entries
                  </Button>
                  <Button size="small" variant="contained" color={this.modeButtonColor('collections')} className={classes.button} onClick={() => this.changeMode('collections', entries)}>
                    <Icon>list_alt</Icon>
                    Collections
                  </Button>
                  <Button size="small" variant="contained" color={this.modeButtonColor('createdAt')} className={classes.button} onClick={() => this.changeMode('createdAt', entries)}>
                    <Icon>access_time</Icon>
                    Created At
                  </Button>
                  <Paper className={classes.paper}>
                    <Page type="DATED_SINGLE_PAGE" entryId={bookmark.index} mode={bookmark.mode} actions={actions} filteredEntries={filteredEntries} />
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
    entries: Entries.find({}, { sort: { header: -1 } }).fetch(),
  };
};

Page.defaultProps = {
  position: 'center',
};

export default withTracker(dataSource)(withStyles(styles)(SinglePage));
