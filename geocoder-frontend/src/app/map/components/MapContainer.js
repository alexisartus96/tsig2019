import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import MultiTouch from 'mapbox-gl-multitouch';
import trashLogo from '../assets/pin.png';
import MapComponent from '../styles/MapComponent';
import InfoComponent from '../styles/InfoComponent';
import {ListItem, PointData} from '../styles/ListItem';
import SubBoxText from '../styles/SubBoxText';
import MapViewComponent from '../styles/MapViewComponent';
import RouteBox from '../styles/RouteBox';
import InfoRoute from '../styles/InfoRoute';
import ToggleMenu from '../styles/ToggleMenu';
import {InputName, InputNumber, SearchNav, SearchButton, SearchNavSubBox} from '../styles/SearchNav';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
});

const enableMobileScroll = (map) => {
  if (window.innerWidth <= 425) {
    map.addControl(new MultiTouch());
  }
};

// Used for rendering the trash and user icons (see Layer component below)
const trashIcon = new Image(20, 20);
trashIcon.src = trashLogo;

function clearRouteInfo() {
  this.setState({
    route: null,
    distance: null,
    duration: null,
    selectedRoute: null,
  });
}

// Set user coordinates taken from Geolocation API.
// This function is triggered when Geolocation is succesfull
function success(pos) {
  this.setState({
    user: [pos.coords.longitud, pos.coords.latitud],
  });
}

