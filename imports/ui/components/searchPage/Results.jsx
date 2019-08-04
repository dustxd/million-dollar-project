import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';

import { Entries } from '../../../api/entries';

const tableColumns = [
  { title: 'Date Created', field: 'createdAt' },
  { title: 'Header', field: 'header' },
  { title: 'Type', field: 'type' },
  { title: 'EntryId', field: '_id', hidden: true },
];

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  getParsedEntries = () => {
    const { entries } = this.props;

    if (!entries) {
      return [];
    }

    const parsedEntries = entries.map((entry) => {
      const { createdAt, type, header } = entry;
      const createdAtString = moment(createdAt).format('YYYY-MM-DD');
      let headerString = header;
      if (type === 'dated') {
        headerString = moment(header).format('MMMM DD, YYYY');
      }
      const mutableEntry = Object.assign(
        {},
        entry,
        {
          createdAt: createdAtString,
          header: headerString,
        },
      );
      return mutableEntry;
    });

    return parsedEntries;
  }

  render() {
    const formattedEntries = this.getParsedEntries();

    return (
      <div className="search-container">
        <MaterialTable
          title="Search Results"
          columns={tableColumns}
          data={formattedEntries}
          actions={[
            {
              icon: 'add_circle_outline',
              tooltip: 'See All Details',
              onClick: (event, rowData) => {
                //Operation to expand entire message
              },
            },
            {
              icon: 'book',
              tooltip: 'Go To Page',
              onClick: (event, rowData) => {
                const { history, actions } = this.props;
                actions.updateIndexPage(rowData._id);
                history.push('/singlePage');
              },
            },
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
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

export default withTracker(dataSource)(withRouter(Results));
