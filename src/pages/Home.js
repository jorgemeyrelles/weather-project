import React, { useContext, useEffect, useState } from 'react';
import ToHome from '../components/ToHome';
import WeatherPlace from '../components/WeatherPlace';
import '../components/weather.css';
import { WeatherContext } from '../context/WeatherContext';

// import { Container } from './styles';

function Home() {
  const { weather } = useContext(WeatherContext);
  const [back, setBack] = useState('');
  useEffect(() => {
    console.log('home', weather);
    if (weather !== undefined && weather !== 'rio de janeiro' && weather.current.condition.text === 'Sunny') {
      setBack('https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
    } else if (weather !== undefined
        && weather !== 'rio de janeiro'
        && ((weather.current.condition.text.split(' ')).findIndex((e) => e.toLowerCase() === 'rain') !== -1)) {
      setBack('https://images.pexels.com/photos/763398/pexels-photo-763398.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
    } else if (weather !== undefined && weather !== 'rio de janeiro'
        && ((weather.current.condition.text.split(' ')).findIndex((e) => e.toLowerCase() === 'overcast') !== -1)) {
      setBack('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi2-prod.bathchronicle.co.uk%2Fincoming%2Farticle56843.ece%2FALTERNATES%2Fs615%2FOvercast-weather.jpg&f=1&nofb=1');
    } else if (weather !== undefined
        && weather !== 'rio de janeiro'
        && ((weather.current.condition.text.split(' ')).findIndex((e) => e.toLowerCase() === 'cloudy') !== -1)) {
      setBack('https://images.pexels.com/photos/3227984/pexels-photo-3227984.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
    } else if (weather !== undefined
        && weather !== 'rio de janeiro'
        && ((weather.current.condition.text.split(' ')).findIndex((e) => e.toLowerCase() === 'snow') !== -1)) {
      setBack('https://images.pexels.com/photos/3887962/pexels-photo-3887962.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
    } else {
      setBack('https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
    }
  }, [weather]);

  const styleBack = {
    backgroundImage: `url(${back})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div style={ styleBack } className="weather-app">
      <div className="container">
        <WeatherPlace />
        <ToHome />
      </div>
    </div>
  );
}

export default Home;