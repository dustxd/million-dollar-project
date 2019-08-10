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
import TranslucentPaper from '../../constants/TranslucentPaper';

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

const modeControls = [
  { key: 'dated', title: 'Dated Entries', icon: 'date_range' },
  { key: 'collection', title: 'Collections', icon: 'list_alt' },
  { key: 'createdAt', title: 'Created At', icon: 'access_time' },
];

class SinglePage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    const { bookmark, entriesSortedByDate, actions } = this.props;
    const { index, mode } = bookmark;

    if (mode === 'createdAt') {
      return;
    }

    const displayedEntry = entriesSortedByDate.find(entry => entry._id === index);

    if (displayedEntry) {
      const { type } = displayedEntry;

      if (type !== mode) {
        actions.updateBookmarkMode(type);
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { bookmark, entriesSortedByDate, actions } = this.props;
    const { index, mode } = bookmark;

    // This handles the case where Meteor's data was not back yet
    if (!prevProps.entriesSortedByDate || prevProps.entriesSortedByDate.length === 0) {
      if (entriesSortedByDate && entriesSortedByDate.length > 0) {
        if (mode === 'createdAt') {
          return;
        }

        const displayedEntry = entriesSortedByDate.find(entry => entry._id === index);

        if (displayedEntry) {
          const { type } = displayedEntry;

          if (type !== mode) {
            actions.updateBookmarkMode(type);
          }
        }
      }
    }
  }

  checkModeReturnArray = (bookmark, entries, modeString) => {
    if (modeString === 'createdAt') {
      return bookmark.index;
    }
    return this.filterEntriesByType(entries, this.changeModeToType(modeString));
  }

  onClickChangeMode = (mode) => {
    const { actions, bookmark } = this.props;
    const entriesForSelectedMode = this.getEntriesForMode(mode);
    let entryId = '';

    if (entriesForSelectedMode && entriesForSelectedMode.length > 0) {
      entryId = entriesForSelectedMode[0]._id;
    }

    actions.updateBookmarkIndex(entryId);
    actions.updateBookmarkMode(mode);
  }

  getModeControlColor = (mode) => {
    const { bookmark } = this.props;
    if (bookmark.mode === mode) {
      return 'primary';
    }
    return 'default';
  }

  getEntriesForMode = (mode) => {
    const { entriesSortedByDate, entriesSortedByHeader } = this.props;

    if (mode === 'dated') {
      return entriesSortedByHeader.filter(entry => entry.type === mode);
    }

    if (mode === 'collection') {
      return entriesSortedByHeader.filter(entry => entry.type === mode);
    }

    // By default, return all entries sorted by createdAt in desc order
    return entriesSortedByDate;
  }

  render() {
    const {
      loading,
      retrievingData,
      classes,
      actions,
      bookmark,
    } = this.props;
    const { mode, index } = bookmark;
    const filteredEntries = this.getEntriesForMode(mode);

    return (
      loading || retrievingData
        ? <LinearProgress />
        : (
          <div className={classes.singleContainer}>
            <div className={classes.root}>
              <Grid container spacing={0} justify="center">
                <Grid item xs={12} sm={8}>
                  {
                    modeControls.map((control) => {
                      const { key, title, icon } = control;
                      return (
                        <Button
                          key={control.key}
                          size="small"
                          variant="contained"
                          color={this.getModeControlColor(key)}
                          className={classes.button}
                          onClick={() => this.onClickChangeMode(key)}
                        >
                          <Icon>{icon}</Icon>
                          {title}
                        </Button>
                      );
                    })
                  }
                  <TranslucentPaper className={classes.paper}>
                    <Page
                      type="DATED_SINGLE_PAGE"
                      entryId={index}
                      actions={actions}
                      entries={filteredEntries}
                    />
                  </TranslucentPaper>
                </Grid>
              </Grid>
            </div>
          </div>
        )
    );
  }
}

const dataSource = (props) => {
  const entriesHandler = Meteor.subscribe('entries');
  const isReady = entriesHandler.ready();

  return {
    retrievingData: !isReady,
    entriesSortedByDate: Entries.find({}, { sort: { createdAt: -1 } }).fetch(),
    entriesSortedByHeader: Entries.find({}, { sort: { header: -1 } }).fetch(),
  };
};

Page.defaultProps = {
  position: 'center',
};

export default withTracker(dataSource)(withStyles(styles)(SinglePage));
