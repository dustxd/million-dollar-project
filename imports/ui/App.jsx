import React from 'react';
import Login from './components/authentication/LoginPage.jsx';
import Spread from './components/journalPage/Spread.jsx';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <div className="App" >
      <Switch>
        <Route exact path="/login" name="login" render={() => <Login />} />
        <Route exact path="/spread" name="spread" render={() => <Spread />} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
