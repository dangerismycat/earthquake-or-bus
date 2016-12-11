import React from 'react';

import aboutImage from '../images/about.jpg';
import moreYouKnowImage from '../images/themoreyouknow.gif';

import '../stylesheets/about.css';

const githubURL = 'https://github.com/dangerismycat/earthquake-or-bus';
const montyPythonURL = 'https://www.youtube.com/watch?v=PF9FECorcZ0';

function About() {
  return (
    <div className="about-block">
      <div className="about-title">
        Right, what's all this about, then?
      </div>

      <a href={montyPythonURL} target="_blank" rel="noopener noreferrer">
        <img className="about-image" src={aboutImage} alt="Monty Python quote" />
      </a>

      <div className="about-text">
        If you live in San Francisco, especially in an older building,
        you're probably felt unidentified shaking before. It's always a mystery:
        was that an earthquake? Or did a bus just drive by?
      </div>

      <div className="about-more-you-know-block">
        <div className="about-more-you-know-text">
          NOW YOU KNOW!
        </div>
        <img className="about-more-you-know" src={moreYouKnowImage} alt="The More You Know" />
      </div>

      <div className="about-author">
        Check this out on <a href={githubURL} target="_blank" rel="noopener noreferrer">Github</a> if you dare!
      </div>
    </div>
  );
}

export default About;
