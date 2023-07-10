import CountryDetails from "./CountryDetails";
import {useState} from 'react';
const CountrySearch = ({inputEvent, countries, tooMany}) => {
    const[showDetailElements, setShowDetailElements] = useState({});
    const resetDetailElements = () => {
        setShowDetailElements({});
    }
    const form = 
        <form>
            <div>
                find countries
                <input 
                    type="text" 
                    onChange={(event) => {
                        resetDetailElements();
                        inputEvent(event)
                    }}
                />
            </div>
        </form>

    if(tooMany)
        return(
            <>
                {form}
                <div>Too many matches, please narrow down search.</div>
            </>
        )

    else if(countries.length === 1) 
        return(
            <>
                {form}
                <div>
                    <CountryDetails country = {countries[0]}/>
                </div>
            </>
        )

    else{
        
        const showDetails = (event, i, country) => {
            const showDetailElementsTemp = {...showDetailElements};
            showDetailElementsTemp[i] = <CountryDetails country = {country}/>;
            setShowDetailElements(showDetailElementsTemp);
            console.log("balls");
        }
        return(
        <>
            {form}
            <div>
                {countries.map((country, i) => {
                    return(
                        <>
                            <div>{country.name.common}</div>
                            <button onClick ={(event) => showDetails(event, i, country)} >show</button>
                            {showDetailElements[i]}
                        </>
                    )})}
            </div>
        </>
        )
    }
    
}

export default CountrySearch;