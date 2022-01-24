import React from 'react';
// import { WeatherContext } from '../context/WeatherContext';
// import fetchWeather from '../services/getWeather';
import MapsGoogle from './MapsGoogle';
import './weather.css';

// import { Container } from './styles';

function WeatherPlace() {
  return (
    <main className="panel">
      <MapsGoogle />
    </main>
  );
}

export default WeatherPlace;
