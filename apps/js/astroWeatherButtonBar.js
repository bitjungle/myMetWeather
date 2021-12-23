/** 
 * Astro weather report - initialize app and create button bar
 * 
 * Based on https://github.com/havardf/locationforecast-tutorial
 *
 * Copyright (C) 2021 BITJUNGLE Rune Mathisen
 * SPDX-License-Identifier: Apache-2.0
 */

window.addEventListener('load', () => {
    // places is a global variable defined in weather.js
    createPlaces(places);
});

/**
 * Create the page top button bar
 * 
 * @param {Array} places 
 */
function createPlaces(places) {
    const placeButtons = document.getElementById('places');
    let placeButton;

    places.forEach((place, index) => {
        placeButton = document.createElement('button');
        placeButton.classList.add('w3-button', 'w3-amber');
        placeButton.onclick = function () { 
            weatherForecast(index, createAstroWeatherTable);
        };
        placeButton.appendChild(document.createTextNode(place.name));
        placeButtons.appendChild(placeButton);
    });

    placeButton = document.createElement('button');    
    placeButton.classList.add('w3-button', 'w3-red');
    placeButton.appendChild(document.createTextNode('Hjelp'));
    placeButton.onclick = function () {
        document.getElementById('helpModal').style.display='block';
    };
    placeButtons.appendChild(placeButton);
}
