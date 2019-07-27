import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { PersistGate } from 'redux-persist/integration/react';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import App from '../imports/ui/App';
import RootReducer from '../imports/ui/reducers';
import './main.css';
import { appTheme, userTheme } from '../imports/ui/css/customMuiStyles';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  blacklist: ['loading'],
};

const persistedReducer = persistReducer(persistConfig, RootReducer);
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);

const outerTheme = createMuiTheme(appTheme);
const innerTheme = createMuiTheme(userTheme);

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MuiThemeProvider theme={outerTheme}>
          <MuiThemeProvider theme={innerTheme}>
            <App />
          </MuiThemeProvider>
        </MuiThemeProvider>  
      </PersistGate>
    </Provider>,
    document.getElementById('react-target'),
  );
});
