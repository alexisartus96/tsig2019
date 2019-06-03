import React from 'react';
import { Element } from 'react-scroll';
import Footer from './home/components/Footer';
import Header from './home/components/Header';
import MapView from './map/components/MapContainer';
import global from './home/css/global.css'; // eslint-disable-line
import BackToTop from './home/components/BackToTop';

const App = () => (
  <div>
    <Header />
    <Element id="Map" />
    <MapView />
  </div>
);

export default App;
