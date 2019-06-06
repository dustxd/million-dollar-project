import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from '/imports/ui/App';
import reducers from '../imports/ui/reducers';
import '../imports/ui/css/main.css';

Meteor.startup(() => {
  render(
    <Provider store={createStore(reducers)}>
      <App />
    </Provider>,
    document.getElementById('react-target'),
  );
});
