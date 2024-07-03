
'use strict';
const api_key = "3d63e956d93780759b6b69f1f1853436";

/**
 * fecth data from server
 * @param {string} URL Api url
 * @param {function} callback callback
 */

export const fetchData = function(URL,callback){
    fetch(`${URL}&appid=${api_key}`)
    .then(res => res.json())
    .then(data => callback(data));
}

export const url = {
    currentWeather(lat, lon){
        return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&
        units=metric`
    },
    forecast(lat, lon){
        return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}
        &units=metric`
    },
    airPollution(lat, lon){
        return `http://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`
    },
    reverseGeo(lat, lon){
        return `http://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}
        &limit=5`
    },
    /**  
     * @param {string} query Search query e.g. : "london", "New York"
     */
    geo(query){
        return `http://api.openweathermap.org/geo/1.0/direct?q=${query}
        &limit=5`
    }
}











