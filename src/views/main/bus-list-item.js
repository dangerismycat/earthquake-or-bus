import React, { PropTypes } from 'react';

import '../../stylesheets/main-bus-list.css';


function BusListItem(props) {
  const { name, lineRef, distance } = props;

  return (
    <div className="bus-list-item">
      The {lineRef} {name} is about {distance} feet away...
    </div>
  );
}

BusListItem.propTypes = {
  name: PropTypes.string,
  lineRef: PropTypes.string,
  distance: PropTypes.number,
};

export default BusListItem;
