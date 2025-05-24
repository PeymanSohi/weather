import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Weather() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async (loc) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?unitGroup=metric&key=${process.env.REACT_APP_WEATHER_API_KEY}&include=hours`
      );
      setWeather(res.data);
    } catch (err) {
      alert('Location not found!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeather(`${latitude},${longitude}`);
    });
  }, []);

  return (
    <div>
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={() => getWeather(location)}>Get Weather</button>

      {loading ? <p>Loading...</p> : weather && (
        <div>
          <h3>Current: {weather.currentConditions.temp}°C</h3>
          <p>Condition: {weather.currentConditions.conditions}</p>
          <p>Wind: {weather.currentConditions.windspeed} km/h</p>
          <p>Chance of Rain: {weather.currentConditions.precipprob}%</p>

          <h4>Hourly Forecast:</h4>
          <ul>
            {weather.days[0].hours.map((hour, idx) => (
              <li key={idx}>
                {hour.datetime} - {hour.temp}°C - {hour.conditions}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Weather;
