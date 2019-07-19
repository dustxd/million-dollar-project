import React, { Component } from 'react';
import {
  ClickAwayListener,
  Icon,
  IconButton,
  List,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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

  onClickLineItem = (lineItemId) => {
    this.setState({ selectedLineItem: lineItemId });
  }

  onBlurLineItem = () => {
    this.setState({ selectedLineItem: '' });
  }

  render() {
    const { classes, header, entryId } = this.props;
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
          <List component="nav">
            <LineItem selectedLineItem={selectedLineItem} onClickLineItem={id => this.onClickLineItem(id)} id={0} item={{ type: 'TASK', status: 'TODO', content: 'Need to do this' }} />
            <LineItem selectedLineItem={selectedLineItem} onClickLineItem={id => this.onClickLineItem(id)} id={1} item={{ type: 'TASK', status: 'COMPLETED', content: 'Done with this' }} />
            <LineItem selectedLineItem={selectedLineItem} onClickLineItem={id => this.onClickLineItem(id)} id={2} item={{ type: 'TASK', status: 'SCHEDULED', content: 'Scheduled' }} />
            <LineItem selectedLineItem={selectedLineItem} onClickLineItem={id => this.onClickLineItem(id)} id={3} item={{ type: 'TASK', status: 'MIGRATED', content: 'Migrated this' }} />
            <LineItem selectedLineItem={selectedLineItem} onClickLineItem={id => this.onClickLineItem(id)} id={4} item={{ type: 'EVENT', content: 'An event' }} />
            <LineItem selectedLineItem={selectedLineItem} onClickLineItem={id => this.onClickLineItem(id)} id={5} item={{ type: 'NOTE', content: 'A memorable note' }} />
            {
              openNewLineItem
                ? (
                  <LineItem
                    selectedLineItem={selectedLineItem}
                    onClickLineItem={id => this.onClickLineItem(id)}
                    id="NEW"
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

export default withStyles(styles)(Entry);
