import React from 'react';
import { Element } from 'react-scroll';
import Header from './home/components/Header';
import MapView from './map/components/MapContainer';
import global from './home/css/global.css'; // eslint-disable-line

const App = () => (
  <div>
    <Header />
    <Element id="Map" />
    <MapView />
  </div>
);

export default App;
