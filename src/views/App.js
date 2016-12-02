import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AboutView from './about';
import LoadingAnimationView from './loading-animation';
import LocationWarningView from './location-warning';
import MainContentView from './main-content';

import { LOCATION_ERRORS, VIEW_FLOW } from '../constants';
import {
  updateCurrentView as updateCurrentViewAction,
  updateLocationAttribute as updateLocationAttributeAction,
} from '../action-creators';

import topImage from '../images/earthquakebus.jpg';
import './App.css';


const VIEWS = {
  [VIEW_FLOW.ABOUT]: AboutView,
  [VIEW_FLOW.LOCATION_WARNING]: LocationWarningView,
  [VIEW_FLOW.MAIN_CONTENT]: MainContentView,
};

class AppView extends React.Component {
  componentDidMount() {
    const {
      updateCurrentView,
      updateLocationAttribute,
    } = this.props;

    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateLocationAttribute({ userPosition: position });
          updateCurrentView(VIEW_FLOW.MAIN_CONTENT);
        },
        () => {
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

    const CurrentView = VIEWS[currentView];

    return (
      <div className="App">

        <div className="App-header">
          <img src={topImage} className="App-top-image" alt="Tony Hawk tweet" />
          <div className="App-title-text">Earthquake or Bus?</div>
          <span className="App-header-about" onClick={(e) => this.handleNavClick(e, VIEW_FLOW.ABOUT)}>
            About
          </span>
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
    updateCurrentView: updateCurrentViewAction,
    updateLocationAttribute: updateLocationAttributeAction,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppView);
