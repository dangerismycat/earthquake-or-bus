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
  closestFiveVehicles: [],
  currentView: VIEW_FLOW.LOADING_ANIMATION,
  loaded: false,
  locationError: null,
  mainView: null,
  recentNearbyEarthquakes: [],
  userPosition: null,
};

export default createReducer(initialState, handlers);
