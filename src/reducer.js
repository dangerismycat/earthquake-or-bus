import { ACTIONS, VIEW_FLOW } from './constants';

import createReducer from './utils/create-reducer';

function updateCurrentView(state, { view }) {
  return {
    ...state,
    currentView: view,
  };
}

function updateLocationAttribute(state, { attribute }) {
  return {
    ...state,
    ...attribute,
  }
}

function updateNearbyVehicles(state, { closestFiveVehicles }) {
  return {
    ...state,
    closestFiveVehicles,
  };
}



const handlers = {
  [ACTIONS.UPDATE_CURRENT_VIEW]: updateCurrentView,
  [ACTIONS.UPDATE_LOCATION_ATTRIBUTE]: updateLocationAttribute,
  [ACTIONS.UPDATE_VEHICLE_LOCATIONS]: updateNearbyVehicles,
};

const initialState = {
  currentView: VIEW_FLOW.LOADING_ANIMATION,
  locationError: null,
  userPosition: null,
  closestFiveVehicles: [],
  recentNearbyEarthquakes: [],
};

export default createReducer(initialState, handlers);
