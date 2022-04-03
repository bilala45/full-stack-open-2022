import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ capital, latlng }) => {
  const [weather, setWeather] = useState({});
  const cToK = 273.15;

  useEffect(() => {
    // retrieve API key and place in weather URL
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const [lat, lng] = latlng;
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`;

    axios
      .get(weatherURL)
      .then((response) => setWeather(response.data))
      .catch((error) => console.log(error));
  }, []);

  console.log(weather);

  // check if weather variable has a value
  if (Object.values(weather).length) {
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <div>
          {" "}
          temperature: {Math.round((weather.main.temp - cToK) * 100) / 100}{" "}
          Celsius{" "}
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        />
        <div>wind {weather.wind.speed} m/s</div>
      </div>
    );
  }
};

export default Weather;
