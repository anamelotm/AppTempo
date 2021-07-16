import React, { useState,useEffect } from 'react';
import {api} from './services/Api';
import { FaTemperatureHigh, FaWind } from 'react-icons/fa';

import './App.css'

import Hello from './components/Hello'

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState(); 

  async function handleGetWeather(event){
    event.preventDefault();
    const response = await api.get(search);
    setWeather(response.data);
    setCity(search);
    setSearch('');
  }

  useEffect (() => {
    //handleGetWeather();
  }, []);
 
  return (
    <div className="App">
      {/* <header>
        <button onClick={handleGetWeather}>Enviar</button>
      </header> */}

      <header>
        <form onSubmit={handleGetWeather}>
          <input 
            type="text" 
            value={search} 
            onChange={(event) => setSearch(event.target.value) }
            placeholder="Type the city"
            />
          <button>Search</button>
        </form>
      </header>

      {weather &&
        <main>
          {/* <p>{JSON.stringify(weather)}</p> */}

          <h1>{city}</h1>

          <section className="current-weather">
            <h2>Current weather</h2>

            <p>{weather.temperature}</p>
            <p>{weather.description}</p>
          </section>

          <section className="forecast">
            <h2>Forecast</h2>

            <ol>
            {
              weather.forecast.map(day => 
                <li>
                  <div>
                    <FaTemperatureHigh />
                  <p>{day.temperature}</p>
                  </div>

                  <div>
                    <FaWind />
                    <p>{day.wind}</p>
                  </div>
                </li>
              )
            }
            </ol>
          </section>
        </main>
      }
    </div>
  )
}

export default App
