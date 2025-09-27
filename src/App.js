import { useState } from "react";

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);


  const API_KEY = "c83b97e441554c08af8144640252709"

  

    const fetch_city = async() => {
      if (!city) return;

      setLoading(true);
  setWeather(null);


      try {
         
        const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      
    
      const data = await response.json();

       if (data.error) {
        alert("Failed to fetch weather data");
      } else {
        setWeather(data);
      }

      //setWeather(data);
    }
    catch(error){
       alert("Failed to fetch weather data");
      console.log(error)
      return;
    }finally{
      setLoading(false)
    }
};



  



  return (
    <div className="App">

      <h1>Weather App</h1>
 
      <input 
      type="text"
      placeholder="Enter city name"
      value={city}
      onChange={(e) => setCity(e.target.value)}

      />

      <button
      type="button"
      onClick={() =>  fetch_city() }
      

      >
        Search
      </button>

        {loading && 
        <p>
          Loading data...
          </p>}


           {weather && !loading && (

        <>

          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weather.current.temp_c} °C</p>
          </div>

          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weather.current.humidity} %</p>
          </div>

          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weather.current.condition.text}</p>
          </div>

          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weather.current.wind_kph} kph</p>
          </div>

        </>
      )}

 

    


    </div>
  );
}

export default App;
