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

  getDate = (dateObject) => {
    const year = dateObject.getFullYear();
    let month = dateObject.getMonth() + 1;
    let day = dateObject.getDate();

    // Prepend month and day with 0 if < 10 to get 'mm' and 'dd'
    month = (month < 10)
      ? `0${month}`
      : month;

    day = (day < 10)
      ? `0${day}`
      : day;

    return `${day}/${month}/${year}`;
  }

  getParsedEntries = () => {
    const { entries } = this.props;

    if (!entries) {
      return [];
    }

    const parsedEntries = entries.map((entry) => {
      const { createdAt } = entry;
      const date = this.getDate(createdAt);
      const mutableEntry = Object.assign({}, entry, { createdAt: date });
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
                const { coreProps, history, actions } = this.props;
                actions.updateIndexPage(rowData._id);
                this.props.history.push({pathname : '/singlePage', state : {entry: rowData._id}});
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
