
## EARTHQUAKE OR BUS?

If you live in San Francisco, especially in an older building, you're probably
felt unidentified shaking before. It's always a mystery: was that an earthquake?
Or did a bus just drive by?

This app gets the user's location data and then fetches local earthquakes from
the USGS and current vehicle positions from Muni. Using a simple, easily-tweakable
algorithm to determine if an earthquake was significant enough to have
been felt by the user, the app then yields a clickable list of possible
earthquakes or a list of nearby busses.


## Technical Bits

This project was bootstrapped with [Create React
App](https://github.com/facebookincubator/create-react-app). That comes with
lovely things like CSS post-processing (to minify and add appropriate vendor
prefixes) and Webpack (for bundling niceties and such).

I added Redux for sane state management, and created a backend using
Node/Express for serving up the static contents and making external API calls.
It's a single-page app that has very minimal user navigation, so I rolled my own
custom router (in `App.js`) rather than add anything heavier. The client is
transpiled using Babel; I didn't bother transpiling the server mostly because
it's fun to remember different ways of writing JS.

Styling is intentially minimal as I'm not a designer.  =)


## Structure

Client lives in `/src`, server lives in `/server`. Entry points are `index.js`
for each, respectively.


## Scripts

In the project directory, you can run:

### `npm start`

Runs the app in production mode.
Note: you MUST run `npm run build` first!
Open [http://localhost:9000](http://localhost:9000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the
best performance.

The build is minified and the filenames include the hashes.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!

For custom config tweaking. This will remove `react-scripts` from the
dependencies and add the various dependencies and scripts it includes.


## TODO
- more tests are always nice
- better error handling
- add support for other cities (anywhere a public transit API is available that
gives current vehicle positions)
- add "demo mode" to spoof locations/earthquakes for demo capabilities
