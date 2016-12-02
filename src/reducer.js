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

const handlers = {
  [ACTIONS.UPDATE_CURRENT_VIEW]: updateCurrentView,
  [ACTIONS.UPDATE_LOCATION_ATTRIBUTE]: updateLocationAttribute,
};

const initialState = {
  currentView: VIEW_FLOW.LOADING_ANIMATION,
  locationError: null,
  userPosition: null,
};

export default createReducer(initialState, handlers);
