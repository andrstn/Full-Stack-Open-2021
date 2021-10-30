import React from "react"

const Country = ({country, weather}) => {

    return (
        <div key={country}>
            <h1>{country.name.common}</h1>
            <p>Capital:  {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {Object.keys(country.languages).map(value => {
                    return <li  key={country.languages[value]}>{country.languages[value]}</li>
                })}
            </ul>
            <p>
                <img 
                src={Object.values(country.flags)[0]}
                alt={`Flag of ${country.name.common}`}
                height="60"
                width="120"
                />
            </p>
            <h3>Weather in {country.capital}</h3>
            <p><b>Temperature: </b>{weather.current.temperature} Celsius</p>
            <p>
                <img src={weather.current.weather_icons[0]} alt={`Weather of ${country.capital}`} />
            </p>
            <p><b>Wind: </b>{weather.current.wind_speed}mph, {weather.current.wind_dir}</p>
        </div>
    )
}

export default Country