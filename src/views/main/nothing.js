import React, { PropTypes } from 'react';

import '../../stylesheets/main-nothing.css';


function Nothing(props) {
  const { getAllEarthquakesData } = props;

  return (
    <div className="main-nothing">
      <div className="main-nothing-text">
        Hm...it doesn't look like there were any earthquakes nearby recently,
        and no busses are close either. Maybe a neighbor dropped something heavy?
      </div>
      <div className="main-nothing-earthquakes-button-block">
        <input className="small-button main-nothing-earthquakes-button" type="button"
               value="No, I SWEAR I felt something. Show me what earthquakes you got"
               onClick={getAllEarthquakesData}
        />
      </div>
    </div>
  );
}

Nothing.propTypes = {
  getAllEarthquakesData: PropTypes.func,
};

export default Nothing;
