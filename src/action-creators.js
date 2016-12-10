import { ACTIONS, LOCATION_ERRORS, VIEW_FLOW } from './constants';
import { isInSF } from './utils/user-location';

const dataURLs = {
  muni: '/api/muni',
  usgs: '/api/usgs',
};

export function updateAttribute(attribute) {
  return {
    type: ACTIONS.UPDATE_ATTRIBUTE,
    payload: attribute,
  };
}

export function updateCurrentView(view) {
  return {
    type: ACTIONS.UPDATE_CURRENT_VIEW,
    view,
  };
}


// ASYNC THUNKS
export function getNearbyDataThunk({ lat, long }) {
  return (dispatch) => {
    if (!isInSF({ lat, long })) {
      dispatch(updateAttribute({ locationsError: LOCATION_ERRORS.OUTSIDE_SF }));
      dispatch(updateCurrentView(VIEW_FLOW.LOCATION_WARNING));
      return;
    }

    console.log('fetching...')
    console.log(`Lat: ${lat}, Long: ${long}`);
    getMuniData({ lat, long }, dispatch);
    getUSGSData({ lat, long }, dispatch);
  };
}


// HELPERS

function getMuniData({ lat, long }, dispatch) {
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
    dispatch(updateAttribute({ closestFiveVehicles }));
  })
  .catch((error) => {
    // TODO: better error handling
    console.error(`Error from server: ${error}`);
  }));
}

function getUSGSData({ lat, long }, dispatch) {
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
    dispatch(updateAttribute({ recentNearbyEarthquakes }));
  })
  .catch((error) => {
    // TODO: better error handling
    console.error(`Error from server: ${error}`);
  }));
}
