const fetchWeather = async (location) => {
  const url = 'http://api.weatherapi.com/v1/current.json?key=';
  const key = process.env.API_KEY_WEATHER || '47c4f19258244008ac6141552221901';
  const wth = await fetch(`${url}${key}&q=${location}&aqi=no`)
    .then((response) => response.json());
  return wth;
};

export default fetchWeather;
