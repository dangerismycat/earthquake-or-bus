// Adapted from Chris Veness' work at http://www.movable-type.co.uk/scripts/latlong.html under MIT license.
// Uses the haversine formula for great-circle distances: https://en.wikipedia.org/wiki/Haversine_formula
// Accepts latLong objects in decimal form. Yields distance in meters.
function distanceBetweenTwoPoints(latLong1, latLong2) {
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

function toDegrees(number) {
  return number * 180 / Math.PI;
}

function toRadians(number) {
  return number * Math.PI / 180;
}

module.exports = {
  distanceBetweenTwoPoints,
};
