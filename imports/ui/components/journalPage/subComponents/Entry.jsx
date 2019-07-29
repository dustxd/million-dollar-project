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

  hideRightArrow = () => {
  }

  hideLeftArrow = () => {

  }

  onClickPreviousEntry = () => {
    const { index, numEntries, actions } = this.props
    var prevIndex = index;
    // console.log(numEntries);
    if (index > numEntries) {
      this.hideLeftArrow();
    } else {
      prevIndex += 1;
      actions.updateIndexPage(prevIndex);
    }
    // check if pageIndex is <size of entries array - 1>, if true hide LeftArrow
    // else index +1
  }

  onClickNextEntry = () => {
    const { index, actions } = this.props
    if (index === 0) {
      this.hideRightArrow();
    } else {
      let nextIndex = index;
      nextIndex -= 1;
      actions.updateIndexPage(nextIndex);
    }
  }

  renderDatedHeaderWithNav = () => {
    const { classes, header, entryId } = this.props;

    return (
      <div className={classes.header}>
        <IconButton onClick={() => this.onClickPreviousEntry()}>
          <Icon>keyboard_arrow_left</Icon>
        </IconButton>
        <Typography variant="h5">{header}</Typography>
        <IconButton onClick={() => this.onClickNextEntry()}>
          <Icon>keyboard_arrow_right</Icon>
        </IconButton>
        <IconButton onClick={() => this.onClickDeleteEntry(entryId)}>
          <Icon>delete</Icon>
        </IconButton>
        <IconButton onClick={() => this.onClickOpenNewLineItem()}>
          <Icon>add</Icon>
        </IconButton>
      </div>
    );
  }

  renderHeader = () => {
    const { headerType, classes, header, entryId } = this.props;

    if (headerType === HEADER_TYPES.WITH_NAV) {
      return this.renderDatedHeaderWithNav();
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
    const { lineItems } = this.props;
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
