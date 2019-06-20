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

const APPBAR_HEIGHT = 50;

const styles = {
  appBar: {
    position: 'fixed',
    height: `${APPBAR_HEIGHT}px`,
    padding: '0px 32px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  signoutContainer: {
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer',
  },
  signoutIcon: {

  },
  signoutText: {
    marginLeft: '30px',
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
    const { classes } = this.props;

    return (
      <AppBar
        color="default"
        className={classes.appBar}
      // className={classNames(classes.appBar, open && classes.appBarShift)}
      >
        <Button
          className={classes.signoutContainer}
          onClick={() => this.onClickSignout()}
        >
          <Icon>exit_to_app</Icon>
          <Typography
            className={classes.signoutText}
          >
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
    const user = {
      firstName: 'John',
      lastName: 'Doe',
    };

    return (
      <Route
        {...routeProps}
        render={() => this.renderRoute()}
      />
    );
  }
}

export default withStyles(styles)(withRouter(CoreView));
