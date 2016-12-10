import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import AppView from './App';
import './stylesheets/index.css';

const target = document.getElementById('root');
const node = (
  <Provider store={store}>
    <AppView />
  </Provider>
);

ReactDOM.render(node, target);
