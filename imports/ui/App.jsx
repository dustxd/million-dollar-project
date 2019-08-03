import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from './actions/index';
import CoreRoute from './components/core/CoreRoute';
import LoginPage from './components/authentication/LoginPage';
import Overview from './components/overviewPage/Overview';
import SearchPage from './components/searchPage/SearchPage';
import Spread from './components/journalPage/Spread';
import SinglePage from './components/singlePage/SinglePage';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import appTheme from './css/customMuiStyles';

const outerTheme = createMuiTheme(appTheme);

const App = props => (
  <MuiThemeProvider theme={outerTheme}>
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/login" name="login" render={() => <LoginPage {...props} />} />
          <CoreRoute exact path="/" name="overview" coreProps={props} render={() => <Overview {...props} />} />
          <CoreRoute exact path="/search" name="search" coreProps={props} render={() => <SearchPage {...props} />} />
          <CoreRoute exact path="/singlePage" name="singlePage" coreProps={props} render={() => <SinglePage {...props} />} />
          <CoreRoute exact path="/spread" name="spread" coreProps={props} render={() => <Spread {...props} />} />
        </Switch>
      </div>
    </BrowserRouter>
  </MuiThemeProvider> 
);

const mapStateToProps = state => ({
  user: state.user,
  loading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
