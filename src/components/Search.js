import React, { useContext } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import { WeatherContext } from '../context/WeatherContext';
import moment from 'moment';
import fetchWeather from '../services/getWeather';

function Search(props) {
  const { setWeather } = useContext(WeatherContext);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => props.marker.lat, lng: () => props.marker.lon },
      radius: 200 * 1000,
    },
  });

  const handleInput = async (e) => {
    setValue(e.target.value);
    // const data = await fetchWeather(e.target.value);
    // setWeather(data);
  };

  const handleSelect = async (val) => {
    clearSuggestions();
    try {
      const results = await getGeocode({ address: val });
      const { lat, lng } = await getLatLng(results[0]);
      const data = await fetchWeather(`${lat},${lng}`);
      setWeather(data);
      props.setMarker({ lat, lon: lng, timestamp: moment().format('DD/MM/yyyy hh:mm A') });
    } catch (error) {
      console.error(error);
    }
    // console.log(val);
    setValue('', false);
  };

  return (
    <div className="search">
      <Combobox onSelect={ handleSelect } aria-labelledby="demo">
        <ComboboxInput
          value={ value }
          onChange={ handleInput }
          disabled={ !ready }
          placeholder="Type an address / direction"
          style={ { background: 'none', border: 'none', color: 'white', width: '100%' } }
        />
        <ComboboxPopover>
          <ComboboxList>
            { status === "OK" &&
              data.map(({ place_id, description, terms }) => (
                <ComboboxOption key={place_id} value={description} />
              )) }
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default Search;
