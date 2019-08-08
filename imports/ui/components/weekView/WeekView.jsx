import React, { Component } from 'react';
import { LinearProgress, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import Page from '../journalPage/Page';
import { Entries } from '../../../api/entries';

const getCurrentWeekDates = () => {
  const today = moment();
  const startOfWeek = today.startOf('week').clone();
  const endOfWeek = today.endOf('week').clone();
  let day = startOfWeek;
  const currentWeek = [];

  while (day <= endOfWeek) {
    currentWeek.push(day.toDate());
    day.add(1, 'days');
  }

  return currentWeek;
};

const styles = {
  spreadContainer: {
    padding: '20px',
  },
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(325px, 25%))',
    gridAutoRows: '1fr',
  },
  paper: {

  },
};

class WeekView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  getCurrentWeekDatedEntries = () => {
    const { entries } = this.props;
    const currentWeek = getCurrentWeekDates();

    // Get only dated entries
    const datedEntries = entries.filter(entry => entry.type === 'dated');

    // If no entries exist for a particular day in the week, pass in an empty
    // object with just the date to render
    const displayedEntries = currentWeek.map((day, index) => {
      const entryForTheDay = datedEntries.find(entry => moment(day).isSame(entry.header, 'day'));
      if (!entryForTheDay) {
        return { _id: moment(day).toString(), header: day };
      }
      return entryForTheDay;
    });

    return displayedEntries;
  }

  render() {
    const { loading, classes, actions, entries } = this.props;
    const displayedEntries = this.getCurrentWeekDatedEntries();

    return (
      loading
        ? <LinearProgress />
        : (
          <div className={classes.spreadContainer}>
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DatePicker
                    variant="static"
                    inputVariant="outlined"
                    className={classes.textField}
                    format="DD/MM/YYYY"
                    value={new Date()}
                    leftArrowIcon={null}
                    rightArrowIcon={null}
                    shouldDisableDate={date => !moment(date).isSame(new Date(), 'week')}
                  />
                </MuiPickersUtilsProvider>
              </Paper>
              {
                displayedEntries.map(entry => (
                  <Paper key={entry._id} className={classes.paper}>
                    <Page
                      type="DATED_WEEK_VIEW"
                      actions={actions}
                      position="center"
                      entries={displayedEntries}
                      entryId={entry._id}
                    />
                  </Paper>
                ))
              }
            </div>
          </div>
        )
    );
  }
}

const dataSource = (props) => {
  Meteor.subscribe('entries');

  return {
    entries: Entries.find({}, { sort: { header: 1 } }).fetch(),
  };
};

export default withTracker(dataSource)(withStyles(styles)(WeekView));
