/** 
 * Place data used by myMetWeater
 * 
 * Copyright (C) 2021 BITJUNGLE Rune Mathisen
 * SPDX-License-Identifier: Apache-2.0
 */
class Place {
    /**
     * 
     * @param {string} name Location name
     * @param {float} lat Latitude
     * @param {float} lon Longitude
     */
    constructor(name, lat, lon) {
      this.name = name;
      this.lat = lat;
      this.lon = lon;
    }

    /**
     * Returns the location formattet for the URL query string 
     * 
     * * @returns String
     */
    get location() {
        return `lat=${this.lat}&lon=${this.lon}`;
    }
}

const places = [
    new Place('Skien (Vestre Gulset)', 59.22, 9.54),
    new Place('Bamble (Flåte)', 59.06, 9.51),
    new Place('Porsgrunn (Langangen)', 59.09, 9.78)
];

