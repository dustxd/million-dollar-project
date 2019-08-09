import React, { Component } from 'react';
import { LinearProgress, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import Page from '../journalPage/Page';
import { Entries } from '../../../api/entries';
import AddDialog from '../overviewPage/AddDialog';

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
  calendarHeader: {
    padding: '1.75em',
  },
};

class WeekView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddDialog: false,
      selectedDate: new Date(),
    };
  }

  onClickOpenDialog = (dateString) => {
    this.setState({
      openAddDialog: true,
      selectedDate: new Date(dateString),
    });
  }

  onClickCloseDialog = () => {
    this.setState({ openAddDialog: false });
  }

  getCurrentWeekDates = () => {
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

  getCurrentWeekDatedEntries = () => {
    const { entries } = this.props;
    const currentWeek = this.getCurrentWeekDates();

    // Get only dated entries
    const datedEntries = entries.filter(entry => entry.type === 'dated');

    // If no entries exist for a particular day in the week, pass in an empty
    // object with just the date to render
    const displayedEntries = currentWeek.map((day, index) => {
      const entryForTheDay = datedEntries.find(entry => moment(day).isSame(entry.header, 'day'));
      if (!entryForTheDay) {
        return { _id: moment(day).toString(), header: day, noEntriesForDate: true };
      }
      return entryForTheDay;
    });

    return displayedEntries;
  }

  render() {
    const { loading, classes, actions, entries } = this.props;
    const { openAddDialog, selectedDate } = this.state;
    const displayedEntries = this.getCurrentWeekDatedEntries();

    return (
      loading
        ? <LinearProgress />
        : (
          <div className={classes.spreadContainer}>
            <div className={classes.root}>
              <Paper className={classes.paper}>
                <div className={classes.calendarHeader}>
                  <Typography variant="h3" color="primary">
                    CALENDAR
                  </Typography>
                </div>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DatePicker
                    variant="static"
                    inputVariant="outlined"
                    className={classes.textField}
                    format="DD/MM/YYYY"
                    value={new Date()}
                    disableToolbar
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
                      weekViewProps={{
                        noEntriesForDate: entry.noEntriesForDate,
                        onClickOpenDialog: dateString => this.onClickOpenDialog(dateString),
                      }}
                    />
                  </Paper>
                ))
              }
            </div>
            {
              openAddDialog
                && (
                  <AddDialog
                    open={openAddDialog}
                    type="dated"
                    date={selectedDate}
                    actions={actions}
                    onClickCloseDialog={() => this.onClickCloseDialog()}
                  />
                )
            }
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
