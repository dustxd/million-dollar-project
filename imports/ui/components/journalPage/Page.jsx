import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

import { Entries } from '../../../api/entries';
import Entry from './subComponents/Entry';
import { PAGE_LAYOUT } from '../../constants/ResourceConstants';

const styles = {
  leftPage: {
    padding: '2em',
    paddingLeft: '3em',
  },
  rightPage: {
    padding: '2em',
    paddingRight: '3em',
  },
  center: {
    padding: '2em',
  },
};

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  getStyling = () => {
    const { position, classes } = this.props;

    if (position === 'left') {
      return classes.leftPage;
    }

    if (position === 'right') {
      return classes.rightPage;
    }

    return classes.center;
  }

  getDisplayedEntryId = (redirectedEntryId) => {
    const { entries, position } = this.props;

    if (redirectedEntryId) {
      return redirectedEntryId;
    }

    if (entries && entries.length > 0) {
      // This handles Spread View:
      // 1. If there is more than one page, then by default the right
      //    page should show the most recently created entry.
      // 2. If there is only one page, then the left page should show
      //    the most recently created entry and right page should be
      //    blank (hence need to return empty string).
      if (entries.length !== 1 || position !== 'right') {
        return entries[0]._id;
      }
    }

    return '';
  }

  getHeader = (entryId) => {
    const { entries } = this.props;
    const selectedEntry = entries.find(entry => entry._id === entryId);

    if (!selectedEntry) {
      return '';
    }

    const { header } = selectedEntry;

    if (selectedEntry.type === 'dated') {
      return moment(header).format('MMMM DD, YYYY');
    }

    return header;
  }

  getHeaderType = () => {
    const { type } = this.props;

    const selectedLayout = PAGE_LAYOUT.find(layout => layout.type === type);

    if (selectedLayout) {
      return selectedLayout.headerType;
    }

    return PAGE_LAYOUT[0].headerType;
  }

  // filterEntriesByType = (arrayEntries, type) => {
  //   return arrayEntries.filter(entry => entry.type === type);
  // }

  // sortEntriesByDate = (entries) => {
  //   return entries.
  // }

  updatePageIndex = (entries) => {
    const { actions, mode } = this.props;

    actions.updateIndexPage({
      page: entries[0]._id,
      mode,
    });
  }

  // filterEntries = (entries) => {
  //   const { mode } = this.props;
  //   if (mode === 'entries') {
  //     const datedEntries = this.filterEntriesByType(entries, 'dated');
  //     this.updatePageIndex(datedEntries);
  //     // return this.sortEntriesByDate(datedEntries);
  //     return datedEntries;
  //   }
  //   if (mode === 'collections') {
  //     const collectionEntries = this.filterEntriesByType(entries, 'collection');
  //     // this.updatePageIndex(collectionEntries);
  //     return collectionEntries;
  //   }
  //   return entries;
  // }

  checkFilteredEntries = () => {
    const { entries, filteredEntries } = this.props;
    if (filteredEntries !== undefined) {
      return filteredEntries;
    }
    return entries;
  }


  render() {
    const { entryId, actions, entries, mode, filteredEntries } = this.props;

    const displayedEntryId = this.getDisplayedEntryId(entryId);
    // const filteredEntries = this.filterEntries(entries);

    if (!displayedEntryId) {
      return <div className={this.getStyling()} />;
    }

    return (
      <div className={this.getStyling()}>
        <Entry
          key={displayedEntryId}
          header={this.getHeader(displayedEntryId)}
          headerType={this.getHeaderType()}
          actions={actions}
          entryId={displayedEntryId}
          entries={this.checkFilteredEntries()} // Add method that checks if entries are being passed from parent. if not entries are passed from parent, return entries from Page
          mode={mode}
        />
      </div>
    );
  }
}

const dataSource = (props) => {
  Meteor.subscribe('entries');

  return {
    entries: Entries.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
};

Page.defaultProps = {
  position: 'center',
};

export default withTracker(dataSource)(withStyles(styles)(Page));
