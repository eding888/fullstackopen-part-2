import axios from 'axios';
import {useState, useEffect} from 'react';
const CountryDetails = (country) => {
    const kelvinToF = (k) => {
        return(Math.round((k - 273.15) * (9/5) + 32));
    }
    const countryObj = country.country; //wtf
    const [weatherData, setWeatherData] = useState({});
    let displayWeatherData = {
        temp : 0,
        iconUrl : "",
        wind : 0,
    }
    let languageArr = [];
    
    if(countryObj !== null){
        for(let key in countryObj.languages)
            languageArr.push(countryObj.languages[key]);
    }

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${countryObj.latlng[0]}&lon=${countryObj.latlng[1]}&appid=0d67d532be22a68e73b09688d3716b8f`)
            .then(response => setWeatherData(response.data))
        }, []);
    
    if(weatherData !== undefined && Object.keys(weatherData).length !== 0){
        displayWeatherData.temp = weatherData.main.temp;
        displayWeatherData.iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
        displayWeatherData.wind = weatherData.wind.speed;
    }

    return(
        <>
            <h1>{countryObj.name.common}</h1>
            <div>capital {countryObj.capital}</div>
            <div>area {countryObj.area}</div>
            <div><strong>languages: </strong></div>
            <ul>
                {languageArr.map(language =>{
                    return(<li>{language}</li>)
                })}
            </ul>
            <img src={countryObj.flags.png}/>
            <h2><strong>weather in {countryObj.name.common}</strong></h2>
            <div>temperature {kelvinToF(displayWeatherData.temp)} F</div>
            <img src={displayWeatherData.iconUrl}/>
            <div>wind {displayWeatherData.wind}</div>
        </>
    )
}

export default CountryDetails;