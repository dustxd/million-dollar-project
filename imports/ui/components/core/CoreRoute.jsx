import React from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Button,
  Icon,
  Typography,
} from '@material-ui/core';

// Component constants
const NAVIGATION_OPTIONS = [
  {
    key: 'overview', title: 'Overview', path: '/overview', icon: 'dashboard',
  },
  {
    key: 'spread', title: 'Spread View', path: '/spread', icon: 'work_outline',
  },
];

// Styles
const APPBAR_HEIGHT = 50;

const styles = {
  appBar: {
    position: 'fixed',
    height: `${APPBAR_HEIGHT}px`,
    padding: '0px 15px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  navOptionsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  navOptionButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  navOptionText: {
    marginLeft: '10px',
  },
  signoutButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  signoutIcon: {
    color: '#37aab1',
  },
  signoutText: {
    marginLeft: '10px',
    textDecoration: 'underline',
    color: '#37aab1',
  },
  pageContent: {
    marginTop: `${APPBAR_HEIGHT + 20}px`,
  },
};

class CoreView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onClickSignout = () => {
    // TODO: Clear user state in Redux
    this.props.history.push('/login');
  }

  renderAppBar = () => {
    const { classes, history } = this.props;

    return (
      <AppBar
        color="default"
        className={classes.appBar}
      >
        <div className={classes.navOptionsContainer}>
          {
            NAVIGATION_OPTIONS.map(option => (
              <Button
                className={classes.navOptionButton}
                onClick={() => history.push(option.path)}
              >
                <Icon>{option.icon}</Icon>
                <Typography className={classes.navOptionText} noWrap>
                  {option.title}
                </Typography>
              </Button>
            ))
          }
        </div>
        <Button
          className={classes.signoutButton}
          onClick={() => this.onClickSignout()}
        >
          <Icon className={classes.signoutIcon}>exit_to_app</Icon>
          <Typography className={classes.signoutText} noWrap>
            Sign Out
          </Typography>
        </Button>
      </AppBar>
    );
  }

  renderPageContent = () => {
    const { classes, render } = this.props;

    return (
      <div className={classes.pageContent}>
        {render()}
      </div>
    );
  }

  renderRoute = () => (
    <div>
      {this.renderAppBar()}
      {this.renderPageContent()}
    </div>
  )

  render() {
    const { classes, render, ...routeProps } = this.props;

    return (
      <Route
        {...routeProps}
        render={() => this.renderRoute()}
      />
    );
  }
}

export default withStyles(styles)(withRouter(CoreView));