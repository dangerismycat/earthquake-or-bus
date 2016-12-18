import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import BusListItem from './bus-list-item';

import '../../stylesheets/main-bus-list.css';


function BusList(props) {
  const { closestFiveVehicles, getAllEarthquakesData } = props;

  const busList = closestFiveVehicles.map((vehicle) => <BusListItem {...vehicle} />);

  return (
    <div className="main-bus">
      Doesn't look like there was an earthquake...it was probably just a bus.
      These vehicles are close by:
      <div className="main-bus-list">
        {busList}
      </div>
      <div className="main-bus-earthquakes-button-block">
        <input className="small-button main-bus-earthquakes-button" type="button"
               value="No, I SWEAR I felt something. Show me what earthquakes you got"
               onClick={getAllEarthquakesData}
        />
      </div>
    </div>
  );
}

BusList.propTypes = {
  closestFiveVehicles: PropTypes.array,
  getAllEarthquakesData: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    closestFiveVehicles: state.closestFiveVehicles,
  };
}

export default connect(mapStateToProps)(BusList);
