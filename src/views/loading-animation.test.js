import React from 'react';
import ReactDOM from 'react-dom';

import LoadingAnimationView from './loading-animation';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoadingAnimationView />, div);
});
