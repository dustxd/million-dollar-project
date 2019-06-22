import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from './actions/index';
import CoreRoute from './components/core/CoreRoute';
import Login from './components/authentication/LoginPage';
import Overview from './components/overviewPage/Overview';
import Spread from './components/journalPage/Spread';

const App = props => (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/login" name="login" render={() => <Login {...props} />} />
        <CoreRoute exact path="/overview" name="overview" render={() => <Overview {...props} />} />
        <CoreRoute exact path="/spread" name="spread" render={() => <Spread {...props} />} />
      </Switch>
    </div>
  </BrowserRouter>
);

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
