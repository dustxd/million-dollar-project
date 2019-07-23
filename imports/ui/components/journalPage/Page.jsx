import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { withStyles } from '@material-ui/core/styles';

import { Entries } from '../../../api/entries';
import Entry from './subComponents/Entry';
import { PAGE_LAYOUT } from '../../constants/ResourceConstants';

const styles = {
  leftPage: {
    padding: '1em',
    paddingRight: '3em',
  },
  rightPage: {
    padding: '1em',
    paddingLeft: '3em',
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

  render() {
    const { entryId, actions } = this.props;

    return (
      <div className={this.getStyling()}>
        <Entry
          key={entryId}
          header={this.getHeader(entryId)}
          headerType={this.getHeaderType()}
          actions={actions}
          entryId={entryId}
        />
      </div>
    );
  }
}

const dataSource = (props) => {
  Meteor.subscribe('entries');

  return {
    entries: Entries.find().fetch(),
  };
};

Page.defaultProps = {
  alignment: 'center',
  entryId: '',
};

export default withTracker(dataSource)(withStyles(styles)(Page));
