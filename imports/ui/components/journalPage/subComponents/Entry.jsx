import React, { Component } from 'react';
import {
  ClickAwayListener,
  Icon,
  IconButton,
  List,
  Typography,
} from '@material-ui/core';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { withStyles } from '@material-ui/core/styles';

import { LineItems } from '../../../../api/lineItems';
import LineItem from './LineItem';
import { HEADER_TYPES } from '../../../constants/ResourceConstants';

const styles = {
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerWithNav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headertext: {
    width: '40%',
    display: 'flex',
    justifyContent: 'center',
  },
  headertextNoActions: {
    display: 'flex',
    justifyContent: 'center',
  },
};

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openNewLineItem: false,
      selectedLineItem: '',
    };
  }

  onClickDeleteEntry = (entryId) => {
    const { actions } = this.props;
    actions.deleteResource(entryId, 'entries');
  }

  onClickOpenNewLineItem = () => {
    this.setState({
      openNewLineItem: true,
      selectedLineItem: 'NEW',
    });
  }

  onClickAddOrUpdateLineItem = (lineItemInfo, lineItemId) => {
    const { entryId, actions } = this.props;

    const newLineItem = {
      ...lineItemInfo,
      entryId,
    };

    if (lineItemId === 'NEW') {
      actions.addResource(newLineItem, 'lineItems');
    } else {
      actions.updateResource(newLineItem, 'lineItems', lineItemId);
    }

    this.onBlurLineItem();
  }

  onClickRemoveLineItem = (lineItemId) => {
    const { actions } = this.props;

    if (lineItemId === 'NEW') {
      this.onBlurLineItem();
    } else {
      actions.deleteResource(lineItemId, 'lineItems');
    }
  }

  onClickLineItem = (lineItemId) => {
    this.setState({ selectedLineItem: lineItemId });
  }

  onBlurLineItem = () => {
    this.setState({
      openNewLineItem: false,
      selectedLineItem: '',
    });
  }

  getEntryIndex = () => {
    const { entryId, entries } = this.props;
    const entryIndex = entries.findIndex(x => x._id === entryId);
    return entryIndex;
  }

  getNextEntryId = () => {
    const { entries } = this.props;
    const nextEntryIndex = this.getEntryIndex() - 1;
    const nextEntry = entries[nextEntryIndex]._id;
    return nextEntry;
  }

  getPrevEntryId = () => {
    const { entries } = this.props;
    const prevEntryIndex = this.getEntryIndex() + 1;
    const prevEntry = entries[prevEntryIndex]._id;
    return prevEntry;
  }

  getNumEntries() {
    const { entries } = this.props;
    return entries.length;
  }

  onClickPreviousEntry = () => {
    const { actions } = this.props;
    if (this.getEntryIndex() < this.getNumEntries() - 1) {
      actions.updateIndexPage(this.getPrevEntryId());
    }
  }

  onClickNextEntry = () => {
    const { actions } = this.props;
    if (this.getEntryIndex() > 0) {
      actions.updateIndexPage(this.getNextEntryId());
    }
  }

  onClickGetPrevAndDeleteEntry = (entryId) => {
    const { actions } = this.props;
    if (this.getEntryIndex() < this.getNumEntries() - 1) {
      actions.updateIndexPage(this.getPrevEntryId());
      this.onClickDeleteEntry(entryId);
    } else {
      this.onClickDeleteEntry(entryId);
    }
  }

  isPrevDisabled = () => {
    if (this.getEntryIndex() < this.getNumEntries() - 1) {
      return false;
    }

    return true;
  }

  isNextDisabled = () => {
    if (this.getEntryIndex() === 0) {
      return true;
    }

    return false;
  }

  renderDatedHeaderWithNav = () => {
    const { classes, header, entryId } = this.props;

    return (
      <div className={classes.headerWithNav}>
        <IconButton disabled={this.isPrevDisabled()} onClick={() => this.onClickPreviousEntry()}>
          <Icon>arrow_back</Icon>
        </IconButton>
        <div className={classes.headertext}>
          <Typography variant="h5">{header}</Typography>
        </div>
        <IconButton disabled={this.isNextDisabled()} onClick={() => this.onClickNextEntry()}>
          <Icon>arrow_forward</Icon>
        </IconButton>
        <IconButton onClick={() => this.onClickGetPrevAndDeleteEntry(entryId)}>
          <Icon>delete</Icon>
        </IconButton>
        <IconButton onClick={() => this.onClickOpenNewLineItem()}>
          <Icon>add</Icon>
        </IconButton>
      </div>
    );
  }

  renderDatedHeaderWithNoActions = () => {
    const { classes, header, entryId } = this.props;

    return (
      <div className={classes.headerWithNav}>
        <div className={classes.headertextNoActions}>
          <Typography variant="h5">{header}</Typography>
        </div>
      </div>
    );
  }

  renderHeader = () => {
    const { headerType, classes, header, entryId } = this.props;

    if (headerType === HEADER_TYPES.WITH_NAV) {
      return this.renderDatedHeaderWithNav();
    }

    if (headerType === HEADER_TYPES.NO_ACTIONS) {
      return this.renderDatedHeaderWithNoActions();
    }

    return (
      <div className={classes.header}>
        <Typography variant="h5">{header}</Typography>
        <IconButton onClick={() => this.onClickDeleteEntry(entryId)}>
          <Icon>delete</Icon>
        </IconButton>
        <IconButton onClick={() => this.onClickOpenNewLineItem()}>
          <Icon>add</Icon>
        </IconButton>
      </div>
    );
  }

  render() {
    const { lineItems, disabled } = this.props;
    const { openNewLineItem, selectedLineItem } = this.state;

    return (
      <ClickAwayListener onClickAway={() => this.onBlurLineItem()}>
        <div>
          { this.renderHeader() }
          <List>
            {
              lineItems.map((lineItem) => {
                const { _id, owner, ...item } = lineItem;

                return (
                  <LineItem
                    key={_id}
                    id={_id}
                    selectedLineItem={selectedLineItem}
                    disabled={disabled}
                    onClickLineItem={id => this.onClickLineItem(id)}
                    onClickAddOrUpdateLineItem={(lineItemInfo, id) => this.onClickAddOrUpdateLineItem(lineItemInfo, id)}
                    onClickRemoveLineItem={id => this.onClickRemoveLineItem(id)}
                    item={item}
                  />
                );
              })
            }
            {
              openNewLineItem
                ? (
                  <LineItem
                    key="NEW"
                    id="NEW"
                    selectedLineItem={selectedLineItem}
                    onClickLineItem={id => this.onClickLineItem(id)}
                    onClickAddOrUpdateLineItem={(lineItemInfo, id) => this.onClickAddOrUpdateLineItem(lineItemInfo, id)}
                    onClickRemoveLineItem={id => this.onClickRemoveLineItem(id)}
                  />
                )
                : null
            }
          </List>
        </div>
      </ClickAwayListener>
    );
  }
}

const dataSource = (props) => {
  const { entryId } = props;

  Meteor.subscribe('lineItems', entryId);

  return {
    lineItems: LineItems.find({ entryId }).fetch(),
  };
};

export default withTracker(dataSource)(withStyles(styles)(Entry));
