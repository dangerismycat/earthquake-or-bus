import React from 'react';
import ReactDOM from 'react-dom';

import Nothing from './nothing';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Nothing />, div);
});
