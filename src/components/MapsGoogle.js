import React, { useContext, useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import moment from 'moment';
import fetchWeather from '../services/getWeather';
import { WeatherContext } from '../context/WeatherContext';
import Search from './Search';

function MapsGoogle() {
  const { setWeather } = useContext(WeatherContext);

  const containerStyle = {
    position: 'absolute',
    bottom: '10px',
    width: '90%',
    height: '85vh',
    cursor: 'pointer',
  };

  const libraries = ["places"];
  // , loadError
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.API_KEY_MAPS,
    libraries,
  });

  const [map, setMap] = React.useState(null);
  const [marker, setMarker] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((props) => {
      setMarker({
        lat: props.coords.latitude,
        lon: props.coords.longitude,
        timestamp: moment().format('DD/MM/yyyy hh:mm A'),
      });
    });
  }, []);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    // console.log('bounds', bounds, map);
    map.fitBounds(bounds);
    setMap(map)
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, []);

  async function submitBtn(e) {
    console.log('btn', e);
    const data = await fetchWeather(`${e.latLng.lat()},${e.latLng.lng()}`);
    setWeather(data);
    setMarker({
      lat: e.latLng.lat(),
      lon: e.latLng.lng(),
      timestamp: moment().format('DD/MM/yyyy hh:mm A'),
    });
  };

  return isLoaded ? (
    <div>
      <Search marker={ marker } setMarker={ setMarker } />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={ { lat: marker.lat, lng: marker.lon } }
        zoom={6}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={ (e) => submitBtn(e) }
      >
        { marker && <Marker
          key={ marker.timestamp }
          position={ { lat: marker.lat, lng: marker.lon } }
          icon={ {
            url: "https://adroitrobotics.com/wp-content/uploads/2019/10/logo_leafsense.png",
            scaledSize: new window.google.maps.Size(55, 50),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(25, 25),
          } }
        /> }
      </GoogleMap>
    </div>
  ) : <></>
}

export default MapsGoogle;
