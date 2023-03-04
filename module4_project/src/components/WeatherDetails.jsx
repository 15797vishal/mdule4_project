
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCelsius, setFahrenheit } from "./store/actions";

function WeatherDetails() {
  
  const { city } = useParams();
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const temperatureUnit = useSelector((state) => state.temperatureUnit);
  const dispatch = useDispatch();

  const handleCheckboxChange = (event) => {
    const isCelsiusChecked =
      event.target.name === "Celsius" && event.target.checked;
    const isFahrenheitChecked =
      event.target.name === "Fahrenheit" && event.target.checked;

    if (isCelsiusChecked) {
      dispatch(setCelsius());
    }

    if (isFahrenheitChecked) {
      dispatch(setFahrenheit());
    }
  };

  useEffect(() => {
    const API_KEY = "c6176621c9e145388b474816230403";
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
      .then((response) => response.json())
      .then((data) => {
        
        if (data.error) {
          setError(true);
          setLoading(false);
        } else {
          
          setWeatherData(data);
          setLoading(false);
        }
      })
      .catch((error) => {
       
        console.log(error);
        setError(true);
        setLoading(false);
      });
  }, [city]);

  
  if (loading) {
    return <div>Loading data please wait...</div>;
  }

  if (error || Object.keys(weatherData).length === 0) {
    alert("please enter some data.. !");
    return (window.location.href = "/");
  }

  const temperature =
    temperatureUnit === " Celsius"
      ? weatherData.current.temp_c
      : weatherData.current.temp_f;
  return (
    <div className="data">
      <h1 className="heading1" style={{ color: "black" }}>
        Weather Details ::
      </h1>
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            name="Celsius"
            checked={temperatureUnit === "Celsius"}
            onChange={handleCheckboxChange}
          />
          Celsius
        </label>
        <label>
          <input
            type="checkbox"
            name="Fahrenheit"
            checked={temperatureUnit === "Fahrenheit"}
            onChange={handleCheckboxChange}
          />
          Fahrenheits
        </label>
      </div>
      <div className="api-data">
        <img
          src={weatherData.current.condition.icon}
          alt={weatherData.current.condition.text}
        />
        <p>
          Location: {weatherData.location.name}
          <span>
            Temperature : {temperature} {temperatureUnit}
          </span>
        </p>
        <p>Cloud : {weatherData.current.cloud}</p>
        <p>
          Longitude: {weatherData.location.lon}{" "}
          <span className="lat">Latitude: {weatherData.location.lat}</span>{" "}
        </p>
        <p>
          Country : {weatherData.location.country}{" "}
          <span className="region">Region : {weatherData.location.region}</span>{" "}
        </p>
        <p>
          Time Zone: {weatherData.location.tz_id}{" "}
          <span>Local Time : {weatherData.location.localtime}</span>{" "}
        </p>

        <p>UV Index : {weatherData.current.uv}</p>
        <p>Pressure : {weatherData.current.pressure}</p>
      
      </div>
    </div>
  );
}

export default WeatherDetails;