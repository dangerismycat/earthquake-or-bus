import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { LOCATION_ERRORS, VIEW_FLOW } from '../constants';
import { updateCurrentView as updateCurrentViewAction } from '../action-creators';

import '../stylesheets/location-warning.css';


export function getWarningText(error) {
  let warningText = `
    That's weird. Some unknown error happened...please refresh and try again!
  `;

  if (error === LOCATION_ERRORS.OUTSIDE_SF) {
    warningText = `
      Hm...it looks like you're trying to use this app from outside San Francisco.
      Unfortunately it only works within SF...sorry about that!
    `;
  } else if (error === LOCATION_ERRORS.NO_LOCATION) {
    warningText = `
      Hm...it looks like you don't have location services turned on, or you're
      on 'http' instead of 'https'. This app needs to know where you are to
      determine what you just felt. Please make sure you're using https,
      refresh the page, and allow location services in order to use this app.
    `;
  } else if (error === LOCATION_ERRORS.LOCATION_ERROR) {
    warningText = `
      Hm...it looks like there was an error detecting your location.
      Please refresh and try again!
    `;
  }

  return warningText;
}

function LocationWarning(props) {
  const { locationError } = props;

  const warningText = getWarningText(locationError);
  const refreshButton = locationError === LOCATION_ERRORS.OUTSIDE_SF ? null : (
    <input className="small-button location-warning-refresh-button" type="button"
           value="Refresh!" onClick={() => window.location.reload(true)} />
  );

  return (
    <div className="location-warning">
      <div className="location-warning-box">
        <div className="location-warning-text">
          {warningText}
        </div>
        {refreshButton}
        <div className="location-demo">
          <input className="small-button location-demo-button" type="button"
                 value="Whatever, just show me a demo"
                 onClick={() => props.updateCurrentView(VIEW_FLOW.DEMO)}
          />
        </div>
      </div>
    </div>
  );
}

LocationWarning.propTypes = {
  locationError: PropTypes.string,
  updateCurrentView: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    locationError: state.locationError,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateCurrentView: updateCurrentViewAction,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationWarning);
