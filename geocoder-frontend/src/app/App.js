import React from 'react';
import { Element } from 'react-scroll';
import MapView from './map/components/MapContainer';

const App = () => (
  <div>
    <Element id="Map" />
    <MapView />
  </div>
);

export default App;
