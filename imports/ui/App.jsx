import React from 'react';
import Login from './components/authentication/LoginPage.jsx';
import Overview from './components/overviewPage/Overview.jsx'
import Spread from './components/journalPage/Spread.jsx';
import SearchPage from './components/searchPage/SearchPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <div className="App" >
      <Switch>
        <Route exact path="/login" name="login" render={() => <Login />} />
        <Route exact path="/overview" name="overview" render={()=><Overview />} />
        <Route exact path="/spread" name="spread" render={() => <Spread />} />
        {/* <Route exact path="/search" name="search" render={() => <SearchPage />} /> */}
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
