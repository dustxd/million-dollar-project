import React from 'react';
import { LinearProgress, Typography } from '@material-ui/core';
import moment from 'moment';
import OverviewActions from './OverviewActions';
import SearchBar from './SearchBar';
import INSPIRATIONAL_QUOTES from '../../constants/Quotes';
import '../../css/overviewPage/Overview.css';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: INSPIRATIONAL_QUOTES,
    };
  }

  greetingText = () => {
    const now = moment();
    const currentHour = now.hour();
      if (currentHour >= 5 && currentHour < 12) return "Good morning,"
      else if (currentHour >= 12 && currentHour < 17) return "Good afternoon,"
      else return "Good evening,"
  }

  render() {
    const { loading, user, actions } = this.props;  
    const greeting = this.greetingText();
    var quote = this.state.quotes[Math.floor(Math.random()*this.state.quotes.length)];
  
    return (
      loading
        ? <LinearProgress />
        : (
          <div className="overview-container">
            <Typography variant="h4">{greeting} {user && user.profile.firstName}.</Typography>
            <SearchBar user={user} />
            <OverviewActions actions={actions} />
            <Typography variant="overline">"{quote}"</Typography>
          </div>
        )
    );
  }
}

export default Overview;
