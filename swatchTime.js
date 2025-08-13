// https://melonking.net - Swatch Clock! v3.2
// The script displays a live Swatch Internet Time clock on your website!
// For more info on swatch time visit https://wiki.melonland.net/swatch_time
//
// How to this script; just paste this onto your site where ever you want the clock to show:
// <span id="swatchClock">@000</span>
// OR if you dont want the info link
// <span id="swatchClock-nolink">@000</span>
// <script defer src="https://melonking.net/scripts/swatchTime.js"></script>

var swatchClock = document.getElementById("swatchClock");
var swatchClockNoLink = document.getElementById("swatchClock-nolink");
var swatchLoop = undefined;
function updateSwatchClock() {
    // Setup clocks
    if (swatchClock != null) swatchClock.innerHTML = '<a href="https://wiki.melonland.net/swatch_time" target="_blank">&#64;' + GetSwatchTime() + "</a>";
    if (swatchClockNoLink != null) swatchClockNoLink.innerHTML = "&#64;" + GetSwatchTime();
    // Setup loop first time
    if (swatchLoop == undefined && (swatchClock != null || swatchClockNoLink != null)) swatchLoop = setInterval(updateSwatchClock, 864);
}
updateSwatchClock();

// Gets the swatch time right now
function GetSwatchTime(showDecimals = true) {
    return GetSwatchTimeAt(new Date(), showDecimals);
}

// Converts a given time to swatch time - takes a JS Date object
function GetSwatchTimeAt(date, showDecimals = true) {
    // Get date in UTC/GMT
    var hours = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var seconds = date.getUTCSeconds();
    var milliseconds = date.getUTCMilliseconds();

    // Convert to Biel Mean Time (BMT), add 1 hour to UTC
    hours = (hours + 1) % 24;
    // Time in seconds since midnight BMT
    var timeInMilliseconds = ((hours * 60 + minutes) * 60 + seconds) * 1000 + milliseconds;
    // Convert milliseconds to beats - there are 86.4 seconds in a beat
    var beats = timeInMilliseconds / 86400;

    if (showDecimals) {
        return beats.toFixed(2);
    } else {
        return Math.floor(beats);
    }
}

// +++ Handy Functions for Swatch Time coders!! +++

// Converts a Swatch stamp to Biel Mean Time / UTC+1 date object
function SwatchToBMT(swatchTime) {
    let date = SwatchToUTC(swatchTime);
    date.setHours((date.getHours() + 1) % 24);
    return date;
}

// Converts a Swatch value to UTC date object.
function SwatchToUTC(swatchTime) {
    //Strip any beat symbol
    swatchTime = swatchTime.replace("@", "");
    // Check if swatchTime includes decimals
    var hasDecimals = swatchTime % 1 !== 0;
    // Convert Swatch Beats to total seconds
    var totalSeconds = swatchTime * 86.4;
    // Convert total seconds to milliseconds
    var totalMilliseconds = totalSeconds * 1000;
    // Calculate hours, minutes, and seconds
    var secondsSinceMidnight = totalMilliseconds / 1000;

    // Adjust for Biel Mean Time (UTC+1)
    secondsSinceMidnight -= 3600;
    // Handle negative wraparound
    if (secondsSinceMidnight < 0) {
        secondsSinceMidnight += 86400;
    }

    var hours = String(Math.floor(secondsSinceMidnight / 3600) % 24).padStart(2, "0");
    var minutes = String(Math.floor((secondsSinceMidnight % 3600) / 60)).padStart(2, "0");
    var seconds = String(Math.floor(secondsSinceMidnight % 60)).padStart(2, "0");

    let date = new Date(`2000-01-01T${hours}:${minutes}:${seconds}`);
    date.setMilliseconds(400); // This gives a cleaner result if its converted back to swatch time again

    return date;
}

// Gets the number of beats until the next @000 loop over
function BeatsUntilMidnight() {
    // Get the current Swatch time in beats (no decimals needed)
    var currentBeats = parseFloat(GetSwatchTime(false));
    // Total beats in a day is 1000 (from @000 to @999)
    var totalBeatsInDay = 1000;
    // Calculate remaining beats until @000
    var remainingBeats = totalBeatsInDay - currentBeats;
    // Handle edge case where remainingBeats is 0 (exactly at @000)
    return remainingBeats === 0 ? totalBeatsInDay : remainingBeats;
}

// Gets the day of the week within the swatch timezone
function GetSwatchDayOfWeek(date = new Date()) {
    // Get the UTC time
    const utcTime = date.getTime();
    // Convert to UTC+1 (Swatch Internet Time zone) by adding 1 hour
    const swissTime = new Date(utcTime + 3600000); // UTC+1 in milliseconds
    // Get the day of the week in the Swatch Internet Time zone
    const dayOfWeek = swissTime.getUTCDay();
    // Map day index to weekday name
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[dayOfWeek];
}