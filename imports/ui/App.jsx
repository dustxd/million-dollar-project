import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import customMuiStyles from './css/customMuiStyles';
import * as Actions from './actions/index';
import CoreRoute from './components/core/CoreRoute';
import LoginPage from './components/authentication/LoginPage';
import Overview from './components/overviewPage/Overview';
import ListView from './components/listView/ListView';
import Spread from './components/journalPage/Spread';
import SinglePage from './components/singlePage/SinglePage';
import WeekView from './components/weekView/WeekView';

const App = props => (
  <MuiThemeProvider theme={createMuiTheme(customMuiStyles.appTheme)}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" name="login" render={() => <LoginPage {...props} />} />
        <CoreRoute exact path="/" name="overview" coreProps={props} render={() => <Overview {...props} />} />
        <CoreRoute exact path="/list" name="list" coreProps={props} render={() => <ListView {...props} />} />
        <CoreRoute exact path="/singlePage" name="singlePage" coreProps={props} render={() => <SinglePage {...props} />} />
        <CoreRoute exact path="/spread" name="spread" coreProps={props} render={() => <Spread {...props} />} />
        <CoreRoute exact path="/week" name="week" coreProps={props} render={() => <WeekView {...props} />} />
      </Switch>
    </BrowserRouter>
  </MuiThemeProvider>
);

const mapStateToProps = state => ({
  user: state.user,
  loading: state.loading,
  bookmark: state.bookmark,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
