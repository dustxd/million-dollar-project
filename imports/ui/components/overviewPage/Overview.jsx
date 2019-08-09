import React from 'react';
import { LinearProgress, Typography } from '@material-ui/core';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

import OverviewActions from './OverviewActions';
import SearchBar from './SearchBar';

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overviewContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    height: '50%',
  },
};

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
    const { loading, classes, user, actions } = this.props;
    const { profile, quote } = user;
    const { firstName } = profile;
    const greeting = this.greetingText();

    return (
      loading
        ? <LinearProgress />
        : (
          <div className={classes.pageContainer}>
            <div className={classes.overviewContainer}>
              <Typography variant="h4">
                {`${greeting} ${firstName}.`}
              </Typography>
              <SearchBar user={user} />
              <OverviewActions actions={actions} />
              <Typography variant="overline">{quote}</Typography>
            </div>
          </div>
        )
    );
  }
}

export default withStyles(styles)(Overview);
