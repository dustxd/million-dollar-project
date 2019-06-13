import React, { Component } from 'react';
import Page from './Page';
import '../../css/journalPage/Spread.css';

class Spread extends Component {
	render() {
		return (
			<div className="spread-container">
				<div className="spread grid-container">
					<Page page="left" />
					<Page page="right" />
				</div>
			</div>
		);
	}
}

export default Spread;