import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import MultiTouch from 'mapbox-gl-multitouch';
import PinImage from '../assets/pin.png';
import MapComponent from '../styles/MapComponent';
import InfoComponent from '../styles/InfoComponent';
import {ListItem, PointData} from '../styles/ListItem';
import SubBoxText from '../styles/SubBoxText';
import MapViewComponent from '../styles/MapViewComponent';
import ToggleMenu from '../styles/ToggleMenu';
import { InputName, InputNumber, InputRadioButton, LabelRadioButton, SearchButton, SearchNav, SearchNavSubBox, InputGroup } from '../styles/SearchNav';
import { XMLGeocoder, XMLGeocoderCruce, XMLGeocoderInversa } from '../../utils/xml';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
});

const enableMobileScroll = (map) => {
  if (window.innerWidth <= 425) {
    map.addControl(new MultiTouch());
  }
};

// Used for rendering the pin icon (see Layer component below)
const pinIcon = new Image(20, 20);
pinIcon.src = PinImage;

// Set user coordinates taken from Geolocation API.
// This function is triggered when Geolocation is succesfull
function success(pos) {
  this.setState({
    user: [pos.coords.longitud, pos.coords.latitud],
  });
}

function Toggle() {
  this.setState({
    showMenu: !this.state.showMenu,
  });
}

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: '',
      locations: [], // Store locations list from backend. Each location has "id", "lat" and "lng"
      geolocation: new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
          timeout: 6000,
        },
        fitBoundsOptions: { maxZoom: 13.5 },
        trackUserLocation: true,
      }),
      geolocationEnabled: false,
      infoLocation: '',
      load: true,
      searchType: 'calle-numero',
      selectedDescription: '',
      selectedId: 0,
      selectedLat: 0,
      selectedLon: 0,
      selectedNumber: 0,
      showMenu: true,
      showPopup: false,
      user: []
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
    }
    this.Toggle = Toggle.bind(this);
  }

  componentDidMount = () => {
  }

  handleChangeSearchType = (e) => {
    const searchType = e.target.value;
    this.setState({ searchType }, () => {
      const input1 = document.getElementById('input1');
      const input2 = document.getElementById('input2');
      // Enable inputs
      input1.disabled = false;
      input2.disabled = false;
      // Clean inputs
      input1.value = '';
      input2.value = '';

      if (searchType === 'calle-numero') {
        input1.placeholder = 'Street Name';
        input2.placeholder = 'Street Number';

      } else if (searchType === 'esquina') {
        input1.placeholder = 'Street Name';
        input2.placeholder = 'Street Name';

      } else if (searchType === 'inversa') {
        input1.placeholder = 'Lat';
        input2.placeholder = 'Lon';
        // Disable inputs
        input1.disabled = true;
        input2.disabled = true;
      }
    });
  }

  handleChangeName = (e) => {
    this.setState({streetName: e.target.value});
  }

  handleChangeNumber = (e) => {
    this.setState({streetNumber: e.target.value});
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.searchStreet();
    }
  }

  searchStreet = () => {
    // TODO: Improve this
    let searchType = 'calle-numero'
    document.querySelectorAll('[name=searchType]').forEach((elem) => {
      if (elem.checked) {
        searchType = elem.value
      }
    });
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    let data = '';
    if (searchType === 'calle-numero') {
      data = XMLGeocoder(input1.value, input2.value);
    } else if (searchType === 'esquina') {
      data = XMLGeocoderCruce(input1.value, input2.value);
    } else if (searchType === 'inversa') {
      data = XMLGeocoderInversa(input1.value, input2.value);
    }

    const port = '8082';
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
        // Return unique items
        const respWithoutDuplicated = Object.values(
          JSON.parse(resp).reduce((a, b) => {
            a[b.codigo_via] = b;
            return a
          }, {})
        )
        console.log(respWithoutDuplicated); // TODO: REMOVE THIS LINE.
        this.setState({
          showPopup: false,  // "clean" previous search
          locations: respWithoutDuplicated
        });
      });
  }

  radioButtonIsChecked = (searchType) => (this.state.searchType === searchType);

  render = () => {
    const {
      geolocation,
      locations,
      showPopup, load, selectedId, selectedLat, selectedLon, showMenu, selectedDescription, selectedNumber
    } = this.state;

    return (
      <MapViewComponent>
        <SearchNav>
          <SearchNavSubBox>
            <InputGroup>
              <LabelRadioButton>
                <InputRadioButton
                  type="radio"
                  value="calle-numero"
                  name="searchType"
                  checked={this.radioButtonIsChecked('calle-numero')}
                  onChange={this.handleChangeSearchType}
                />
                  Calle y Número
              </LabelRadioButton>
              <LabelRadioButton>
                <InputRadioButton
                  type="radio"
                  value="esquina"
                  name="searchType"
                  checked={this.radioButtonIsChecked('esquina')}
                  onChange={this.handleChangeSearchType}
                />
                  Esquina
              </LabelRadioButton>
              <LabelRadioButton>
                <InputRadioButton
                  type="radio"
                  value="inversa"
                  name="searchType"
                  checked={this.radioButtonIsChecked('inversa')}
                  onChange={this.handleChangeSearchType}
                />
                  Inversa
              </LabelRadioButton>
            </InputGroup>
            <InputGroup>
              <InputName
                type="text"
                id="input1"
                placeholder="Street Name"
                onChange={(event) => this.handleChangeName(event)}
                onKeyDown={(event) => this.handleKeyDown(event)}
              />
              <InputNumber
                type="text"
                id="input2"
                placeholder="Street Number"
                onChange={(event) => this.handleChangeNumber(event)}
                onKeyDown={(event) => this.handleKeyDown(event)}
              />
              <SearchButton onClick={this.searchStreet}>Search</SearchButton>
            </InputGroup>
          </SearchNavSubBox>
        </SearchNav>
        <InfoComponent showMenu={showMenu}>
        { (locations && locations.length > 0)
                ? locations.map(elem => (
                  <ListItem key={elem.codigo_via} onClick={() => {
                    // Check if current selected location was the last one selected before
                    // In that case, hide the pop up
                    const prevSelectedLat = selectedLat;
                    const prevSelectedLon = selectedLon;
                    if (prevSelectedLon === elem.longitud && prevSelectedLat === elem.latitud) {
                      this.setState({
                        showPopup: !showPopup,
                      });
                    } else {
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
            map.on('mouseenter', 'locations', () => {
              map.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'locations', () => {
              map.getCanvas().style.cursor = '';
            });

            map.on('click', (e) => {
              if (this.state.searchType === 'inversa') {
                // Set latitude and longitude to the inputs
                const input1 = document.getElementById('input1');
                const input2 = document.getElementById('input2');
                input1.value = e.lngLat.lat;
                input2.value = e.lngLat.lng;
              }
            });
          }
        }
          >
            <Layer
              // Layer with locations
              type="symbol"
              id="locations"
              layout={{ 'icon-image': 'pin', 'icon-allow-overlap': true }}
              images={['pin', pinIcon]}
            >
              {/* Add locations from state */}
              { (locations && locations.length > 0)
                ? locations.map(elem => (
                  <Feature
                    key={elem.codigo_via}
                    coordinates={[elem.longitud, elem.latitud]}
                    onClick={() => {
                      // Check if current selected location was the last one selected before
                      // In that case, hide the pop up
                      const prevSelectedLat = selectedLat;
                      const prevSelectedLon = selectedLon;
                      if (prevSelectedLon === elem.longitud && prevSelectedLat === elem.latitud) {
                        this.setState({
                          showPopup: !showPopup,
                        });
                      } else {
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
            { (locations.length > 0 && selectedId !== 0 && showPopup)
              ? (
                <Popup
                  key={selectedId}
                  coordinates={[selectedLon, selectedLat]}
                  className="popup"
                >
                  <SubBoxText textAlign="center" width="170px">{`${selectedDescription} - ${selectedNumber}`}</SubBoxText>
                </Popup>
              ) : null}
          </Map>
        </MapComponent>
      </MapViewComponent>
    );
  }
}

export default MapContainer;
