import React from 'react';
import { Element } from 'react-scroll';
import MapContainer from './map/components/MapContainer';
import global from './map/css/global.css'; // eslint-disable-line

const App = () => (
  <div>
    <Element id="Map" />
    <MapContainer />
  </div>
);

export default App;
