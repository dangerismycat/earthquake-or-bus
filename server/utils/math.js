// Adapted from Chris Veness' work at http://www.movable-type.co.uk/scripts/latlong.html under MIT license.
// Uses the haversine formula for great-circle distances: https://en.wikipedia.org/wiki/Haversine_formula
// Accepts latLong objects in decimal form. Yields distance in meters.
function distanceBetweenTwoPoints(latLong1, latLong2) {
  if (!latLong1 || !latLong2) {
    throw new Error('Cannot determine distance between a single point');
  }
  if (!latLong1.lat || !latLong1.long || !latLong2.lat || !latLong2.long) {
    throw new Error('LatLong objects in invalid format');
  }


  const { lat: lat1, long: long1 } = latLong1;
  const { lat: lat2, long: long2 } = latLong2;
  // approximate radius of the Earth in meters
  const R = 6371e3;

  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(long2 - long1);

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function convertMetersToFeet(number) {
  if (typeof number !== 'number') {
    throw new Error('Number to convert must be a number');
  }

  return number * 3.280839895;
}

function convertMetersToMiles(number) {
  if (typeof number !== 'number') {
    throw new Error('Number to convert must be a number');
  }

  return number * 0.000621371192;
}

function toDegrees(number) {
  if (typeof number !== 'number') {
    throw new Error('Number to convert must be a number');
  }

  return number * 180 / Math.PI;
}

function toRadians(number) {
  if (typeof number !== 'number') {
    throw new Error('Number to convert must be a number');
  }

  return number * Math.PI / 180;
}

module.exports = {
  convertMetersToFeet,
  convertMetersToMiles,
  distanceBetweenTwoPoints,
};
