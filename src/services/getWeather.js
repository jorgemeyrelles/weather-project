const fetchWeather = async (location) => {
  const url = process.env.URL_WEATHER;
  const key = process.env.API_KEY_WEATHER;
  const wth = await fetch(`${url}${key}&q=${location}&aqi=no`)
    .then((response) => response.json());
  return wth;
};

export default fetchWeather;
