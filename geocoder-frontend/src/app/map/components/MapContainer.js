import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import MultiTouch from 'mapbox-gl-multitouch';
import axios from 'axios';
import MapComponent from '../styles/MapComponent';
import trashLogo from '../assets/trash.png';
import InfoComponent from '../styles/InfoComponent';
import BoxComponent from '../styles/BoxComponent';
import BoxTitle from '../styles/BoxTitle';
import SubBoxTitle from '../styles/SubBoxTitle';
import BoxInfo from '../styles/BoxInfo';
import BoxLogo from '../styles/BoxLogo';
import SubBoxLogo from '../styles/SubBoxLogo';
import carton from '../assets/carton.png';
import BoxText from '../styles/BoxText';
import SubBoxText from '../styles/SubBoxText';
import paper from '../assets/paper.png';
import water from '../assets/water.png';
import QuestionTexBox from '../styles/QuestionTextBox';
import Question from '../styles/Question';
import QuestionContent from '../styles/QuestionContent';
import Text from '../styles/Text';
import TextContent from '../styles/TextContent';
import MapViewComponent from '../styles/MapViewComponent';
import ButtonRoute from '../styles/ButtonRoute';
import walking from '../assets/walking.png';
import bicycle from '../assets/bicycle.png';
import car from '../assets/car.png';
import RouteBox from '../styles/RouteBox';
import InfoRoute from '../styles/InfoRoute';
import popup from '../css/popup.css'; // eslint-disable-line
import BoxButton from '../styles/BoxButton';
import ToggleMenu from '../styles/ToggleMenu';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
});

const enableMobileScroll = (map) => {
  if (window.innerWidth <= 425) {
    map.addControl(new MultiTouch());
  }
};

// Used for rendering the trash and user icons (see Layer component below)
const trashIcon = new Image(40, 40);
trashIcon.src = trashLogo;

async function getData() {
  await axios.post(
    process.env.REACT_APP_CORS + process.env.REACT_APP_API_LOGIN,
    { name: 'Abrojo', password: 'password' },
    {
      headers: {
        deviceIdHeader: 'prueba',
        deviceTypeHeader: 'prueba',
        'Content-Type': 'application/json',
      },
    },
  )
    .then((responseLogin) => {
      const { apikey } = responseLogin.headers;
      this.setState({
        apiKey: apikey,
      });
      // Login to user with id 1 in organization with id 1
      axios.post(
        process.env.REACT_APP_CORS + process.env.REACT_APP_API_LOGIN_USER,
        { empty: '' },
        {
          headers: {
            deviceIdHeader: 'prueba',
            deviceTypeHeader: 'prueba',
            'Content-Type': 'application/json',
            ApiKey: this.state.apiKey,
          },
        },
      )
        .catch((error) => {
          console.log('Api Key GET error', this.state.apiKey);
          console.log(error);
          if (error.response) { // If a response has been received from the server
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    })
    .catch((error) => {
      console.log(error);
      if (error.response) { // If a response has been received from the server
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });

  // Fetch container list from backend
  await axios.get(
    process.env.REACT_APP_CORS + process.env.REACT_APP_API_CONTAINERS,
    {
      headers: {
        deviceIdHeader: 'prueba',
        deviceTypeHeader: 'prueba',
        'Content-Type': 'application/json',
        ApiKey: this.state.apiKey,
      },
    },
  )
    .then((res) => {
      this.setState({
        containers: res.data,
      });
    })
    .catch((error) => {
      console.log('Api Key GET error', this.state.apiKey);
      console.log(error);
      if (error.response) { // If a response has been received from the server
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });

  await axios.post(
    process.env.REACT_APP_CORS + process.env.REACT_APP_API_ORGANIZATION_INFO,
    { month: (new Date()).getMonth() + 1 },
    {
      headers: {
        ApiKey: this.state.apiKey,
      },
    },
  )
    .then((res) => {
      this.setState({
        infoContainer: res.data,
      });
    })
    .catch((error) => {
      console.log('Api Key GET error', this.state.apiKey);
      console.log(error);
      if (error.response) { // If a response has been received from the server
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
}

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
    user: [pos.coords.longitude, pos.coords.latitude],
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
      showMenu: true,
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
    this.getData = getData.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.Toggle = Toggle.bind(this);
  }

  componentDidMount() {
    this.getData();
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

  showInfo(id) {
    axios.get(`${process.env.REACT_APP_CORS + process.env.REACT_APP_API_CONTAINERS}/${id}`,
      {
        headers: {
          deviceIdHeader: 'prueba',
          deviceTypeHeader: 'prueba',
          'Content-Type': 'application/json',
          ApiKey: this.state.apiKey,
        },
      }).then((res) => {
      this.setState(
        {
          infoContainer: res.data,
          load: false,
        },
      );
    })
      .catch((error) => {
        console.log(error);
        if (error.response) { // If a response has been received from the server
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  render() {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre',
      'Noviembre', 'Diciembre'];
    const {
      route, distance, duration, selectedRoute,
      geolocation,
      containers,
      infoContainer,
      showPopup, load, selectedId, selectedLat, selectedLon, showMenu, selectedDescription,
    } = this.state;

    return (
      <MapViewComponent>
        <InfoComponent showMenu={showMenu}>
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
            zoom={load ? [13.5] : null}
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
                user: [e.coords.longitude, e.coords.latitude],
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
              { (containers.length > 0)
                ? containers.map(elem => (
                  <Feature
                    key={elem.id}
                    coordinates={[elem.longitude, elem.latitude]}
                    onClick={() => {
                      // Check if current selected container was the last one selected before
                      // In that case, hide the pop up
                      const prevSelectedLat = selectedLat;
                      const prevSelectedLon = selectedLon;
                      this.showInfo(elem.id);
                      if (prevSelectedLon === elem.longitude && prevSelectedLat === elem.latitude) {
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
                        selectedId: elem.id,
                        selectedLon: elem.longitude,
                        selectedLat: elem.latitude,
                        selectedDescription: elem.description,
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
                  <SubBoxText textAlign="center" width="170px">{selectedDescription}</SubBoxText>
                  { (navigator.geolocation)
                    // Only show route buttons and route info
                    // if the device and the browser supports geolocation
                    ? (
                      <RouteBox>
                        <BoxButton>
                          <ButtonRoute
                            img={walking}
                            onClick={() => {
                              this.getRoute(selectedLon, selectedLat, 'walking');
                              this.setState({
                                selectedRoute: 'walking',
                              });
                            }}
                            selected={selectedRoute === 'walking'}
                          />
                          <ButtonRoute
                            img={bicycle}
                            onClick={() => {
                              this.getRoute(selectedLon, selectedLat, 'cycling');
                              this.setState({
                                selectedRoute: 'cycling',
                              });
                            }}
                            selected={selectedRoute === 'cycling'}
                          />
                          <ButtonRoute
                            img={car}
                            onClick={() => {
                              this.getRoute(selectedLon, selectedLat, 'driving');
                              this.setState({
                                selectedRoute: 'driving',
                              });
                            }}
                            selected={selectedRoute === 'driving'}
                          />
                        </BoxButton>
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
