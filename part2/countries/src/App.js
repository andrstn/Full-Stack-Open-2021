import React, {useEffect, useState} from "react";
import axios from 'axios'
import Search from './components/Search'
import Countries from './components/Countries'

const api_key = process.env.REACT_APP_API_KEY

const App = () => {

  const [countries, setCountries] = useState([])
  const [filters, setFilters] = useState('')
  const [weather, setWeather] = useState([])
  const [capital, setCapital] = useState('Helsinki')


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [capital])

  const handleFilter = (event) => {
    if (weather.hasOwnProperty('error')){
      alert(`${weather.error.type}`)
    } else {
      setFilters(event.target.value.toLowerCase())
    }
  }

  const showCountry = (event) => {
    event.preventDefault()
      setFilters(event.target.value.toLowerCase())
  }

  const handleCapital = (c) => {
    if (weather.hasOwnProperty('error')){
      alert(`${weather.error.type}`)
    } else {
      setCapital(c)
    }
  }

  return (
    <div> 
      <Search 
      value={filters}
      onChange={handleFilter}
      />
      <Countries 
      countries={countries}
      filters={filters}
      weather={weather}
      showCountry={showCountry}
      handleCapital={handleCapital}
      />
    </div>
  )
}

export default App;
