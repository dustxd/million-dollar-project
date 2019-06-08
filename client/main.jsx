import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import App from '/imports/ui/App';
import reducers from '../imports/ui/reducers';
import './main.css';
import customizedThemes from '../imports/ui/css/customMuiStyles.js';

const theme = createMuiTheme(customizedThemes);

Meteor.startup(() => {
  render(
    <Provider store={createStore(reducers)}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>,
    document.getElementById('react-target'),
  );
});
