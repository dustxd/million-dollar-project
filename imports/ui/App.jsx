import React from 'react';
import Login from './components/Login/LoginPage.jsx';
import Overview from './components/Overview/Overview.jsx';
import Spread from './components/Journal/Spread.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <div className="App" >
      <Switch>
        <Route exact path="/login" name="login" render={() => <Login />} />
        <Route exact path="/overview" name="overview" render={()=><Overview />} />
        <Route exact path="/spread" name="spread" render={() => <Spread />} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
