import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { withStyles } from '@material-ui/core/styles';

import { Entries } from '../../../api/entries';
import Entry from './Entry';

const styles = {
  leftPage: {
    padding: '1em',
    paddingRight: '3em',
  },
  rightPage: {
    padding: '1em',
    paddingLeft: '3em',
  },
};

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { classes, page, entries, actions } = this.props;

    if (page === 'left') {
      return (
        <div className={classes.rightPage}>
          {/* <Entry header={entries[0].header} />
          <Entry header={entries[1].header} /> */}
          {
            entries.map(entry => (
              <Entry
                key={entry._id}
                header={entry && entry.header}
                actions={actions}
                entryId={entry._id}
              />
            ))
          }
        </div>
      );
    }

    return (
      <div className={classes.rightPage}>
        {/* <Entry header={entries.length > 0 && entries[2].header} /> */}
      </div>
    );
  }
}

export default PageContainer = withTracker(() => {
  Meteor.subscribe('entries');

  return {
    entries: Entries.find().fetch(),
  };
})(withStyles(styles)(Page));