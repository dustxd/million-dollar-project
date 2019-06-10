import React, { Component } from 'react';

class Entry extends Component {
	render() {
		return (
			<div>
				<span className="header">{this.props.header}</span>
				<div className="entry">
					<li>Item 1</li>
					<li>Item 2</li>
					<li>Item 3</li>
				</div>
			</div>
		);
	}
}

export default Entry;