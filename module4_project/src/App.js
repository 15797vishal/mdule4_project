import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react";
import './App.css';

function App() {
  const apiKey = "f56f24967aaf51182d1d4df628297c6d"
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})

  // https://api.weatherapi.com/v1/current.json?key=2638573975f54f9db7552323232802&q=new+delhi
  const getWetherDetails = (cityName) => {
    if (!cityName ){
      window.alert("please give some input.... ")
    }
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey 
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
      setData(res.data)
    }).catch((err) => {
      console.log("err", err)
    })
  } 
  // useEffect(() => {
  // getWetherDetails();
  // }, []) //  this is for automatic show the outputs

  const handleChangeInput = (e) => {
    console.log("value", e.target.value)
    setInputCity(e.target.value)
  }

  const handleSearch = () => {
    getWetherDetails(inputCity)
  }

  return (
    <div className="col-md-12">
      <div className="wetherBg">
        <h1 className="heading">Weather App</h1>
         <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="formcontrol"value={inputCity}onChange={handleChangeInput} placeholder="enter city name"/>
          <button className="btn btn-light" type="button" onClick={handleSearch}>Search</button>
        </div>
      </div>

      {Object.keys(data).length > 0 &&
        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded wetherResultBox">
            <h5 className="weatherCity">{data?.name}</h5>
           <h5 className="weatherTemp"> {((data?.main?.temp) - 273.15).toFixed(2)} °C </h5>
          </div>
        </div>
      }

    </div>
  );
}

export default App;