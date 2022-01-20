import React from 'react';
import ToHome from '../components/ToHome';
import WeatherPlace from '../components/WeatherPlace';
import '../components/weather.css';

// import { Container } from './styles';

function Home() {
  return (
    <div className="weather-app">
      <div className="container">
        <WeatherPlace />
        <ToHome />
      </div>
    </div>
  );
}

export default Home;