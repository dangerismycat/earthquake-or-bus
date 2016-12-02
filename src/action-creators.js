import { ACTIONS } from './constants';

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
