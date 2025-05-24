import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Weather() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeather = async (loc) => {
    if (!loc) return;

    try {
      setLoading(true);
      setError('');
      console.log('🔍 Fetching weather for:', loc);
      console.log('🔐 API Key:', process.env.REACT_APP_WEATHER_API_KEY);

      const res = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
          loc
        )}?unitGroup=metric&key=${process.env.REACT_APP_WEATHER_API_KEY}&include=hours`
      );

      console.log('✅ Full API response:', res.data);
      if (!res.data || !res.data.currentConditions) {
        throw new Error('Invalid API response structure.');
      }

      setWeather(res.data);
    } catch (err) {
      console.error('❌ Error fetching weather:', err.message);
      setError('Could not fetch weather. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // Optional: load current location on mount
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeather(`${latitude},${longitude}`);
      },
      (err) => {
        console.warn('⚠️ Geolocation denied:', err.message);
      }
    );
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={() => getWeather(location)}>Get Weather</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather?.currentConditions && (
        <div>
          <h3>Current: {weather.currentConditions.temp}°C</h3>
          <p>Condition: {weather.currentConditions.conditions}</p>
          <p>Wind: {weather.currentConditions.windspeed} km/h</p>
          <p>Chance of Rain: {weather.currentConditions.precipprob}%</p>

          {weather.days?.[0]?.hours && (
            <>
              <h4>Hourly Forecast:</h4>
              <ul>
                {weather.days[0].hours.map((hour, idx) => (
                  <li key={idx}>
                    {hour.datetime} – {hour.temp}°C – {hour.conditions}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Weather;