function Toggle() {
  this.setState(
    {
      showMenu: !this.state.showMenu,
    },
  );
}

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      route: null, // The route to the selected container
      distance: 0, // Distance (in meters) to selected container
      duration: 0, // Estimated time to selected container
      selectedRoute: '',
      geolocation: new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
          timeout: 6000,
        },
        fitBoundsOptions: { maxZoom: 13.5 },
        trackUserLocation: true,
      }),
      geolocationEnabled: false,
      // Store containers list from backend. Each container has "id", "lat" and "lng"
      containers: [],
      selectedId: 0,
      load: true,
      selectedLon: 0,
      selectedLat: 0,
      showPopup: false,
      infoContainer: '',
      apiKey: '',
      selectedDescription: '',
      selectedNumber: 0,
      showMenu: true
    };
    const { geolocation } = this.state;

    // Set geolocationEnabled state to false when geolocation finishes
    geolocation.on('trackuserlocationend', () => {
      this.setState({
        geolocationEnabled: false,
      });
    });

    // Check if geolocation is available in this device and browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success.bind(this));
      this.getRoute = this.getRoute.bind(this);
      this.clearRouteInfo = clearRouteInfo.bind(this);
    }
    this.Toggle = Toggle.bind(this);
  }

  componentDidMount() {
  }

  // lan and lat are longitude and latitude of destination
  // type can only be 'walking', 'driving' or 'cycling'
  getRoute(lng, lat, type) {
    // Update user current location
    const { geolocation, geolocationEnabled } = this.state;
    // Check if geolocation is available in this device and browser
    if (navigator.geolocation) {
      // If geolocation button isn't currently activated
      if (!geolocationEnabled) {
        geolocation.trigger();
        this.setState({
          geolocationEnabled: true,
        });
        navigator.geolocation.getCurrentPosition(success.bind(this));
      }
      const { user } = this.state;
      const start = user;
      const end = [lng, lat];
      const apiCall = `${process.env.REACT_APP_MAPBOX_DIRECTIONS}mapbox/${type}/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;
      fetch(apiCall)
        .then(result => result.json())
        .then((data) => {
          if (data.routes) { // Only attempt to set route state if Mapbox API sent a response
            this.setState({
              route: data.routes[0].geometry.coordinates,
              distance: data.routes[0].distance,
              duration: data.routes[0].duration,
            });
          }
        });
    }
  }

  handleChangeName(event) {
    this.setState({streetName: event.target.value});
  }

  handleChangeNumber(event) {
    this.setState({streetNumber: event.target.value});
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.searchStreet();
    }
  }

  searchStreet() {
    const name = this.state.streetName;
    const number = this.state.streetNumber;
    const data = `<?xml version="1.0" encoding="UTF-8"?>
      <wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
        <ows:Identifier>gs:TSIGEGeocoder</ows:Identifier>
        <wps:DataInputs>
          <wps:Input>
            <ows:Identifier>calle</ows:Identifier>
           <wps:Data>
              <wps:LiteralData>${name}</wps:LiteralData>
            </wps:Data>
          </wps:Input>
          <wps:Input>
            <ows:Identifier>numero</ows:Identifier>
            <wps:Data>
              <wps:LiteralData>${number}</wps:LiteralData>
            </wps:Data>
          </wps:Input>
        </wps:DataInputs>
        <wps:ResponseForm>
          <wps:RawDataOutput mimeType="application/gml-3.1.1">
            <ows:Identifier>result</ows:Identifier>
          </wps:RawDataOutput>
        </wps:ResponseForm>
      </wps:Execute>`;
    const port = '8081';
    const url = `http://localhost:${port}/geoserver/ows?service=WPS&version=1.0.0&request=Execute`;
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'text/plain; charset=UTF-8'
      },
      body: data
    };
    fetch(url, options)
      .then(response => response.text())
      .catch(err => console.error('Error', err))
      .then(resp => {
        console.log(JSON.parse(resp)); // TODO: REMOVE THIS LINE.
        this.setState({containers: JSON.parse(resp)});
      });
  }

  render() {
    const {
      route, distance, duration, selectedRoute,
      geolocation,
      containers, 
      showPopup, load, selectedId, selectedLat, selectedLon, showMenu, selectedDescription, selectedNumber
    } = this.state;

    return (
      <MapViewComponent>
        <SearchNav>
          <SearchNavSubBox>
            <InputName
              type="text"
              placeholder="Street Name"
              onChange={(event) => this.handleChangeName(event)}
              onKeyDown={(event) => this.handleKeyDown(event)}
            />
            <InputNumber
              type="text"
              placeholder="Street Number"
              onChange={(event) => this.handleChangeNumber(event)}
              onKeyDown={(event) => this.handleKeyDown(event)}
            />
            <SearchButton onClick={this.searchStreet}>Search</SearchButton>
          </SearchNavSubBox>
        </SearchNav>
        <InfoComponent showMenu={showMenu}>
        { (containers && containers.length > 0)
                ? containers.map(elem => (
                  <ListItem key={elem.codigo_via} onClick={() => {
                    // Check if current selected container was the last one selected before
                    // In that case, hide the pop up
                    const prevSelectedLat = selectedLat;
                    const prevSelectedLon = selectedLon;
                    if (prevSelectedLon === elem.longitud && prevSelectedLat === elem.latitud) {
                      this.setState({
                        showPopup: !showPopup,
                      });
                    } else {
                      this.clearRouteInfo();
                      this.setState({
                        showPopup: true,
                      });
                    }
                    this.setState({
                      selectedId: elem.codigo_via,
                      selectedLon: elem.longitud,
                      selectedLat: elem.latitud,
                      selectedDescription: elem.nombre_via,
                      selectedNumber: elem.puerta
                    });
                  }}>
                    <PointData>{`${elem.nombre_via} - ${elem.puerta}`}</PointData>
                  </ListItem>))
                : null}
        </InfoComponent>
        <ToggleMenu moveLeft={showMenu} onClick={this.Toggle} />
        <MapComponent>
          <Map
            // style prop is required by React Mapbox
            style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line react/style-prop-object
            containerStyle={{
              height: '100%',
              width: '100%',
            }}
            center={load ? [-56.165293, -34.919999] : null}
            zoom={load ? [10.5] : null}
            onStyleLoad={
          (map) => {
            // Add button to detect user's current location
            map.addControl(geolocation);
            // Fly to user position and update user state when geolocation is triggered
            geolocation.on('geolocate', (e) => {
              map.flyTo({
                center: [this.state.selectedLon, this.state.selectedLat],
                zoom: 13.5,
              });
              this.setState({
                user: [e.coords.longitud, e.coords.latitud],
              });
            });
            geolocation.on('trackuserlocationstart', () => {
              map.flyTo({
                center: [this.state.selectedLon, this.state.selectedLat],
                zoom: 13.5,
              });
            });
            map.addControl(new mapboxgl.NavigationControl());
            enableMobileScroll(map);
            map.addControl(new mapboxgl.FullscreenControl());
            map.addControl(new mapboxgl.ScaleControl());

            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', 'trashes', () => {
              map.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'trashes', () => {
              map.getCanvas().style.cursor = '';
            });

            map.on('MapTouchEvent', () => {
              console.log(
                  "algo"
              )
            })
          }
        }
          >
            { route && (
              <Layer // Layer with the route
                type="line"
                id="route"
                layout={{ 'line-cap': 'round', 'line-join': 'round' }}
                paint={{ 'line-color': '#4790E5', 'line-width': 8 }}
              >
                <Feature coordinates={route} />
              </Layer>
            ) }
            <Layer
              // Layer with trashes
              type="symbol"
              id="trashes"
              layout={{ 'icon-image': 'trash', 'icon-allow-overlap': true }}
              images={['trash', trashIcon]}
            >
              {/* Add containers from state */}
              { (containers && containers.length > 0)
                ? containers.map(elem => (
                  <Feature
                    key={elem.codigo_via}
                    coordinates={[elem.longitud, elem.latitud]}
                    onClick={() => {
                      // Check if current selected container was the last one selected before
                      // In that case, hide the pop up
                      const prevSelectedLat = selectedLat;
                      const prevSelectedLon = selectedLon;
                      if (prevSelectedLon === elem.longitud && prevSelectedLat === elem.latitud) {
                        this.setState({
                          showPopup: !showPopup,
                        });
                      } else {
                        this.clearRouteInfo();
                        this.setState({
                          showPopup: true,
                        });
                      }
                      this.setState({
                        selectedId: elem.codigo_via,
                        selectedLon: elem.longitud,
                        selectedLat: elem.latitud,
                        selectedDescription: elem.nombre_via,
                        selectedNumber: elem.puerta
                      });
                    }}
                  />))
                : null}
            </Layer>
            { (containers.length > 0 && selectedId !== 0 && showPopup)
              ? (
                <Popup
                  key={selectedId}
                  coordinates={[selectedLon, selectedLat]}
                  className="popup"
                >
                  <SubBoxText textAlign="center" width="170px">{`${selectedDescription} - ${selectedNumber}`}</SubBoxText>
                  { (navigator.geolocation)
                    // Only show route buttons and route info
                    // if the device and the browser supports geolocation
                    ? (
                      <RouteBox>
                        { route && (
                          // Render distance and estimated time converted to km and min
                          // and rounded to one decimal
                          <InfoRoute>
                            { `${Math.round(distance / 100) / 10} km` }
                            { '\xa0\xa0\xa0\xa0' }
                            { `${Math.round(duration / 6) / 10} min` }
                          </InfoRoute>) }
                      </RouteBox>
                    )
                    : null}
                </Popup>
              ) : null}
          </Map>
        </MapComponent>
      </MapViewComponent>
    );
  }
}

export default MapContainer;
