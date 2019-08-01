import React from 'react';
import Results from './Results.jsx';

// import SearchBar from './SearchBar.jsx';
// import '../../css/overviewPage/SearchPage.css';

class SearchPage extends React.Component {
	render(){
		const { actions } = this.props;
		return (
			<div className="search-container">
        {/* <SearchBar /> */}
        <Results actions={actions} />
			</div>
		);
	}
}

export default SearchPage;
