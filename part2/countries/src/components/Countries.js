import React from "react"
import Country from './Country'

const Countries = ({countries, filters, weather, showCountry, handleCapital}) => {

    const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(filters))

    const show = filtered.findIndex(filter => filter.name.common.toLowerCase() === filters)

    if (filtered.length === countries.length) {
        return (
            <div></div>
        )
    }

    else if (show !== -1) {
        handleCapital(filtered[show].capital)
        return (
            <Country country={filtered[show]} weather={weather} />
        )
    }

    else if (filtered.length === 1) {
        handleCapital(filtered[0].capital)
        return (
            <Country country={filtered[0]} weather={weather} />
        )
    }

    else if (filtered.length <= 10) {

        return (
            <div>
                {filtered.map(country => {
                    return (
                        <div  key={country.name.common}>
                        <span>{country.name.common} </span>
                        <button value={country.name.common} onClick={showCountry}>Show</button>
                        <br/><br/>
                        </div>
                )})}
            </div>
        )
    }

    else {
        return(
            <div>
                Too many search results, specify another
            </div>
        )
    }
}

export default Countries