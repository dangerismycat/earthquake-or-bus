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
// `expect.any` not currently supported in react-scripts 0.9.3?
// it('accepts a string', () => {
//   const mock = jest.fn();
//   getWarningText(mock);
//   expect(mock).toBeCalledWith(expect.any(String));
// });

it('returns a string', () => {
  expect(typeof getWarningText()).toBe('string');
});
