import React from 'react';
import OverviewActions from './OverviewActions.jsx';
import SearchBar from './SearchBar.jsx';

class Overview extends React.Component{
    render(){
        return (
            <div>
            <SearchBar />
            <OverviewActions />
            </div>
        );
    }
}

export default Overview;