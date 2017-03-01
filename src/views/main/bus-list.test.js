import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import BusList from './bus-list';
import store from '../../store';


const node = (
  <Provider store={store}>
    <BusList />
  </Provider>
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(node, div);
});
