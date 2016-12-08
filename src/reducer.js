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

function updateVehicleLocations(state, { locationsArray }) {
  return {
    ...state,
    vehicles: locationsArray,
  };
}



const handlers = {
  [ACTIONS.UPDATE_CURRENT_VIEW]: updateCurrentView,
  [ACTIONS.UPDATE_LOCATION_ATTRIBUTE]: updateLocationAttribute,
  [ACTIONS.UPDATE_VEHICLE_LOCATIONS]: updateVehicleLocations,
};

const initialState = {
  currentView: VIEW_FLOW.LOADING_ANIMATION,
  locationError: null,
  userPosition: null,
  vehicles: [],
};

export default createReducer(initialState, handlers);
