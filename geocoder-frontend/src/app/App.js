import React from 'react';
import { Element } from 'react-scroll';
import MapContainer from './map/components/MapContainer';

const App = () => (
  <div>
    <Element id="Map" />
    <MapContainer />
  </div>
);

export default App;
