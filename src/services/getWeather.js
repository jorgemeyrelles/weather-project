const fetchWeather = async (location) => {
  const url = process.env.REACT_APP_URL_WEATHER;
  const key = process.env.REACT_APP_API_KEY_WEATHER;
  const wth = await fetch(`${url}${key}&q=${location}&aqi=no`)
    .then((response) => response.json());
  return wth;
};

export default fetchWeather;
