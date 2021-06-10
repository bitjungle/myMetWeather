/** 
 * 
 * Copyright (C) 2021 BITJUNGLE Rune Mathisen
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Make a human readable time string
 * 
 * @param {String} timestamp ISO 8601, e.g. 2021-06-16T18:20:17+02:00
 * @returns String
 */
 function formatDateTime(timestamp, format, locale = 'no-NO') {
    //https://www.w3schools.com/jsref/jsref_tolocalestring.asp
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
    const formatDateOptions = {
        'text': {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        },
        'digits': {
            dateStyle: 'short',
            timeStyle: 'short'
        },
        'timeonly': {
            hour: '2-digit',
            minute: '2-digit'
        },
        'dateonly': {
            dateStyle: 'full'
        }
    };    
    const time = new Date(timestamp);
    const timeString = time.toLocaleString(locale, formatDateOptions[format]);
    return timeString;
}

/**
 * Make a shade of blue in RGB() from a given percentage
 * 
 * @param {Number} percentage 
 * @returns String rgb() css function syntax
 */
 function whiteblueGradient(percentage) {
    let n = Math.round(percentage * 255 / 100);
    if (n < 0) n = 0;
    if (n > 255) n = 255;
    const r = n;
    const g = n;
    const b = 255;
    return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Make a shade of blue in RGB() from a given percentage
 * 
 * @param {Number} percentage 
 * @returns String rgb() css function syntax
 */
 function redblueGradient(percentage) {
    let n = Math.round(percentage * 255 / 100);
    if (n < 0) n = 0;
    if (n > 255) n = 255;
    const r = n;
    const g = 0;
    const b = 255 - n;
    return `rgb(${r}, ${g}, ${b})`;
}
