import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Entries } from '../../../api/entries';
import Entry from './Entry';
import ButtonNewPage from './ButtonNewPage';

class Page extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { page, entries, actions } = this.props;

    if (page === 'left') {
      return (
        <div className="grid-item left-page">
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
      <div className="grid-item right-page">
        {/* <Entry header={entries.length > 0 && entries[2].header} /> */}
        <ButtonNewPage />
      </div>
    );
  }
}

export default PageContainer = withTracker(() => {
  Meteor.subscribe('entries');

  return {
    entries: Entries.find().fetch(),
  };
})(Page);
