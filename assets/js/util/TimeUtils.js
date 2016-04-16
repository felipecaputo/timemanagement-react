'use strict';

/**
 * Returns the duration in hh:mm:ss
 * 
 * @export
 * @param {Number} dur the duarion in seconds
 */
export function humanizedDuration(dur) {
    let duration = []
    
    let seconds, minutes, hours;
    
    hours = Math.floor(dur / 3600);
    minutes = Math.floor((dur - (hours * 3600)) / 60);
    seconds = Math.floor((dur - minutes * 60 - hours * 3600));
    hours = (hours<10) ? "0" + hours : hours;
    minutes = (minutes<10) ? "0" + minutes : minutes;
    seconds = (seconds<10) ? "0" + seconds : seconds;
    
    duration.push(hours,minutes,seconds);
    
    return duration.join(':');
}