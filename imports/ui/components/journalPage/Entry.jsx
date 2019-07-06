import React, { Component } from 'react';
import { Icon, IconButton, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
          <Typography variant="h5">{header}</Typography>
          <IconButton onClick={() => this.onClickDeleteEntry(entryId)}>
            <Icon>delete</Icon>
          </IconButton>
        </div>
        <div className="entry">
          <li>List Item 1</li>
          <li>List Item 2</li>
          <li>List Item 3</li>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Entry);
