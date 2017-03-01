import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import LocationWarningView, { getWarningText } from './location-warning';
import store from '../store';


/*** component ***/
const node = (
  <Provider store={store}>
    <LocationWarningView />
  </Provider>
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(node, div);
});


/*** getWarningText helper ***/
it('returns a string', () => {
  expect(typeof getWarningText()).toBe('string');
});
