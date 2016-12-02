import { createStore } from 'redux';

import reducer from './reducer';

// Enable Redux Dev Tools for lovely DX
const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
