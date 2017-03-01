import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import HeaderView from './header';
import store from '../store';


const node = (
  <Provider store={store}>
    <HeaderView />
  </Provider>
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(node, div);
});
