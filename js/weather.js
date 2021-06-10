/** 
 * Astro weather report
 * 
 * Based on https://github.com/havardf/locationforecast-tutorial
 * Data collected from https://api.met.no/weatherapi/locationforecast/2.0/
 * Data documentation: https://api.met.no/doc/
 * 
 * Copyright (C) 2021 BITJUNGLE Rune Mathisen
 * SPDX-License-Identifier: Apache-2.0
 */

//const apiPath = '/weatherapi/locationforecast/2.0/?';
//const apiPathCompact = '/weatherapi/locationforecast/2.0/compact?';
const apiPathComplete = 'https://bitjungle.net/weatherapi/locationforecast/2.0/complete?';

const places = [
    {
        name: 'Skien (Vestre Gulset)',
        location: 'lat=59.22&lon=9.54',
        meteoblueUrl: 'https://www.meteoblue.com/en/weather/outdoorsports/seeing/skien_norway_3139075'
    },
    {
        name: 'Bamble (Flåte)',
        location: 'lat=59.06&lon=9.51',
        meteoblueUrl: 'https://www.meteoblue.com/en/weather/outdoorsports/seeing/bamle_norway_3162079'
    },
    // {
    //     name: 'Porsgrunn (Langangen)',
    //     location: apiPathComplete + 'lat=59.09&lon=9.78',
    //     meteoblueUrl: 'https://www.meteoblue.com/en/weather/outdoorsports/seeing/porsgrunn_norway_3142657'
    // },
];

const forecastParameters = [
    {
        name: 'Symbol',
        desc: 'Værsymbol',
        unit: 'img',
        valueFunction: summarySymbolCode
    },
    {
        name: 'Temp.',
        desc: 'Lufttemperatur',
        unit: '°C',
        valueFunction: airTemperature
    },
    {
        name: 'Vind',
        desc: 'Vindhastighet',
        unit: 'm/s',
        valueFunction: windSpeed
    },
    // {
    //     name: 'Trykk',
    //     desc: 'Lufttrykk',
    //     unit: 'hPa',
    //     valueFunction: airPressure
    // },
    // {
    //     name: 'Dugg.',
    //     desc: 'Duggpunktstemperatur',
    //     unit: '°C',
    //     valueFunction: dewPointTemperature 
    // },
    {
        name: 'Luftfukt.',
        desc: 'Relativ luftfuktighet',
        unit: '%',
        valueFunction: relativeHumidity 
    },
    // {
    //     name: 'Regn',
    //     desc: 'Forventet regn i det neste tidsintervallet',
    //     unit: 'mm',
    //     valueFunction: precipitation 
    // },
    {
        name: 'Tåke',
        desc: 'Horisontal sikt',
        unit: '%',
        valueFunction: fogFraction
    },
    {
        name: 'Sky lav',
        desc: 'Skydekke lavere enn 2000 m',
        unit: '%',
        valueFunction: cloudFractionLow
    },
    {
        name: 'Sky med.',
        desc: 'Skydekke mellom 2000 og 5000 m',
        unit: '%',
        valueFunction: cloudFractionMedium
    },
    {
        name: 'Sky høy',
        desc: 'Skydekke høyere enn 5000 m',
        unit: '%',
        valueFunction: cloudFractionHigh
    },
    // {
    //     name: 'Skydekke samlet',
    //     desc: '',
    //     unit: '%',
    //     valueFunction: cloudFraction
    // },
];

/**
 * Fetch forecast and create HTML table
 * 
 * @param {int} place 
 */
function weatherForecast(place) {
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
            createTable(places[place], forecast);
        })
        .catch( err => {
            console.log(`Request for ${url} failed.`, err);
        });
}

/**
 * 
 * @param {Array} forecast 
 * @returns 
 */
function forecastUpdatedAt(forecast) {
    return forecast.properties.meta.updated_at;
}


// ======== Value Functions ============================================

function summarySymbolCode(forecastTime) {
    if (forecastTime.data.next_1_hours !== undefined) {
        return forecastTime.data.next_1_hours.summary.symbol_code;
    } else if (forecastTime.data.next_6_hours !== undefined) {
        return forecastTime.data.next_6_hours.summary.symbol_code;
    } else {
        return '';
    }
}

function airTemperature(forecastTime) {
    return forecastTime.data.instant.details.air_temperature;
}

function airPressure(forecastTime) {
    return forecastTime.data.instant.details.air_pressure_at_sea_level;
}

function precipitation(forecastTime) {
    if (forecastTime.data.next_1_hours != undefined) {
        return forecastTime.data.next_1_hours.details.precipitation_amount;
    }
    else if (forecastTime.data.next_6_hours != undefined) {
        return forecastTime.data.next_6_hours.details.precipitation_amount;
    }
    else {
        return '';
    }
}

function windSpeed(forecastTime) {
    return forecastTime.data.instant.details.wind_speed;
}

function fogFraction(forecastTime) {
    return forecastTime.data.instant.details.fog_area_fraction;
}

function cloudFraction(forecastTime) {
    return forecastTime.data.instant.details.cloud_area_fraction;
}

function cloudFractionHigh(forecastTime) {
    return forecastTime.data.instant.details.cloud_area_fraction_high;
}

function cloudFractionMedium(forecastTime) {
    return forecastTime.data.instant.details.cloud_area_fraction_medium;
}

function cloudFractionLow(forecastTime) {
    return forecastTime.data.instant.details.cloud_area_fraction_low;
}

function relativeHumidity(forecastTime) {
    return forecastTime.data.instant.details.relative_humidity;
}

function dewPointTemperature(forecastTime) {
    return forecastTime.data.instant.details.dew_point_temperature;
}

function relativeHumidity(forecastTime) {
    return forecastTime.data.instant.details.relative_humidity;
}
