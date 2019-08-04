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
  Toolbar,
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
    key: 'search', title: 'Search', path: '/search', icon: 'search',
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
    // backgroundColor: 'primary',
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

  menuHandleClick = (event) => {
    this.setState({ 
      anchorEl: event.currentTarget,
    });
  }
  
  menuHandleClose = () => {
    this.setState({ 
      anchorEl: null,
    });
  }

  tabsHandleChange = (event, updatedTab) => {
    this.setState({
      currentTab: updatedTab,
    })
  }

  renderAppBar = () => {
    const { classes, history } = this.props;

    return (
      <AppBar
        color="primary"
        className={classes.appBar}
      >
      <Toolbar>
        <Tabs
          value={this.state.currentTab}
          onChange={this.tabsHandleChange}
          indicatorColor="secondary"
          textColor="secondary"
          
        >
          {
            NAVIGATION_OPTIONS.map(option => (
              <Tab label={option.title} key={option.key} onClick={() => history.push(option.path)}/>
            ))
          }
          </Tabs>
        </Toolbar>
        <Toolbar>
          <div>
            <Tooltip title="Account" aria-label="Account">
              <IconButton onClick={this.menuHandleClick}>
                <Icon color="secondary">account_circle</Icon>
              </IconButton>
            </Tooltip>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.menuHandleClose}
            >
              <MenuItem onClick={this.menuHandleClose}>My account</MenuItem>
              <MenuItem onClick={this.onClickSignout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
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
