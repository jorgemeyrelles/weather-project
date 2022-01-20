import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState('rio de janeiro');

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
