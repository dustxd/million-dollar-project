import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Button,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  Tooltip,
  Typography,
} from '@material-ui/core';

// Component constants
const NAVIGATION_OPTIONS = [
  {
    key: 'overview', title: 'Overview', path: '/', icon: 'dashboard',
  },
  {
    key: 'spread', title: 'Spread View', path: '/spread', icon: 'chrome_reader_mode',
  },
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
      anchorEl: null,
      currentTab: 0,
    };
  }

  onClickSignout = () => {
    const { coreProps, history } = this.props;
    const { actions } = coreProps;
    actions.logoutUser();
    history.push('/login');
  }

  onClickOpenMenu = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  onClickCloseMenu = () => {
    this.setState({
      anchorEl: null,
    });
  }

  onClickChangeTab = (event, updatedTab) => {
    this.setState({
      currentTab: updatedTab,
    });
  }

  renderAppBar = () => {
    const { classes, history } = this.props;
    const { currentTab, anchorEl } = this.state;

    return (
      <AppBar
        color="primary"
        className={classes.appBar}
      >
        <Tabs
          value={currentTab}
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
        <div>
          <Tooltip title="Account" aria-label="Account">
            <IconButton onClick={e => this.onClickOpenMenu(e)}>
              <Icon color="secondary">account_circle</Icon>
            </IconButton>
          </Tooltip>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => this.onClickCloseMenu()}
          >
            <MenuItem onClick={() => this.onClickCloseMenu()}>My account</MenuItem>
            <MenuItem onClick={() => this.onClickSignout()}>Logout</MenuItem>
          </Menu>
        </div>
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
