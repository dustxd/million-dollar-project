import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core';

import AccountDrawer from './AccountDrawer';

// Component constants
const NAVIGATION_OPTIONS = [
  {
    key: 'overview', title: 'Overview', path: '/', icon: 'dashboard',
  },
  {
    key: 'week', title: 'Week View', path: '/week', icon: 'calendar',
  },
  // {
  //   key: 'spread', title: 'Spread View', path: '/spread', icon: 'chrome_reader_mode',
  // },
  {
    key: 'singlePage', title: 'Page View', path: '/singlePage', icon: 'insert_drive_file',
  },
  {
    key: 'list', title: 'List View', path: '/list', icon: 'search',
  },
];

// Styles
const APPBAR_HEIGHT = 60;

const styles = {
  appBar: {
    position: 'fixed',
    height: `${APPBAR_HEIGHT}px`,
    padding: '0px 15px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  pageContent: {
    marginTop: `${APPBAR_HEIGHT}px`,
  },
};

class CoreView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
    };
  }

  onClickSignout = () => {
    const { coreProps, history } = this.props;
    const { actions } = coreProps;
    actions.logoutUser();
    history.push('/login');
  }

  onClickChangeTab = (event, updatedTab) => {
    this.setState({
      currentTab: updatedTab,
    });
  }

  renderAppBar = () => {
    const { path, classes, history } = this.props;
    const { currentTab } = this.state;

    let tabIndex = currentTab;

    if (NAVIGATION_OPTIONS[currentTab].path !== path) {
      // Handles redirection from other pages where onClickChangeTab will not be triggered
      tabIndex = NAVIGATION_OPTIONS.findIndex(option => option.path === path);
    }

    return (
      <AppBar
        color="primary"
        className={classes.appBar}
      >
        <Tabs
          value={tabIndex}
          onChange={(e, tab) => this.onClickChangeTab(e, tab)}
          indicatorColor="secondary"
          textColor="secondary"
        >
          {
            NAVIGATION_OPTIONS.map(option => (
              <Tab
                key={option.key}
                label={option.title}
                onClick={() => history.push(option.path)}
              />
            ))
          }
        </Tabs>
        <AccountDrawer onClickLogout={() => this.onClickSignout()}/>
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
    const { classes, render, coreProps, ...routeProps } = this.props;

    if (!coreProps.user) {
      return (
        <Redirect to="/login" />
      );
    }

    return (
      <Route
        {...routeProps}
        render={() => this.renderRoute()}
      />
    );
  }
}

export default withStyles(styles)(withRouter(CoreView));
