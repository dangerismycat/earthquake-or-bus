import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppView from './App';
import store from './store';


const node = (
  <Provider store={store}>
    <AppView />
  </Provider>
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(node, div);
});
