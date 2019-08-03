import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import { Icon, IconButton, Tooltip, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { Entries } from '../../../api/entries';
import { LineItems } from '../../../api/lineItems';
import DetailView from './subComponents/DetailView';

const styles = {
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchIcon: {
    color: '#868735',
  },
};

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableColumns: [
        {
          title: 'Date Created',
          field: 'createdAt',
          type: 'date',
          defaultSort: 'desc',
        },
        { title: 'Header', field: 'header' },
        { title: 'Type', field: 'type' },
        {
          title: 'Items',
          field: 'lineItems',
          render: this.renderLineItems,
          customFilterAndSearch: this.searchLineItems,
        },
        {
          title: 'Actions',
          sorting: false,
          headerStyle: {
            display: 'flex',
            justifyContent: 'center',
          },
          cellStyle: {
            width: '84px',
            padding: '0 5px',
          },
          render: this.renderActions,
        },
        { title: 'EntryId', field: '_id', hidden: true },
      ],
      selectedLineItem: '',
    };
  }

  onClickDetails = (rowId, isCurrentLineItemSelected) => {
    if (isCurrentLineItemSelected) {
      // Close detail view if the same row is selected
      this.setState({ selectedLineItem: '' });
    } else {
      this.setState({ selectedLineItem: rowId });
    }
  }

  onClickRedirect = (id) => {
    const { history } = this.props;
    history.push('/singlePage', { entryId: id });
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

  searchLineItems = (filterValue, row, columnDef) => {
    const { lineItems } = row;
    return lineItems.find((lineItem) => {
      const { content } = lineItem;
      return content.toLowerCase().includes(filterValue.toLowerCase());
    });
  };

  renderLineItems = (row) => {
    const { lineItems } = row;
    const { selectedLineItem } = this.state;

    return (
      <DetailView id={row._id} lineItems={lineItems} selectedLineItem={selectedLineItem} />
    );
  };

  renderActions = (row) => {
    const { classes } = this.props;
    const { selectedLineItem } = this.state;
    const { _id: id } = row;
    const isCurrentLineItemOpen = id === selectedLineItem;

    return (
      <div className={classes.actionsContainer}>
        <Tooltip title={isCurrentLineItemOpen ? 'Show Less' : 'Show More'}>
          <IconButton onClick={() => this.onClickDetails(id, isCurrentLineItemOpen)}>
            <Icon>{isCurrentLineItemOpen ? 'expand_less' : 'expand_more'}</Icon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Go To Page">
          <IconButton onClick={() => this.onClickRedirect(id)}>
            <Icon>link</Icon>
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  render() {
    const { classes } = this.props;
    const { tableColumns } = this.state;
    const formattedEntries = this.getParsedEntries();

    return (
      <div className="search-container">
        <MaterialTable
          title="Search Results"
          columns={tableColumns}
          data={formattedEntries}
          icons={{
            Search: React.forwardRef((props, ref) => (
              <Icon
                {...props}
                ref={ref}
                color="primary"
                className={classes.searchIcon}
              >
                search
              </Icon>
            )),
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

export default withTracker(dataSource)(withRouter(withStyles(styles)(Results)));
