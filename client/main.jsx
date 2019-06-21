import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import thunk from 'redux-thunk';

import App from '../imports/ui/App';
import RootReducer from '../imports/ui/reducers';
import './main.css';
import customizedThemes from '../imports/ui/css/customMuiStyles';

const theme = createMuiTheme(customizedThemes);

Meteor.startup(() => {
  render(
    <Provider store={createStore(RootReducer, applyMiddleware(thunk))}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('react-target'),
  );
});
