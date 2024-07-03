
'use strict';

export const weekDaysNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

export const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
];

/**
 * 
 * @param {number} dateUnix Unix date in seconds
 * @param {number} timezone timezone shifting from UTC in seconds
 * @returns {string} Date String formate: "Sunaday 10, Jan"
 */

export const getDate = function(dateUnix,timezone){
    const date = new Date((dateUnix + timezone)*1000);
    const weekDaysName = weekDaysNames[date.getUTCDate()];
    const monthName = monthNames[date.getUTCMonth()];

    return `${weekDaysName} ${date.getUTCDay()}, ${monthName} `
}

/**
 * @param {number} timeUnix unix date in second
 * @param {number} timezone  timezone shift UTC in second
 * @returns {string} Time string. formate
 */

export const getTime = function(timeUnix, timezone){
    const date = new Date((timeUnix + timezone)*1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? "PM" : "AM";

    return `${hours % 12 || 12}:${minutes} ${period}`;
}




