import React, { Component } from 'react';
import { LinearProgress, Typography } from '@material-ui/core';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import Page from '../journalPage/Page';
import { Entries } from '../../../api/entries';
import AddDialog from '../overviewPage/AddDialog';
import TranslucentPaper from '../../constants/TranslucentPaper';

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
    textAlign: 'center'
  },
  centerWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 30,
  }
};

class WeekView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddDialog: false,
      selectedDate: new Date(),
    };
  }

  onChangeDateField = (date) => {
    this.setState({
      selectedDate: date,
    });
  }

  onClickOpenDialog = (dateString) => {
    this.setState({
      openAddDialog: true,
      selectedDate: new Date(dateString),
    });
  }

  onClickRedirect = (id) => {
    const { history, actions } = this.props;
    actions.updateBookmarkIndex(id);
    history.push('/singlePage');
  }

  onClickCloseDialog = () => {
    this.setState({ openAddDialog: false });
  }

  getCurrentWeekDates = (givenDate) => {
    const date = moment(givenDate) || moment();
    const startOfWeek = date.startOf('week').clone();
    const endOfWeek = date.endOf('week').clone();
    const day = startOfWeek;
    const currentWeek = [];

    while (day <= endOfWeek) {
      currentWeek.push(day.toDate());
      day.add(1, 'days');
    }

    return currentWeek;
  };

  getCurrentWeekDatedEntries = () => {
    const { entries } = this.props;
    const { selectedDate } = this.state;
    const currentWeek = this.getCurrentWeekDates(selectedDate);

    // Get only dated entries
    const datedEntries = entries.filter(entry => entry.type === 'dated');

    // If no entries exist for a particular day in the week, pass in an empty
    // object with just the date to render
    const displayedEntries = currentWeek.map((day) => {
      const entryForTheDay = datedEntries.find(entry => moment(day).isSame(entry.header, 'day'));
      if (!entryForTheDay) {
        return { _id: moment(day).toString(), header: day, noEntriesForDate: true };
      }
      return entryForTheDay;
    });

    return displayedEntries;
  }

  render() {
    const {
      loading,
      retrievingData,
      classes,
      actions,
      entries,
    } = this.props;
    const { openAddDialog, selectedDate } = this.state;
    const displayedEntries = this.getCurrentWeekDatedEntries();

    return (
      loading || retrievingData
        ? <LinearProgress />
        : (
          <div className={classes.spreadContainer}>
            <div className={classes.root}>
              <TranslucentPaper className={classes.paper}>
                <div className={classes.calendarHeader}>
                  <Typography variant="h5" color="primary">
                    CALENDAR
                  </Typography>
                </div>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  
                  <div className={classes.centerWrapper}>
                  <DatePicker
                    variant="static"
                    inputVariant="outlined"
                    className={classes.textField}
                    format="DD/MM/YYYY"
                    value={selectedDate}
                    onChange={date => this.onChangeDateField(date)}
                    disableToolbar
                  />
                  </div>
                  
                </MuiPickersUtilsProvider>
              </TranslucentPaper>
              {
                displayedEntries.map(entry => (
                  <TranslucentPaper key={entry._id} className={classes.paper}>
                    <Page
                      type="DATED_WEEK_VIEW"
                      actions={actions}
                      position="center"
                      entries={displayedEntries}
                      entryId={entry._id}
                      weekViewProps={{
                        noEntriesForDate: entry.noEntriesForDate,
                        onClickOpenDialog: dateString => this.onClickOpenDialog(dateString),
                        onClickRedirect: id => this.onClickRedirect(id),
                      }}
                    />
                  </TranslucentPaper>
                ))
              }
            </div>
            {
              openAddDialog
                && (
                  <AddDialog
                    open={openAddDialog}
                    mode="add"
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
  const entriesHandler = Meteor.subscribe('entries');
  const isReady = entriesHandler.ready();

  return {
    retrievingData: !isReady,
    entries: Entries.find({}, { sort: { header: 1 } }).fetch(),
  };
};

export default withRouter(withTracker(dataSource)(withStyles(styles)(WeekView)));
