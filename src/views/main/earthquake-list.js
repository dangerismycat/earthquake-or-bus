import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import EarthquakeListItem from './earthquake-list-item';

import '../../stylesheets/main-earthquake-list.css';


function EarthquakeList(props) {
  const { recentNearbyEarthquakes } = props;

  const earthquakeList = recentNearbyEarthquakes.map((quake) => <EarthquakeListItem {...quake} />);

  return (
    <div className="main-earthquake">
      <div className="main-earthquake-text">
        Whoa, that might have been an earthquake! Check these out:
      </div>
      <div className="main-earthquake-list">
        {earthquakeList}
      </div>
    </div>
  );
}

EarthquakeList.propTypes = {
  recentNearbyEarthquakes: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    recentNearbyEarthquakes: state.recentNearbyEarthquakes,
  };
}

export default connect(mapStateToProps)(EarthquakeList);
