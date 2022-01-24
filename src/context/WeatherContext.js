import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetchWeather from '../services/getWeather';

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState('rio de janeiro');

  useEffect(() => {
    const getFetch = async () => {
      await navigator.geolocation.getCurrentPosition(async (props) => {
        const wth = await fetchWeather(`${props.coords.latitude},${props.coords.longitude}`);
        setWeather(wth);
      });
    };
    getFetch();
  }, []);

  const value = {
    weather,
    setWeather,
  };

  return (
    <WeatherContext.Provider value={ value }>
      { children }
    </WeatherContext.Provider>
  );
}

WeatherProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
