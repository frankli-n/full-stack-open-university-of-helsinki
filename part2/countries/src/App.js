import backendComms from "./services/backendComms"
import axios from "axios"
import React, { useState, useEffect } from 'react'
import Input from "./components/Input"
import DisplayCountries from "./components/DisplayCountries"
import DisplayInfo from "./components/DisplayInfo"


function App() {

  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [languages, setLanguages] = useState([])
  const [flag, setFlag] = useState('')
  const [cuntry, setCuntry] = useState('')
  const [city, setCity] = useState('')
  const [temp, setTemp] = useState('')
  const [weatherIcon, setWeatherIcon] = useState('')
  const [headerflag, setHeaderflag] = useState(false)

  useEffect(() => {
    backendComms
      .getAll()
      .then((response)=>{
        setAllCountries(response.data.map((i) => i.name.common))
      })
      .catch(error => {
        console.log(error.message);
      })
    }, []);

  const handleInput = (event) => {
    console.log('event.target.value',event.target.value);
    const f = allCountries.filter((i) => {
      return i.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setFilteredCountries(f)
    console.log('f',f);
    if (f.length === 1) {
      handleInfo(f)
    }
    else {
      setFlag('')
      setLanguages('')
      setWeatherIcon('')
      setTemp('')
      setHeaderflag(false)

    }
    if (!f.includes(cuntry)) {
      console.log('cuntry not in f', cuntry);
    } else {
      console.log('else, cuntry', cuntry);
    }
  }

  const handleInfo = (x) => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${x}`)
      .then((response)=>{
        setLanguages(response.data.languages)
        const countryCode = response.data.cca2.toLowerCase()
        const flagUrl = `https://flagcdn.com/${countryCode}.svg`
        setFlag(flagUrl)
        setCity(response.data.city)
        weatherApi(response.data.capital) 
      })
  }

  const handleShow = (cuntry) => {
    setCuntry(cuntry)
    handleInfo(cuntry)
    setHeaderflag(true)
  }

  const weatherApi = (city) => {
    const api_key = process.env.REACT_APP_API_KEY
    const wUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    console.log(wUrl);
    axios
      .get(wUrl)
      .then((response)=>{
        console.log(response.data);
        const celsius = (response.data.main.temp - 273.15)
        const wicon = response.data.weather[0].icon
        const cCity = response.data.name
        console.log(city);
        setWeatherIcon(wicon)
        setTemp(celsius)
        setCity(cCity)
      })
  }

  return (
    <>
      <Input handleInput={handleInput}/>
      <DisplayCountries countries={filteredCountries} handleShow={handleShow}/>
      <DisplayInfo headerflag={headerflag} city={city} weatherIcon={weatherIcon} temp={temp} cuntry={cuntry} countries={filteredCountries} languages={languages} flag={flag} handleShow={handleShow}/>
    </>
  );
}

export default App;