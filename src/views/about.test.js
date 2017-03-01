import React from 'react';
import ReactDOM from 'react-dom';

import AboutView from './about';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AboutView />, div);
});
