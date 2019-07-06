import React, { Component } from 'react';
import LineItem from './LineItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

class Entry extends Component {
	constructor(props) {
		
	}
	render() {
		return (
			<div>
			<Typography
          variant="h2"
        >{this.props.header}</Typography>
				<div className="entry">
				<List component="nav">
					<LineItem bulletType='toDo' content='Need to do this'/>
					<LineItem bulletType='toDoCompleted' content='Done with this'/>
					<LineItem bulletType='toDoScheduled' content='Scheduled'/>
					<LineItem bulletType='toDoMigrated' content='Migrated this'/>
					<LineItem bulletType='event' content='An event'/>
					<LineItem bulletType='note' content='A memorable note'/>
					</List>
				</div>
			</div>
		);
	}
}

export default Entry;