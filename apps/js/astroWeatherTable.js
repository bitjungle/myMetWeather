/** 
 * Astro weather report - table output
 * 
 * Based on https://github.com/havardf/locationforecast-tutorial
 *
 * Copyright (C) 2021 BITJUNGLE Rune Mathisen
 * SPDX-License-Identifier: Apache-2.0
 */

// Limits for formatting purposes
const maxWind = 15.0; // 15 m/s => stiv kuling
const maxTemp = 25.0; // +/- limit in °C 

/**
 * Create the forecast table, replace previous table
 * 
 * @param {Array} place 
 * @param {Array} forecast 
 */
function createAstroWeatherTable(place, forecast) {
    const oldweatherForecast = document.getElementById('weatherForecast');
    const weatherForecast = document.createElement('div');
    weatherForecast.setAttribute('id', 'weatherForecast');

    // Make a forecast title
    const forecastTitle = document.createElement('h2');
    const updatedAt = new Date(forecastUpdatedAt(forecast));
    const updatedAtString = formatDateTime(updatedAt, 'text');
    const title = document.createTextNode(`${place.name} - oppdatert ${updatedAtString} `);
    forecastTitle.appendChild(title);

    weatherForecast.appendChild(forecastTitle);

    // Table start
    const weatherTable = document.createElement('table');
    weatherTable.classList.add('w3-table', 'w3-bordered', 'w3-white');

    // Table headers
    const tableHeader = document.createElement('thead');
    tableHeader.appendChild(tableHeaders(forecastParameters));
    weatherTable.appendChild(tableHeader);

    // Write table rows
    weatherTable.appendChild(tableRows(forecastParameters, forecast));
    weatherForecast.appendChild(weatherTable);

    //Replace the previousely generated table with a new one
    oldweatherForecast.replaceWith(weatherForecast);
}

/**
 * 
 * @param {Array} parameters 
 * @returns Element
 */
function tableHeaders(parameters) {
    const tableHeaders = document.createElement('tr');
    tableHeaders.classList.add('w3-orange')

    let th = document.createElement('th');
    th.appendChild(document.createTextNode(''));//Tidspunkt
    tableHeaders.appendChild(th);

    parameters.forEach((parameter) => {
        th = document.createElement('th');
        let colName = `${parameter.name} (${parameter.unit})`;
        th.appendChild(document.createTextNode(colName));
        th.title = parameter.desc;
        tableHeaders.appendChild(th);
    })

    return tableHeaders;
}

/**
 * Write data to a HTML table and format the table cells
 * 
 * @param {Array} parameters
 * @param {Array} forecast 
 * @returns Element
 */
function tableRows(parameters, forecast) {
    const tableBody = document.createElement('tbody');
    forecast.properties.timeseries.forEach((time) => {
        const forecastValues = document.createElement('tr');
        
        let td = document.createElement('td');
        const dateObject = new Date(time.time);
        const hour = dateObject.getHours();
        let formatDateTimeType = 'timeonly';
        
        // Format some time elements
        // TODO: replace with sunrise/sunset data
        switch (hour) {
            case 22:
                td.classList.add('w3-gray');
                formatDateTimeType = 'text';
                break;
            case 23:
                td.classList.add('w3-dark-gray');
                formatDateTimeType = 'text';
                break;
            case 0:
                td.classList.add('w3-black');
                formatDateTimeType = 'text';
                break;
            case 1:
                td.classList.add('w3-black');
                formatDateTimeType = 'text';
                break;
            case 2:
                td.classList.add('w3-black');
                formatDateTimeType = 'text';
                break;
            case 3:
                td.classList.add('w3-dark-gray');
                formatDateTimeType = 'text';
                break;
            case 4:
                td.classList.add('w3-gray');
                formatDateTimeType = 'text';
                break;
            case 10:
                td.classList.add('w3-pale-yellow');
                break;
            case 11:
                td.classList.add('w3-yellow');
                break;
            case 12:
                td.classList.add('w3-orange');
                break;
            case 13:
                td.classList.add('w3-yellow');
                break;
            case 14:
                td.classList.add('w3-pale-yellow');
                break;
            default:
                td.classList.add('w3-light-gray');
        }

        td.appendChild(document.createTextNode(formatDateTime(dateObject, formatDateTimeType)));
        forecastValues.appendChild(td);

        parameters.forEach((parameter) => {
            td = document.createElement('td');
            const value = parameter.valueFunction(time);
            if (typeof value === 'undefined' || value === '') {
                td.appendChild(document.createTextNode('?'));
                td.style.color = 'red';
            } else {
                switch (parameter.valueFunction.name) {
                    case 'summarySymbolCode':
                        const img = document.createElement('img');
                        img.src = `img/weathericon/png/${value}.png`;
                        img.alt = value;
                        img.width = '50';
                        img.height = '50';
                        td.appendChild(img);
                        break;
                    case 'windSpeed':
                        const windPercent = value > maxWind ? 
                            100 : 100 * value/maxWind;
                        td.style.backgroundColor = whiteblueGradient(windPercent);
                        td.style.color = windPercent < 50.0 ? 'white' : 'black';
                        td.appendChild(document.createTextNode(value));
                        break;
                    case 'airTemperature':
                        currentTemp = value;
                        const tempPercent = Math.abs(value) > maxTemp ? 
                            100 : 100 * Math.abs(value) / maxTemp;
                        td.style.backgroundColor = redblueGradient(tempPercent);
                        td.style.color = value < 50.0 ? 'white' : 'black';
                        td.appendChild(document.createTextNode(value));
                        break;
                    default:
                        if (parameter.unit === '%') {
                            td.style.backgroundColor = whiteblueGradient(value);
                            td.style.color = value < 50.0 ? 'white' : 'black';
                        }
                        td.appendChild(document.createTextNode(value));
                } 
            }
            forecastValues.appendChild(td);
        });

        tableBody.appendChild(forecastValues);
    });

    return tableBody;
}

