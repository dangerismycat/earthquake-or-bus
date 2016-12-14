import React, { PropTypes } from 'react';

import '../../stylesheets/main-earthquake-list.css';


function EarthquakeListItem(props) {
  const { description, distance, location, magnitude, timeDifference, url } = props;

  return (
    <div className="button main-earthquake-list-item">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <div className="main-earthquake-list-item-title">
          {description}
        </div>
        <div className="main-earthquake-list-item-body">
          There was a magnitude {magnitude} earthquake about {timeDifference}.
          It was located {location}, about {Math.round(distance)} miles away.
        </div>
      </a>
    </div>
  );
}

EarthquakeListItem.propTypes = {
  description: PropTypes.string,
  distance: PropTypes.number,
  location: PropTypes.string,
  magnitude: PropTypes.number,
  timeDifference: PropTypes.string,
  url: PropTypes.string,
};

export default EarthquakeListItem;
