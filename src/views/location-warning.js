import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { ERRORS } from '../constants';
import '../stylesheets/location-warning.css';

function LocationWarning(props) {
  const { locationError } = props;

  // if (!locationError) {
  //   return null;
  // }

  let warningText = null;
  const refreshButton = <input type="button" value="Refresh!" onClick={() => window.location.reload(true)} />;

  if (locationError === ERRORS.OUTSIDE_SF) {
    warningText = `
      Hm...it looks like you're trying to use this app from outside San Francisco.
      Unfortunately it's only set up with SF data...sorry about that!
    `;
  } else if (locationError === ERRORS.NO_LOCATION) {
    warningText = `
      Hm...it looks like you don't have location services turned on.
      Unfortunately we need to know where you are to determine what you just felt.
      Please refresh the page and allow location services in order to use this app.
    `;
  } else if (locationError === ERRORS.LOCATION_ERROR) {
    warningText = `
      Hm...it looks like there was an error detecting your location.
      Please refresh and try again!
    `;
  }

  return (
    <div className="location-warning">
      <div className="location-warning-text">
        {warningText}
      </div>
      {locationError !== ERRORS.OUTSIDE_SF ? refreshButton : null}
    </div>
  );
}

LocationWarning.propTypes = {
  locationError: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    locationError: state.locationError,
  };
}

export default connect(mapStateToProps)(LocationWarning);
