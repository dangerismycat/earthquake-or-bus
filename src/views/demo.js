import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map } from 'lodash';

import {
  getNearbyDataThunk,
  updateAttribute as updateAttributeAction,
  updateCurrentView as updateCurrentViewAction,
} from '../action-creators';
import { DEMO_LOCATIONS, VIEW_FLOW } from '../constants';

import '../stylesheets/demo.css';


class Demo extends React.Component {
  handleButtonClick(userPosition) {
    this.props.getNearbyData(userPosition);
    this.props.updateAttribute({ userPosition });
    this.props.updateCurrentView(VIEW_FLOW.LOADING_ANIMATION);
  }

  render() {
    const demoButtons = map(DEMO_LOCATIONS, (location) => (
      <input className="demo-button" type="button"
             value={location.name}
             onClick={() => this.handleButtonClick({ lat: location.lat, long: location.long })}
      />
    ));

    return (
      <div className="demo-block">
        <div className="demo-text">
          Want to see how this works, even if you're not in SF or don't want to use location services?
          Choose one of the following locations:
        </div>
        <div className="demo-button-block">
          {demoButtons}
        </div>
      </div>
    );
  }
}

Demo.propTypes = {
  getNearbyData: PropTypes.func,
  updateAttribute: PropTypes.func,
  updateCurrentView: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getNearbyData: getNearbyDataThunk,
    updateAttribute: updateAttributeAction,
    updateCurrentView: updateCurrentViewAction,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Demo);
