import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AboutView from './views/about';
import DemoView from './views/demo';
import HeaderView from './views/header'
import LoadingAnimationView from './views/loading-animation';
import LocationWarningView from './views/location-warning';
import MainNothingView from './views/main/nothing';
import MainEarthquakeView from './views/main/earthquake-list';
import MainBusView from './views/main/bus-list';

import { LOCATION_ERRORS, VIEW_FLOW } from './constants';
import { extractUserLatLong } from './utils/user-location';
import {
  getNearbyDataThunk,
  updateCurrentView as updateCurrentViewAction,
  updateAttribute as updateAttributeAction,
} from './action-creators';

import './stylesheets/App.css';


const VIEWS = {
  [VIEW_FLOW.ABOUT]: AboutView,
  [VIEW_FLOW.DEMO]: DemoView,
  [VIEW_FLOW.LOADING_ANIMATION]: LoadingAnimationView,
  [VIEW_FLOW.LOCATION_WARNING]: LocationWarningView,
  [VIEW_FLOW.MAIN_BUS]: MainBusView,
  [VIEW_FLOW.MAIN_EARTHQUAKE]: MainEarthquakeView,
  [VIEW_FLOW.MAIN_NOTHING]: MainNothingView,
};

class AppView extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.getAllEarthquakesData = this.getAllEarthquakesData.bind(this);
  }

  componentDidMount() {
    this.bootAppData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loaded && nextProps.loaded !== this.props.loaded) {
      if (nextProps.recentNearbyEarthquakes.length > 0) {
        this.setMainView(VIEW_FLOW.MAIN_EARTHQUAKE);
        return;
      } else if (nextProps.closestFiveVehicles.length > 0) {
        this.setMainView(VIEW_FLOW.MAIN_BUS);
        return;
      } else {
        this.setMainView(VIEW_FLOW.MAIN_NOTHING);
      }
    }
  }

  bootAppData() {
    const {
      getNearbyData,
      updateCurrentView,
      updateAttribute,
    } = this.props;

    if (!navigator || !navigator.geolocation) {
      updateAttribute({ locationError: LOCATION_ERRORS.NO_LOCATION});
      updateCurrentView(VIEW_FLOW.LOCATION_WARNING);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPosition = extractUserLatLong(position);
        getNearbyData(userPosition);
        updateAttribute({ userPosition });
      },
      (error) => {
        updateAttribute({ locationError: LOCATION_ERRORS.NO_LOCATION });
        updateCurrentView(VIEW_FLOW.LOCATION_WARNING);
      },
    );
  }

  getAllEarthquakesData() {
    this.props.updateCurrentView(VIEW_FLOW.LOADING_ANIMATION);
    this.props.updateAttribute({ loaded: false });
    this.props.getNearbyData({ ...this.props.userPosition, level: 'LOW'});
  }

  setMainView(view) {
    this.props.updateAttribute({ mainView: view });
    this.props.updateCurrentView(view);
  }

  render() {
    const CurrentView = VIEWS[this.props.currentView];

    return (
      <div className="App">
        <div className="App-header">
          <HeaderView />
        </div>
        <div className="App-content">
          <CurrentView getAllEarthquakesData={this.getAllEarthquakesData} />
        </div>
      </div>
    );
  }
}

AppView.propTypes = {
  closestFiveVehicles: PropTypes.array,
  currentView: PropTypes.string,
  loaded: PropTypes.bool,
  locationError: PropTypes.any,
  recentNearbyEarthquakes: PropTypes.array,
  userPosition: PropTypes.any,
  // actions
  getNearbyData: PropTypes.func,
  updateCurrentView: PropTypes.func,
  updateAttribute: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    closestFiveVehicles: state.closestFiveVehicles,
    currentView: state.currentView,
    loaded: state.loaded,
    locationError: state.locationError,
    recentNearbyEarthquakes: state.recentNearbyEarthquakes,
    userPosition: state.userPosition,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getNearbyData: getNearbyDataThunk,
    updateCurrentView: updateCurrentViewAction,
    updateAttribute: updateAttributeAction,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppView);
