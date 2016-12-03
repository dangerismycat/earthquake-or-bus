import React from 'react';
import Spinner from 'react-spinkit';

import '../stylesheets/loading-animation.css';

function LoadingAnimation() {
  return (
    <div className="loader-block">
      <div className="loader-text">
        Getting your location...
      </div>
      <Spinner spinnerName="wandering-cubes" className="loader-animation" />
    </div>
  );
}

export default LoadingAnimation;
