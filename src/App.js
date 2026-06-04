import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    const apiKey = "Your_API_Key";

    try {
      // Step 1: Get coordinates from village/city name
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
      );

      const geoData = await geoRes.json();

      if (geoData.length === 0) {
        setError("Location not found");
        setData(null);
        return;
      }

      const lat = geoData[0].lat;
      const lon = geoData[0].lon;

      // Step 2: Get weather using coordinates
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );

      const weatherData = await weatherRes.json();

      setData(weatherData);
      setError("");
    } catch (err) {
      setError("Something went wrong");
      setData(null);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Weather App 🌦️</h1>

      <input
        placeholder="Enter city or village"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather}>Search</button>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Weather Data */}
      {data && data.main && (
        <div>
          <h2>{data.name}</h2>
          <p style={{ color: "gray" }}>
            (Nearest available location)
            </p>
            <h3>{data.main.temp}°C</h3>
            <p>{data.weather[0].description}</p>
            </div>
          )}
          </div>
          );
        }
         export default App;
