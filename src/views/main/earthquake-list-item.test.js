import React from 'react';
import ReactDOM from 'react-dom';

import EarthquakeListItem from './earthquake-list-item';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EarthquakeListItem />, div);
});
