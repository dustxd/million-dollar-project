import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import { Typography } from '@material-ui/core';

import { Entries } from '../../../api/entries';
import { LineItems } from '../../../api/lineItems';

const renderLineItems = (row) => {
  const { lineItems } = row;

  return (
    <div>
      {
        lineItems.map(lineItem => (
          <Typography key={lineItem._id}>
            {lineItem.content}
          </Typography>
        ))
      }
    </div>
  );
};

const searchLineItems = (filterValue, row, columnDef) => {
  const { lineItems } = row;
  return lineItems.find((lineItem) => {
    const { content } = lineItem;
    return content.toLowerCase().includes(filterValue.toLowerCase());
  });
};

const tableColumns = [
  {
    title: 'Date Created',
    field: 'createdAt',
    type: 'date',
    defaultSort: 'desc',
  },
  { title: 'Header', field: 'header' },
  { title: 'Type', field: 'type' },
  {
    title: 'Details',
    field: 'lineItems',
    render: renderLineItems,
    customFilterAndSearch: searchLineItems,
  },
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
              onClick: () => {
                const { coreProps, history } = this.props;
                // const { actions } = coreProps;
                history.push('/singlePage', { entry: 0 });
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
  const entriesHandler = Meteor.subscribe('entriesWithLineItems');

  let entriesWithLineItems = [];
  if (entriesHandler.ready()) {
    entriesWithLineItems = Entries.find().fetch().map((entry) => {
      const lineItemsForEntry = LineItems.find({ entryId: entry._id }).fetch();
      const mutableEntry = Object.assign({}, entry, { lineItems: lineItemsForEntry });
      return mutableEntry;
    });
  }

  return {
    entries: entriesWithLineItems,
  };
};

export default withTracker(dataSource)(withRouter(Results));
