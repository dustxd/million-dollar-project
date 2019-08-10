import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

import { Entries } from '../../../api/entries';
import Entry from './subComponents/Entry';
import { PAGE_LAYOUT_TYPES, PAGE_LAYOUT } from '../../constants/ResourceConstants';
import EditDialog from '../overviewPage/AddDialog';

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
  week: {
    padding: '2em 1em',
  },
};

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openEditDialog: false,
      selectedEntryId: '',
      selectedEntryHeader: '',
    };
  }

  onClickEditHeader = (entryId, header) => {
    const { entries, defaultEntries } = this.props;
    const inputEntries = entries || defaultEntries;
    const selectedEntry = inputEntries.find(entry => entry._id === entryId);

    if (!selectedEntry) {
      return;
    }

    this.setState({
      openEditDialog: true,
      selectedEntryId: entryId,
      selectedEntryHeader: header,
    });
  }

  onClickCloseDialog = () => {
    this.setState({
      openEditDialog: false,
      selectedEntryId: '',
      selectedEntryHeader: '',
    });
  }

  getStyling = () => {
    const { position, classes } = this.props;

    if (position === 'left') {
      return classes.leftPage;
    }

    if (position === 'right') {
      return classes.rightPage;
    }

    if (position === 'week') {
      return classes.week;
    }

    return classes.center;
  }

  getDisplayedEntryId = (redirectedEntryId) => {
    const { entries, defaultEntries, position } = this.props;
    const inputEntries = entries || defaultEntries;

    if (redirectedEntryId) {
      return redirectedEntryId;
    }

    if (inputEntries && inputEntries.length > 0) {
      // This handles Spread View:
      // 1. If there is more than one page, then by default the right
      //    page should show the most recently created entry.
      // 2. If there is only one page, then the left page should show
      //    the most recently created entry and right page should be
      //    blank (hence need to return empty string).
      if (inputEntries.length !== 1 || position !== 'right') {
        return inputEntries[0]._id;
      }
    }

    return '';
  }

  getHeader = (entryId) => {
    const { type, entries, defaultEntries } = this.props;
    const inputEntries = entries || defaultEntries;
    const selectedEntry = inputEntries.find(entry => entry._id === entryId);

    if (!selectedEntry) {
      return '';
    }

    const { header } = selectedEntry;

    if (type === PAGE_LAYOUT_TYPES.DATED_WEEK_VIEW) {
      return moment(header).format('DD dddd').toUpperCase();
    }

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

  getEntryType = () => {
    const { type, entries, defaultEntries } = this.props;
    const { selectedEntryId } = this.state;
    const inputEntries = entries || defaultEntries;

    const selectedEntry = inputEntries.find(entry => entry._id === selectedEntryId);

    if (selectedEntry) {
      return selectedEntry.type;
    }

    return '';
  }

  render() {
    const {
      entryId,
      actions,
      entries,
      defaultEntries,
      weekViewProps,
    } = this.props;
    const { openEditDialog, selectedEntryId, selectedEntryHeader } = this.state;

    const displayedEntryId = this.getDisplayedEntryId(entryId);

    if (!displayedEntryId) {
      return <div className={this.getStyling()} />;
    }

    return (
      <div className={this.getStyling()}>
        <Entry
          key={displayedEntryId}
          header={this.getHeader(displayedEntryId)}
          headerType={this.getHeaderType()}
          onClickEditHeader={(id, header) => this.onClickEditHeader(id, header)}
          actions={actions}
          entryId={displayedEntryId}
          entries={entries || defaultEntries} // if no entries are passed from parent, return defaultEntries from Page
          weekViewProps={weekViewProps}
        />
        {
          openEditDialog
            && (
              <EditDialog
                open={openEditDialog}
                mode="edit"
                entryId={selectedEntryId}
                header={selectedEntryHeader}
                type={this.getEntryType()}
                actions={actions}
                onClickCloseDialog={() => this.onClickCloseDialog()}
              />
            )
        }
      </div>
    );
  }
}

const dataSource = (props) => {
  Meteor.subscribe('entries');

  return {
    defaultEntries: Entries.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
};

Page.defaultProps = {
  position: 'center',
};

export default withTracker(dataSource)(withStyles(styles)(Page));
