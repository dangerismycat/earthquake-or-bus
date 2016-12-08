import { isObject } from 'lodash';

import { SF_BOUNDARIES } from '../constants';

export function extractUserLatLong(positionObject) {
  if (!positionObject || !isObject(positionObject) || !positionObject.coords) {
    return {};
  }

  return {
    lat: positionObject.coords.latitude,
    long: positionObject.coords.longitude,
  };
}

export function isInSF(userLatLong) {
  if (isInNorthSouthBounds(userLatLong.lat) && isInEastWestBounds(userLatLong.long)) {
    return true;
  }
  return false;
}

function isInNorthSouthBounds(lat) {
  if (lat < SF_BOUNDARIES.NORTH && lat > SF_BOUNDARIES.SOUTH) {
    return true;
  }
  return false;
}

function isInEastWestBounds(long) {
  if (long < SF_BOUNDARIES.EAST && long > SF_BOUNDARIES.WEST) {
    return true;
  }
  return false;
}
