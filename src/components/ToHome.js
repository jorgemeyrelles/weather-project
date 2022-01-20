import React, { useContext, useEffect, useState } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import fetchWeather from '../services/getWeather';
import cities from 'cities.json';
import moment from 'moment';
import './weather.css';

// import { Container } from './styles';

function ToHome() {
  const { weather } = useContext(WeatherContext);

  const [value, setValue] = useState([]);
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    async function getWeather() {
      // console.log(weather);
      if (weather === 'rio de janeiro') {
        const wth = await fetchWeather(weather);
        setValue(wth);
        setLoad(true);
      } else if (weather.error) {
        setErr(weather.error.message);
        const index = Math.floor(Math.random() * cities.length);
        const wthErr = await fetchWeather(cities[index].name);
        setValue(wthErr);
        setLoad(true);
      } else {
        console.log(weather);
        const wth = await weather;
        setValue(wth);
        setLoad(true);
      }
      // console.log(wth.current.condition);
    }
    getWeather();
  }, [weather]);

  const card = () => (
    <div style={ { display: 'block' } }>
      { err && <div>
          <div>{err}</div>
          <div>Try again using a city name valid</div>
        </div> }
      <div>
        <h3 className="brand">The Weather</h3>
        <div className="city-time">
          <h2 className="name">{`${value.location.name} - ${value.location.country}`}</h2>
          <div className="time">{moment().format('DD/MM/yyyy - hh:mm A')}</div>
        </div>
      </div>
      <div className="weather">
        <div style={ { display: 'flex', alignItems: 'center' } }>
          <img
            className="icon"
            width="130px"
            height="130px"
            src={value.current.condition.icon}
            alt={`from ${value.location.name}`}
          />
          <div className="condition">{value.current.condition.text}</div>
        </div>
        <div className="details">
          <div className="temp">{`Temperature: ${value.current.temp_c.toFixed(2).replace('.', ',')}°C / ${value.current.temp_f.toFixed(2).replace('.', ',')}°F`}</div>
          <div className="temp">{`Feels Like: ${value.current.feelslike_c.toFixed(2).replace('.', ',')}°C / ${value.current.feelslike_f.toFixed(2).replace('.', ',')}°F`}</div>
        </div>
      </div>
    </div>
  );

  return (load) && card();
}


export default ToHome;
