const CountryDetails = (country) => {
    const countryObj = country.country;

    let languageArr = [];
    if(countryObj !== null){
        for(let key in countryObj.languages)
            languageArr.push(countryObj.languages[key]);
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
        </>
    )
}

export default CountryDetails;