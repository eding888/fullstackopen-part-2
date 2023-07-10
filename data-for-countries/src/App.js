import './App.css';
import axios from "axios";
import {useState, useEffect} from 'react';

import CountrySearch from './components/CountrySearch';
function App() {
  const[searchText, setSearchText] = useState("");
  const[allCountryObjects, setAllCountryObjects] = useState([]);
  const[displayCountries, setDisplayCountries] = useState([]);
  const[tooManyCountries, setTooManyCountries] = useState(false);
  let tooMany = tooManyCountries;
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setAllCountryObjects(response.data);
      });
  }, [])

  const inputEvent = (event) => {
    const search = event.target.value;
    setSearchText(search);
    const matchingCountries = allCountryObjects.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()));
    if(matchingCountries.length > 10){
      tooMany = true;
      setTooManyCountries(true);
    } 
    else{ 
      setTooManyCountries(false);
      setDisplayCountries(matchingCountries);
    }
  
  }
  return (
    <CountrySearch
      inputEvent={inputEvent}
      countries={displayCountries}
      tooMany={tooMany}
    />
  );
}

export default App;
