/** 
 * Met weather forecast retrieval
 * 
 * Originally based on https://github.com/havardf/locationforecast-tutorial
 * Data collected from https://api.met.no/weatherapi/locationforecast/2.0/
 * Data documentation: https://api.met.no/doc/
 * 
 * Copyright (C) 2021 BITJUNGLE Rune Mathisen
 * SPDX-License-Identifier: Apache-2.0
 */

//const apiPath = '/weatherapi/locationforecast/2.0/?';
//const apiPathCompact = '/weatherapi/locationforecast/2.0/compact?';
const apiPathComplete = 'https://bitjungle.net/weatherapi/locationforecast/2.0/complete?';

/**
 * Fetch forecast and create HTML table
 * 
 * @param {int} place 
 * @param {function} outputFunction
 */
function weatherForecast(place, outputFunction) {
    const url = apiPathComplete + places[place].location;
    fetch(url)
        .then( response => {
            if (! response.ok){
                throw new Error(`Request failed with status code ${response.status}`);
            }
            return response.json();
        })
        .then( forecast => {
            //console.log(forecast);
            //createTable(places[place], forecast);
            outputFunction(places[place], forecast);
        })
        .catch( err => {
            console.log(`Request for ${url} failed.`, err);
        });
}

