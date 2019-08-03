import React from 'react';
import { LinearProgress, Typography } from '@material-ui/core';

import OverviewActions from './OverviewActions';
import SearchBar from './SearchBar';
import INSPIRATIONAL_QUOTES from '../../constants/quotes';
import '../../css/overviewPage/Overview.css';




class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: INSPIRATIONAL_QUOTES.INSPIRATIONAL_QUOTES,
    };
  }
  

  render() {
    const { loading, user, actions } = this.props;  
    
  
    //const quotes = INSPIRATIONAL_QUOTES;
    console.log(this.state.quotes);
    
    var quote = this.state.quotes[Math.floor(Math.random()*this.state.quotes.length)];
    console.log(quote);
    return (
      loading
        ? <LinearProgress />
        : (
          <div className="overview-container">
            <Typography variant="h4">Hi, {user && user.profile.firstName}!</Typography>
            <Typography variant="h6">{quote}</Typography>
            <SearchBar user={user} />
            <OverviewActions actions={actions} />
          </div>
        )
    );
  }
}

export default Overview;
