import React from 'react';
import { LinearProgress } from '@material-ui/core';

import OverviewActions from './OverviewActions';
import SearchBar from './SearchBar';
import '../../css/overviewPage/Overview.css';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { loading, user, actions } = this.props;

    return (
      loading
        ? <LinearProgress />
        : (
          <div className="overview-container">
            <SearchBar user={user} />
            <OverviewActions actions={actions} />
          </div>
        )
    );
  }
}

export default Overview;
