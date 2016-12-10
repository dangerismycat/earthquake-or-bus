import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import '../stylesheets/main-content.css';

function MainContentView(props) {
  if (props.vehicles && props.vehicles.length) {
    console.log('vehicles:', props.vehicles);
  }

  return (
    <div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  );
}

MainContentView.propTypes = {
  vehicles: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    vehicles: state.vehicles,
  };
}

export default connect(mapStateToProps)(MainContentView);
