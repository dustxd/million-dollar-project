import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import {
  Box,
  Icon,
  IconButton,
  CircularProgress,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';

import { Entries } from '../../../api/entries';
import { LineItems } from '../../../api/lineItems';
import { SEARCH_CONSTRAINTS } from '../../constants/ResourceConstants';
import DetailView from './subComponents/DetailView';
import customMuiStyles from '../../css/customMuiStyles';

const styles = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
};

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRow: null,
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

    this.theme = createMuiTheme({
      palette: {
        primary: {
          main: customMuiStyles.PRIMARY,
        },
        secondary: {
          main: customMuiStyles.SECONDARY,
        },
      },
      overrides: {
        MuiPaper: {
          root: {
            backgroundColor: customMuiStyles.TRANSLUCENT_PAPER,
          },
        },
      },

    });
  }

  onClickDetails = (rowId, isCurrentLineItemSelected) => {
    if (isCurrentLineItemSelected) {
      // Close detail view if the same row is selected
      this.setState({ selectedLineItem: '' });
    } else {
      this.setState({ selectedLineItem: rowId });
    }
  }

  onClickRedirect = (id, type) => {
    const { history, actions } = this.props;
    actions.updateBookmarkIndex(id);
    history.push('/singlePage');
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
    const { _id: id, lineItems } = row;
    const isCurrentLineItemOpen = id === selectedLineItem;

    return (
      <div className={classes.actionsContainer}>
        <Tooltip title={isCurrentLineItemOpen ? 'Show Less' : 'Show More'}>
          <div>
            <IconButton
              disabled={lineItems.length <= SEARCH_CONSTRAINTS.NUM_PREVIEW_ITEMS}
              onClick={() => this.onClickDetails(id, isCurrentLineItemOpen)}
            >
              <Icon color="primary">{isCurrentLineItemOpen ? 'expand_less' : 'expand_more'}</Icon>
            </IconButton>
          </div>
        </Tooltip>
        <Tooltip title="Go To Page">
          <IconButton onClick={() => this.onClickRedirect(id)}>
            <Icon color="primary">link</Icon>
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  render() {
    const { retrievingData, classes } = this.props;
    const { tableColumns } = this.state;
    const formattedEntries = this.getParsedEntries();

    if (retrievingData) {
      return (
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      );
    }

    return (
      <MuiThemeProvider theme={this.theme}>
        <MaterialTable
          title="Journal Entries"
          columns={tableColumns}
          data={formattedEntries}
          icons={{
            Search: React.forwardRef((props, ref) => (
              <Box color="primary.main">
                <Icon
                  {...props}
                  ref={ref}
                  color="primary"
                >
                  search
                </Icon>
              </Box>
            )),
          }}
          options={{
          headerStyle: {
            backgroundColor: 'rgba(255,255,255,0)',
            color: customMuiStyles.PRIMARY,
          },
          }}
        />
    </MuiThemeProvider>
    );
  }
}

const dataSource = (props) => {
  const entriesHandler = Meteor.subscribe('entriesWithLineItems');
  const isReady = entriesHandler.ready();

  let entriesWithLineItems = [];
  if (entriesHandler.ready()) {
    entriesWithLineItems = Entries.find({}, { sort: { createdAt: -1 } }).fetch().map((entry) => {
      const lineItemsForEntry = LineItems.find({ entryId: entry._id }).fetch();
      const mutableEntry = Object.assign({}, entry, { lineItems: lineItemsForEntry });
      return mutableEntry;
    });
  }

  return {
    retrievingData: !isReady,
    entries: entriesWithLineItems,
  };
};

export default withTracker(dataSource)(withRouter(withStyles(styles)(Results)));
