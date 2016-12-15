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

    Promise.all([
      getData(dataURLs.muni, { lat, long }),
      getData(dataURLs.usgs, { lat, long }),
    ])
    .then((data) => {
      data.forEach((datum) => dispatch(updateAttribute(datum)));
    })
    .then(() => dispatch(updateAttribute({ loaded: true })));
  };
}


// HELPERS

function getData(url, { lat, long }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ lat, long }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json().then((json) => {
    return json;
  })
  .catch((error) => {
    // TODO: better error handling
    console.error(`Error from server: ${error}`);
  }));
}
