import React, { useContext, useEffect, useState } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import fetchWeather from '../services/getWeather';
import cities from 'cities.json';
import './weather.css';

// import { Container } from './styles';

function WeatherPlace() {
  const { setWeather } = useContext(WeatherContext);
  const [allCities, setAllCities] = useState([]);
  const [place, setPlace] = useState('');

  useEffect(() => {
    // console.log(cities);
    cities.map((e) => {
      const all = allCities;
      all.push({ country: e.country, name: e.name });
      return setAllCities(all);
    });
    // console.log(place.length);
  }, []);

  function handleChange({ target: { value, _name } }) {
    setPlace(value);
  }

  async function submitBtn(e) {
    e.preventDefault();
    const data = await fetchWeather(place);
    console.log(data);
    setWeather(data);
  };

  return (
    <main className="panel">
      <form id="locationInput">
        <h3>Type a place</h3>
        <input
          className="search"
          type="text"
          placeholder="Type City and State/district"
          name="place"
          onChange={ handleChange }
        />
        <button
          className="submit"
          type="submit"
          onClick={ (e) => submitBtn(e) }
        >
          <img src="https://icongr.am/octicons/search.svg?size=13&color=#fff" alt="icon search" />
        </button>
      </form>
    </main>
  );
}

export default WeatherPlace;