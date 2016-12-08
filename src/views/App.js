import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AboutView from './about';
import LoadingAnimationView from './loading-animation';
import LocationWarningView from './location-warning';
import MainContentView from './main-content';

import { LOCATION_ERRORS, VIEW_FLOW } from '../constants';
import { extractUserLatLong } from '../utils/user-location';
import {
  postUserLocationThunk,
  updateCurrentView as updateCurrentViewAction,
  updateLocationAttribute as updateLocationAttributeAction,
} from '../action-creators';

import topImage from '../images/earthquakebus.jpg';
import '../stylesheets/App.css';


const VIEWS = {
  [VIEW_FLOW.ABOUT]: AboutView,
  [VIEW_FLOW.LOCATION_WARNING]: LocationWarningView,
  [VIEW_FLOW.MAIN_CONTENT]: MainContentView,
};

class AppView extends React.Component {
  componentDidMount() {
    const {
      postUserLocation,
      updateCurrentView,
      updateLocationAttribute,
    } = this.props;

    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPosition = extractUserLatLong(position);
          postUserLocation(userPosition);
          updateLocationAttribute({ userPosition });
          updateCurrentView(VIEW_FLOW.MAIN_CONTENT);
        },
        (error) => {
          updateLocationAttribute({ locationError: LOCATION_ERRORS.NO_LOCATION });
          updateCurrentView(VIEW_FLOW.LOCATION_WARNING);
        },
      );
    } else {
      updateLocationAttribute({ locationError: LOCATION_ERRORS.NO_LOCATION});
      updateCurrentView(VIEW_FLOW.LOCATION_WARNING);
    }
  }

  handleNavClick(e, view) {
    e.stopPropagation();

    this.props.updateCurrentView(view);
  }

  render() {
    const {
      currentView,
    } = this.props;

    if (currentView === VIEW_FLOW.LOADING_ANIMATION) {
      return (
        <div className="App App-loader">
          <LoadingAnimationView />
        </div>
      );
    }

    let navItemText = 'About';
    let navItemClickHandler = (e) => this.handleNavClick(e, VIEW_FLOW.ABOUT);

    if (currentView === VIEW_FLOW.ABOUT) {
      navItemText = 'Ok ok, back to it then';
      navItemClickHandler = (e) => this.handleNavClick(e, VIEW_FLOW.MAIN_CONTENT);
    }


    const CurrentView = VIEWS[currentView];

    return (
      <div className="App">

        <div className="App-header">
          <div className="App-title-text">Earthquake or Bus?</div>
          <div className="App-subtitle-text">(Did you feel that??)</div>
          <img src={topImage} className="App-top-image" alt="Tony Hawk tweet" />

          <div className="App-nav-items">
            <div className="App-nav-item" onClick={navItemClickHandler}>
              {navItemText}
            </div>
          </div>
        </div>

        <div className="App-content">
          <CurrentView />
        </div>

      </div>
    );
  }
}

AppView.propTypes = {
  currentView: PropTypes.string,
  locationError: PropTypes.any,
  userPosition: PropTypes.any,
  // actions
  postUserLocation: PropTypes.func,
  updateCurrentView: PropTypes.func,
  updateLocationAttribute: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    currentView: state.currentView,
    locationError: state.locationError,
    userPosition: state.userPosition,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postUserLocation: postUserLocationThunk,
    updateCurrentView: updateCurrentViewAction,
    updateLocationAttribute: updateLocationAttributeAction,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppView);
