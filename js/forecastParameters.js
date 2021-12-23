/** 
 * Forecast parameters used by myMetWeater
 * 
 * Copyright (C) 2021 BITJUNGLE Rune Mathisen
 * SPDX-License-Identifier: Apache-2.0
 */
 class ForecastParameter {
    constructor(name, desc, unit, valueFunction) {
      this.name = name;
      this.desc = desc;
      this.unit = unit;
      this.valueFunction = valueFunction;
    }
}

const forecastParameters = [
    new ForecastParameter('Symbol', 'Værsymbol', 'img', summarySymbolCode),
    new ForecastParameter('Temp.', 'Lufttemperatur', '°C', airTemperature),
    new ForecastParameter('Vind', 'Vindhastighet', 'm/s', windSpeed),
    // new ForecastParameter('Trykk', 'Lufttrykk', 'hPa', airPressure),
    // new ForecastParameter('Dugg.', 'Duggpunktstemperatur', '°C', dewPointTemperature), 
    new ForecastParameter('Luftfukt.', 'Relativ luftfuktighet', '%', relativeHumidity),
    // new ForecastParameter('Regn', 'Forventet regn i det neste tidsintervallet', 'mm', precipitation),
    new ForecastParameter('Tåke', 'Horisontal sikt', '%', fogFraction),
    new ForecastParameter('Sky lav', 'Skydekke lavere enn 2000 m', '%', cloudFractionLow),
    new ForecastParameter('Sky med.', 'Skydekke mellom 2000 og 5000 m', '%', cloudFractionMedium),
    new ForecastParameter('Sky høy', 'Skydekke høyere enn 5000 m', '%', cloudFractionHigh),
    //new ForecastParameter('Skydekke samlet', '', '%', cloudFraction),
];

/**
 * 
 * @param {Array} forecast 
 * @returns String
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

