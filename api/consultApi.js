import axios from 'axios'
import {useState} from 'react'
async function getCurrentWeather (locationCoords) {


    const lat = locationCoords.latitude
    
    const log = locationCoords.longitude

    var results = []

     await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=7625507cc924a59f4fb313f25553a618`)
     .then(function (response){

        const data = response.data     
        const locationName = (data.sys.country + ', ' + ' ' + data.name)
        const temperatureMin = data.main.temp_min
        const temperatureMax = data.main.temp_max
        const wind = data.wind.speed
        const humidity = data.main.humidity
        const currentTemperature = data.main.temp

       
        // [currentTemperature, temperatureMin, temperatureMax, locationName, wind, humidity]
       results = [currentTemperature, temperatureMin, temperatureMax, locationName, wind, humidity]

    })
    .catch(function (error) {
        console.log(error)
    })

return results
}

export default getCurrentWeather