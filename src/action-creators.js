import { ACTIONS, LOCATION_ERRORS, VIEW_FLOW } from './constants';
import { isInSF } from './utils/user-location';

const dataURLs = {
  postUserLocation: '/api/muni',
};


export function updateCurrentView(view) {
  return {
    type: ACTIONS.UPDATE_CURRENT_VIEW,
    view,
  };
}

export function updateLocationAttribute(attribute) {
  return {
    type: ACTIONS.UPDATE_LOCATION_ATTRIBUTE,
    attribute,
  };
}

function updateVehicleLocations(locationsArray) {
  return {
    type: ACTIONS.UPDATE_VEHICLE_LOCATIONS,
    locationsArray,
  };
}

// ASYNC THUNKS
export function postUserLocationThunk({ lat, long }) {
  return (dispatch) => {
    if (!isInSF({ lat, long })) {
      dispatch(updateLocationAttribute({ locationsError: LOCATION_ERRORS.OUTSIDE_SF }));
      dispatch(updateCurrentView(VIEW_FLOW.LOCATION_WARNING));
      return;
    }

    console.log('fetching...')
    console.log(`Lat: ${lat}, Long: ${long}`);
    fetch(dataURLs.postUserLocation, {
      method: 'POST',
      body: JSON.stringify({ lat, long }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json().then((json) => {
      console.log('got some data:', json)
      // TODO: check json.currentTime against currentTime for caching
      dispatch(updateVehicleLocations(json.vehicles));
    })
    .catch((error) => {
      // TODO: better error handling
      console.error(`Error from server: ${error}`);
    }));
  };
}
