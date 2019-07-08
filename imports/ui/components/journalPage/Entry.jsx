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
          <Typography variant="h5">{header}</Typography>
          <IconButton onClick={() => this.onClickDeleteEntry(entryId)}>
            <Icon>delete</Icon>
          </IconButton>
        </div>
        <List component="nav">
					<LineItem bulletType='toDo' content='Need to do this'/>
					<LineItem bulletType='toDoCompleted' content='Done with this'/>
					<LineItem bulletType='toDoScheduled' content='Scheduled'/>
					<LineItem bulletType='toDoMigrated' content='Migrated this'/>
					<LineItem bulletType='event' content='An event'/>
					<LineItem bulletType='note' content='A memorable note'/>
				</List>
      </div>
    );
  }
}

export default withStyles(styles)(Entry);

