import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { VIEW_FLOW } from '../constants';
import { updateCurrentView as updateCurrentViewAction } from '../action-creators';

import '../stylesheets/header.css';


class Header extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleAboutClick = this.handleNavClick.bind(this, VIEW_FLOW.ABOUT);
    this.handleMainContentClick = this.handleNavClick.bind(this, VIEW_FLOW.MAIN_CONTENT);
  }

  handleNavClick(view) {
    this.props.updateCurrentView(view);
  }

  render() {
    const { currentView } = this.props;

    const navItemText = currentView === VIEW_FLOW.ABOUT ? 'Ok ok, back to it then' : 'About';
    const navItemClickHandler = currentView === VIEW_FLOW.ABOUT ?
      this.handleMainContentClick : this.handleAboutClick;

    return (
      <div className="header">
        <div className="header-title-text">
          <div className="header-title-text-line">Earthquake</div>
          <div className="header-title-text-line">or</div>
          <div className="header-title-text-line">Bus?</div>
        </div>
        <div className="header-subtitle-text">(Did you feel that??)</div>

        <div className="header-nav-items">
          <div className="header-nav-item" onClick={navItemClickHandler}>
            {navItemText}
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  currentView: PropTypes.string,
  // actions
  updateCurrentView: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    currentView: state.currentView,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateCurrentView: updateCurrentViewAction,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
