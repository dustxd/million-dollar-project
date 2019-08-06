import React from 'react';
import { LinearProgress, Typography } from '@material-ui/core';
import moment from 'moment';
import OverviewActions from './OverviewActions';
import SearchBar from './SearchBar';
import '../../css/overviewPage/Overview.css';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  greetingText = () => {
    const now = moment();
    const currentHour = now.hour();

    if (currentHour >= 5 && currentHour < 12) {
      return 'Good morning,';
    }

    if (currentHour >= 12 && currentHour < 17) {
      return 'Good afternoon,';
    }

    return 'Good evening,';
  }

  render() {
    const { loading, user, actions } = this.props;
    const { profile, quote } = user;
    const { firstName } = profile;
    const greeting = this.greetingText();

    return (
      loading
        ? <LinearProgress />
        : (
          <div className="overview-container">
            <Typography variant="h4">
              {`${greeting} ${firstName}.`}
            </Typography>
            <SearchBar user={user} />
            <OverviewActions actions={actions} />
            <Typography variant="overline">{quote}</Typography>
          </div>
        )
    );
  }
}

export default Overview;
