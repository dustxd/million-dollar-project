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
  onClickDeleteEntry = (entryId) => {
    const { actions } = this.props;
    actions.deleteResource(entryId, 'entries');
  }

  render() {
    const { classes, header, entryId } = this.props;

    return (
      <div>
        <div className={classes.header}>
          <IconButton>
            <Icon>keyboard_arrow_left</Icon>
          </IconButton>
          <Typography variant="h5">{header}</Typography>
          <IconButton>
            <Icon>keyboard_arrow_right</Icon>
          </IconButton>
          <IconButton onClick={() => this.onClickDeleteEntry(entryId)}>
            <Icon>delete</Icon>
          </IconButton>
        </div>
        <List component="nav">
          <LineItem item={{ type: 'TASK', status: 'TODO', content: 'Need to do this' }} />
          <LineItem item={{ type: 'TASK', status: 'COMPLETED', content: 'Done with this' }} />
          <LineItem item={{ type: 'TASK', status: 'SCHEDULED', content: 'Scheduled' }} />
          <LineItem item={{ type: 'TASK', status: 'MIGRATED', content: 'Migrated this' }} />
          <LineItem item={{ type: 'EVENT', content: 'An event' }} />
          <LineItem item={{ type: 'NOTE', content: 'A memorable note' }} />
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(Entry);
