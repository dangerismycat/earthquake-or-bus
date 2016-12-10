import { ACTIONS, LOCATION_ERRORS, VIEW_FLOW } from './constants';
import { isInSF } from './utils/user-location';

const dataURLs = {
  muni: '/api/muni',
  usgs: '/api/usgs',
};


export function updateCurrentView(view) {
  return {
    type: ACTIONS.UPDATE_CURRENT_VIEW,
    view,
  };
}

// TODO: rename this to reflect more generic use
export function updateLocationAttribute(attribute) {
  return {
    type: ACTIONS.UPDATE_LOCATION_ATTRIBUTE,
    attribute,
  };
}

function updateNearbyVehicles(closestFiveVehicles) {
  return {
    type: ACTIONS.UPDATE_NEARBY_VEHICLES,
    closestFiveVehicles,
  };
}

// ASYNC THUNKS
export function getNearbyVehiclesThunk({ lat, long }) {
  return (dispatch) => {
    if (!isInSF({ lat, long })) {
      dispatch(updateLocationAttribute({ locationsError: LOCATION_ERRORS.OUTSIDE_SF }));
      dispatch(updateCurrentView(VIEW_FLOW.LOCATION_WARNING));
      return;
    }

    console.log('fetching...')
    console.log(`Lat: ${lat}, Long: ${long}`);
    fetch(dataURLs.muni, {
      method: 'POST',
      body: JSON.stringify({ lat, long }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json().then((json) => {
      console.log('got some Muni data:', json)
      const { closestFiveVehicles } = json;
      dispatch(updateLocationAttribute({ closestFiveVehicles }));
    })
    .catch((error) => {
      // TODO: better error handling
      console.error(`Error from server: ${error}`);
    }));
  };
}

export function getRecentEarthquakesThunk({ lat, long }) {
  return (dispatch) => {
    // TODO: consolidate this check with other thunk
    if (!isInSF({ lat, long })) {
      dispatch(updateLocationAttribute({ locationsError: LOCATION_ERRORS.OUTSIDE_SF }));
      dispatch(updateCurrentView(VIEW_FLOW.LOCATION_WARNING));
      return;
    }

    fetch(dataURLs.usgs, {
      method: 'POST',
      body: JSON.stringify({ lat, long }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json().then((json) => {
      console.log('got some USGS data:', json)
      const { recentNearbyEarthquakes } = json;
      dispatch(updateLocationAttribute({ recentNearbyEarthquakes }));
    })
    .catch((error) => {
      // TODO: better error handling
      console.error(`Error from server: ${error}`);
    }));
  };
}
