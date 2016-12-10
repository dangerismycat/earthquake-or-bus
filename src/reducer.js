import { ACTIONS, VIEW_FLOW } from './constants';

import createReducer from './utils/create-reducer';


function updateAttribute(state, { payload }) {
  return {
    ...state,
    ...payload,
  }
}

function updateCurrentView(state, { view }) {
  return {
    ...state,
    currentView: view,
  };
}


const handlers = {
  [ACTIONS.UPDATE_ATTRIBUTE]: updateAttribute,
  [ACTIONS.UPDATE_CURRENT_VIEW]: updateCurrentView,
};

const initialState = {
  currentView: VIEW_FLOW.LOADING_ANIMATION,
  locationError: null,
  userPosition: null,
  closestFiveVehicles: [],
  recentNearbyEarthquakes: [],
};

export default createReducer(initialState, handlers);
