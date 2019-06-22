import React from 'react';
import OverviewActions from './OverviewActions.jsx';
import SearchBar from './SearchBar.jsx';
import '../../css/overviewPage/Overview.css';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { user } = this.props;
    return (
      <div className="overview-container">
        <SearchBar user={user} />
        <OverviewActions />
      </div>
    );
  }
}

export default Overview;
