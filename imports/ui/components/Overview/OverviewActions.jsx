import React from 'react';

class OverviewActions extends React.Component{
    render(){
        return (
            <div>
            <button class="overview-button">Add daily entry</button>
            <button class="overview-button">Add collection</button>
            <button class="overview-button">Last entry</button>
            </div>
        );
    }
}

export default OverviewActions;