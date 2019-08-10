import React from 'react';
import { LinearProgress, Typography } from '@material-ui/core';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

import OverviewActions from './OverviewActions';
import TranslucentPaper from '../../constants/TranslucentPaper';

const styles = {
  pageContainer: {
    width: '60%',
    minHeight: '-webkit-fill-available',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
  },
  overviewContainer: {
    padding: '20px',
    paddingTop: '20%',
    paddingBottom: '20%',
    height: '-webkit-fill-available',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',    
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
              <TranslucentPaper>
                <div className={classes.overviewContainer}>
                <Typography variant="h1">
                    {moment().format('HH:mm')}
                </Typography>
                <Typography variant="h5">
                  {`${greeting} ${firstName}.`}
                </Typography>
                  <OverviewActions actions={actions} />
                  <Typography variant="overline">"{quote}"</Typography>  
                  </div>
              </TranslucentPaper>
          </div>
        )
    );
  }
}

export default withStyles(styles)(Overview);
