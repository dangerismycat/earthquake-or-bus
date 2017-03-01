import React from 'react';
import ReactDOM from 'react-dom';

import BusListItem from './bus-list-item';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BusListItem />, div);
});
