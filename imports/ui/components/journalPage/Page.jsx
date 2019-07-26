import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

import { Entries } from '../../../api/entries';
import Entry from './subComponents/Entry';
import { PAGE_LAYOUT } from '../../constants/ResourceConstants';
import { ContactsOutlined } from '@material-ui/icons';

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
      if (entries.length !== 1 || position !== 'right') {
        return entries[0]._id;
      }
    }

    return '';
  }

  getHeader = (entryId) => {
    const { entries } = this.props;
    const selectedEntry = entries.find(entry => entry._id === entryId);

    if (selectedEntry) {
      return selectedEntry.header;
    }

    return '';
  }

  getHeaderType = () => {
    const { type } = this.props;

    const selectedLayout = PAGE_LAYOUT.find(layout => layout.type === type);

    if (selectedLayout) {
      return selectedLayout.headerType;
    }

    return PAGE_LAYOUT[0].headerType;
  }

  // getEntryId = ({ location }, entryId) => {
  //   if(location.state.entry != null){
  //     return location.state.entry;
  //   }
  //   return entryId;
  // }

  render() {
    const { entryId, actions } = this.props;

    const displayedEntryId = this.getDisplayedEntryId(entryId);

    // if(this.props.location.state.entry != null) {
    //   entryId = this.props.location.state.entry;
    // }

    if (!displayedEntryId) {
      return <div className={this.getStyling()} />
    }

    return (
      <div className={this.getStyling()}>
        <Entry
          key={displayedEntryId}
          header={this.getHeader(displayedEntryId)}
          headerType={this.getHeaderType()}
          actions={actions}
          entryId={displayedEntryId}
        />
      </div>
    );
  }
}

const dataSource = (props) => {
  Meteor.subscribe('entries');
  // console.log(this.props.entry)
  // if (props.entry != null){
  //   return {
  //     entries: Entries.find( { header: props.entry }).fetch()
  //   }
  // } else {
    // return props.entry
  // }
  
    return {
    entries: Entries.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
};

Page.defaultProps = {
  position: 'center',
};

export default withTracker(dataSource)(withStyles(styles)(Page));
