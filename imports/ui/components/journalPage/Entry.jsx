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

import { LineItems } from '../../../api/lineItems';
import LineItem from './LineItem';

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

  onClickAddLineItem = (lineItemInfo) => {
    const { entryId, actions } = this.props;

    const newLineItem = {
      ...lineItemInfo,
      entryId,
    };

    actions.addResource(newLineItem, 'lineItems');
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

  render() {
    const { classes, header, entryId, lineItems } = this.props;
    const { openNewLineItem, selectedLineItem } = this.state;

    return (
      <ClickAwayListener onClickAway={() => this.onBlurLineItem()}>
        <div>
          <div className={classes.header}>
            <Typography variant="h5">{header}</Typography>
            <IconButton onClick={() => this.onClickDeleteEntry(entryId)}>
              <Icon>delete</Icon>
            </IconButton>
            <IconButton onClick={() => this.onClickOpenNewLineItem()}>
              <Icon>add</Icon>
            </IconButton>
          </div>
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
                    onClickAddLineItem={lineItemInfo => this.onClickAddLineItem(lineItemInfo)}
                    item={{}}
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
