import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CoreRoute from './components/core/CoreRoute';
import Login from './components/authentication/LoginPage';
import Overview from './components/overviewPage/Overview';
import Spread from './components/journalPage/Spread';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/login" name="login" render={() => <Login />} />
        <CoreRoute exact path="/overview" name="overview" render={() => <Overview />} />
        <CoreRoute exact path="/spread" name="spread" render={() => <Spread />} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
