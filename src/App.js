import React, { useState } from 'react';
import './index.css'

const API = {
    key: "f238b103ebba8a442d6e45f2409762c7",
    base: "https://api.openweathermap.org/data/2.5/"
}

const App = () => {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
        if(evt.key === "Enter") {
            fetch(`${API.base}weather?q=${query}&units=metric&APPID=${API.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                setQuery('');
                console.log(result);
            });
        }
    } 

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    function background() {
        if( (typeof weather.main != "undefined") )
        {
            let weather_type = weather.weather[0].main;
            switch(weather_type)
            {
                case 'Sunny':
                    return 'app warm';
                case 'Clouds':
                    return 'app cloudy';
                case 'Rain':
                    return 'app rain';
                case 'Clear':
                    return 'app clear';
                default:
                    return 'app';
            }
        }
    }

    return(
        <div className={background()}>
            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search"
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div> 
                
                {(typeof weather.main != "undefined") ? (
                    <div>
                        <div className="location-box">
                            <div className='location'>{weather.name}, {weather.sys.country} </div>
                            <div className='date'>{dateBuilder(new Date())}</div>
                        </div>

                        <div className="weather-box">
                            <div className="temperature">
                                {Math.round(weather.main.temp)}°c
                            </div>
                            <div className="weather">{weather.weather[0].main}</div>
                        </div>
                    </div>
                ) : (<h1 className='default_text'>Aman Song's Weather <br/><br/><br/> Enter a country or city, or check your spelling is correct</h1>)}
            </main>
        </div>
    );
}

export default App;