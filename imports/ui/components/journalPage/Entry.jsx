import React, { Component } from 'react';
import {
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
    };
  }

  onClickDeleteEntry = (entryId) => {
    const { actions } = this.props;
    actions.deleteResource(entryId, 'entries');
  }

  onClickOpenNewLineItem = () => {
    this.setState({ openNewLineItem: true });
  }

  render() {
    const { classes, header, entryId } = this.props;
    const { openNewLineItem } = this.state;

    return (
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
          <LineItem item={{ type: 'TASK', status: 'TODO', content: 'Need to do this' }} />
          <LineItem item={{ type: 'TASK', status: 'COMPLETED', content: 'Done with this' }} />
          <LineItem item={{ type: 'TASK', status: 'SCHEDULED', content: 'Scheduled' }} />
          <LineItem item={{ type: 'TASK', status: 'MIGRATED', content: 'Migrated this' }} />
          <LineItem item={{ type: 'EVENT', content: 'An event' }} />
          <LineItem item={{ type: 'NOTE', content: 'A memorable note' }} />
          {
            openNewLineItem ? <LineItem item={{}} /> : <div />
          }
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(Entry);
