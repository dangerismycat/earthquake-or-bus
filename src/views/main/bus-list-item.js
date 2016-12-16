import React, { PropTypes } from 'react';

import '../../stylesheets/main-bus-list.css';


function BusListItem(props) {
  const { name, distance } = props;

  return (
    <div className="button bus-list-item">
      The {name} is about {Math.round(distance)} feet away
    </div>
  );
}

BusListItem.propTypes = {
  name: PropTypes.string,
  distance: PropTypes.number,
};

export default BusListItem;
