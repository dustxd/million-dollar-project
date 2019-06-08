import React from 'react';
import OverviewActions from './OverviewActions.jsx';
import SearchBar from './SearchBar.jsx';
import '../../css/overview/Overview.css';



class Overview extends React.Component{
    render(){
        return (
            <div className="overview-container">
            <SearchBar />
            <OverviewActions />
            </div>
        );
    }
}

export default Overview;