//@version=1
init = () => {
    // Dropdown input for timezome
    input.str(
        'Timezone',
        'UTC-4',
        'timezoneStr',
        ['UTC-4', 'UTC-5']
    );

    //Pick a line color
    input.color(
        'Line Color',
        color.black,
        "lineColor",
        'Styles'
    );
};

/*
================ 
= Define Constants  =
================
*/
const ONE_MINUTE_IN_SECONDS = 60;
const THREE_MINUTES_IN_SECONDS = ONE_MINUTE_IN_SECONDS * 3;
const SEVEN_MINUTES_IN_SECONDS = ONE_MINUTE_IN_SECONDS * 7;
const THIRTY_MINUTES_IN_SECONDS = ONE_MINUTE_IN_SECONDS * 30;

// Price offset to provide a buffer around high/low levels
const PRICE_OFFSET = 1;

/*
==============
= Define Variable =
==============
*/
const macroOne = {
    label: 'Macro One\n(9:45 - 10:15)',
    startTime: 9 * 60 + 45,
    endTime: 10 * 60 + 15,
    highs: [], lows: [], times: [],
    highDrawingIds: [], lowDrawingIds: []
};

const macroTwo = {
    label: 'Macro Two\n(10:45 - 11:15)',
    startTime: 10 * 60 + 45,
    endTime: 11 * 60 + 15,
    highs: [], lows: [], times: [],
    highDrawingIds: [], lowDrawingIds: []
};

const marketOpen = {
    label: 'Market Open\n(9:30 - 9:33)',
    startTime: 9 * 60 + 30,
    endTime: 9 * 60 + 33,
    highs: [], lows: [], times: [],
    highDrawingIds: [], lowDrawingIds: []
};

const macroTenThirty = {
    label: 'Macro 10:30\n(10:27 - 10:33)',
    startTime: 10 * 60 + 27,
    endTime: 10 * 60 + 33,
    highs: [], lows: [], times: [],
    highDrawingIds: [], lowDrawingIds: []
};

const macroElevenThirty = {
    label: 'Macro 11:30\n(11:27 - 11:33)',
    startTime: 11 * 60 + 27,
    endTime: 11 * 60 + 33,
    highs: [], lows: [], times: [],
    highDrawingIds: [], lowDrawingIds: []
};

onTick = (length, _moment, _, ta, inputs) => {
    const timezoneOffset = convertTimezoneStr(inputs.timezoneStr);
    const dayOffsetMinutes = getDayOffsetMinutes(time(0), timezoneOffset);

    // --- MACRO ONE LOGIC (9:45 - 10:15) ---
    if (dayOffsetMinutes >= macroOne.startTime && dayOffsetMinutes < macroOne.endTime) {
        macroOne.highs.push(high(0));
        macroOne.lows.push(low(0));
        macroOne.times.push(time(0));

        const anchor = macroOne.times.at(0);
        const max = Math.max(...macroOne.highs) + PRICE_OFFSET;
        const min = Math.min(...macroOne.lows) - PRICE_OFFSET;
        
        // Dynamic duration based on macro window
        const durationTime = (macroOne.endTime - macroOne.startTime) * ONE_MINUTE_IN_SECONDS;

        const hId = rayLine(newPoint(anchor, max), newPoint(anchor + durationTime, max), { linewidth: 2, linecolor: inputs.lineColor, textcolor: inputs.lineColor, showLabel: true, extendRight: false }, macroOne.label);
        const lId = rayLine(newPoint(anchor, min), newPoint(anchor + durationTime, min), { linewidth: 2, linecolor: inputs.lineColor, showLabel: false, extendRight: false });

        if (hId && macroOne.highDrawingIds.length > 0) deleteDrawingById(macroOne.highDrawingIds.shift());
        if (hId) macroOne.highDrawingIds.push(hId);
        if (lId && macroOne.lowDrawingIds.length > 0) deleteDrawingById(macroOne.lowDrawingIds.shift());
        if (lId) macroOne.lowDrawingIds.push(lId);
    }

    // --- MACRO TWO LOGIC (10:45 - 11:15) ---
    if (dayOffsetMinutes >= macroTwo.startTime && dayOffsetMinutes <= macroTwo.endTime) {
        macroTwo.highs.push(high(0));
        macroTwo.lows.push(low(0));
        macroTwo.times.push(time(0));

        const anchor = macroTwo.times.at(0);
        const max = Math.max(...macroTwo.highs) + PRICE_OFFSET;
        const min = Math.min(...macroTwo.lows) - PRICE_OFFSET;
        
        const durationTime = (macroTwo.endTime - macroTwo.startTime) * ONE_MINUTE_IN_SECONDS;

        const hId = rayLine(newPoint(anchor, max), newPoint(anchor + durationTime, max), { linewidth: 2, linecolor: inputs.lineColor, textcolor: inputs.lineColor, showLabel: true, extendRight: false }, macroTwo.label);
        const lId = rayLine(newPoint(anchor, min), newPoint(anchor + durationTime, min), { linewidth: 2, linecolor: inputs.lineColor, showLabel: false, extendRight: false });

        if (hId && macroTwo.highDrawingIds.length > 0) deleteDrawingById(macroTwo.highDrawingIds.shift());
        if (hId) macroTwo.highDrawingIds.push(hId);
        if (lId && macroTwo.lowDrawingIds.length > 0) deleteDrawingById(macroTwo.lowDrawingIds.shift());
        if (lId) macroTwo.lowDrawingIds.push(lId);
    }

    // --- MARKET OPEN LOGIC (9:30 - 9:33) ---
    if (dayOffsetMinutes >= marketOpen.startTime && dayOffsetMinutes <= marketOpen.endTime) {
        marketOpen.highs.push(high(0));
        marketOpen.lows.push(low(0));
        marketOpen.times.push(time(0));

        const anchor = marketOpen.times.at(0);
        const max = Math.max(...marketOpen.highs) + PRICE_OFFSET;
        const min = Math.min(...marketOpen.lows) - PRICE_OFFSET;
        
        const durationTime = (marketOpen.endTime - marketOpen.startTime) * ONE_MINUTE_IN_SECONDS;

        const hId = rayLine(newPoint(anchor, max), newPoint(anchor + durationTime, max), { linewidth: 2, linecolor: inputs.lineColor, textcolor: inputs.lineColor, showLabel: true, extendRight: false }, marketOpen.label);
        const lId = rayLine(newPoint(anchor, min), newPoint(anchor + durationTime, min), { linewidth: 2, linecolor: inputs.lineColor, showLabel: false, extendRight: false });

        if (hId && marketOpen.highDrawingIds.length > 0) deleteDrawingById(marketOpen.highDrawingIds.shift());
        if (hId) marketOpen.highDrawingIds.push(hId);
        if (lId && marketOpen.lowDrawingIds.length > 0) deleteDrawingById(marketOpen.lowDrawingIds.shift());
        if (lId) marketOpen.lowDrawingIds.push(lId);
    }

    // --- MACRO 10:30 LOGIC (10:27 - 10:33) ---
    if (dayOffsetMinutes >= macroTenThirty.startTime && dayOffsetMinutes <= macroTenThirty.endTime) {
        macroTenThirty.highs.push(high(0));
        macroTenThirty.lows.push(low(0));
        macroTenThirty.times.push(time(0));

        const anchor = macroTenThirty.times.at(0);
        const max = Math.max(...macroTenThirty.highs) + PRICE_OFFSET;
        const min = Math.min(...macroTenThirty.lows) - PRICE_OFFSET;
        
        const durationTime = (macroTenThirty.endTime - macroTenThirty.startTime) * ONE_MINUTE_IN_SECONDS;

        const hId = rayLine(newPoint(anchor, max), newPoint(anchor + durationTime, max), { linewidth: 2, linecolor: inputs.lineColor, textcolor: inputs.lineColor, showLabel: true, extendRight: false }, macroTenThirty.label);
        const lId = rayLine(newPoint(anchor, min), newPoint(anchor + durationTime, min), { linewidth: 2, linecolor: inputs.lineColor, showLabel: false, extendRight: false });

        if (hId && macroTenThirty.highDrawingIds.length > 0) deleteDrawingById(macroTenThirty.highDrawingIds.shift());
        if (hId) macroTenThirty.highDrawingIds.push(hId);
        if (lId && macroTenThirty.lowDrawingIds.length > 0) deleteDrawingById(macroTenThirty.lowDrawingIds.shift());
        if (lId) macroTenThirty.lowDrawingIds.push(lId);
    }

    // --- MACRO 11:30 LOGIC (11:27 - 11:33) ---
    if (dayOffsetMinutes >= macroElevenThirty.startTime && dayOffsetMinutes <= macroElevenThirty.endTime) {
        macroElevenThirty.highs.push(high(0));
        macroElevenThirty.lows.push(low(0));
        macroElevenThirty.times.push(time(0));

        const anchor = macroElevenThirty.times.at(0);
        const max = Math.max(...macroElevenThirty.highs) + PRICE_OFFSET;
        const min = Math.min(...macroElevenThirty.lows) - PRICE_OFFSET;
        
        const durationTime = (macroElevenThirty.endTime - macroElevenThirty.startTime) * ONE_MINUTE_IN_SECONDS;

        const hId = rayLine(newPoint(anchor, max), newPoint(anchor + durationTime, max), { linewidth: 2, linecolor: inputs.lineColor, textcolor: inputs.lineColor, showLabel: true, extendRight: false }, macroElevenThirty.label);
        const lId = rayLine(newPoint(anchor, min), newPoint(anchor + durationTime, min), { linewidth: 2, linecolor: inputs.lineColor, showLabel: false, extendRight: false });

        if (hId && macroElevenThirty.highDrawingIds.length > 0) deleteDrawingById(macroElevenThirty.highDrawingIds.shift());
        if (hId) macroElevenThirty.highDrawingIds.push(hId);
        if (lId && macroElevenThirty.lowDrawingIds.length > 0) deleteDrawingById(macroElevenThirty.lowDrawingIds.shift());
        if (lId) macroElevenThirty.lowDrawingIds.push(lId);
    }
};

/**
 * Calculates the current offset minutes of the day based on a specific timezone.
 * * @param {number} timestamp - Unix timestamp in seconds.
 * @param {number} timezoneOffset - Timezone offset in hours (default is -5).
 * @returns {number} Total minutes elapsed in the day adjusted by the offset.
 */
const getDayOffsetMinutes = (timestamp, timezoneOffset = -4) => {
    const SECONDS_IN_DAY = 86400;
    const SECONDS_IN_HOUR = 3600;
    const MINUTES_IN_HOUR = 60;

    // Get the remainder of seconds in the current day
    const secondsInDay = timestamp % SECONDS_IN_DAY;

    // Calculate the current hour (UTC)
    const hour = Math.floor(secondsInDay / SECONDS_IN_HOUR);

    // Calculate the current minute
    // Keeping your original logic: finding remainder of hour, then dividing by 60
    const minute = Math.floor(secondsInDay % SECONDS_IN_HOUR) / MINUTES_IN_HOUR;

    // Final calculation applying the timezone shift
    // (hour + timezoneOffset) * 60 + minute
    const mins = (hour + timezoneOffset) * MINUTES_IN_HOUR + minute;

    return mins;
};

/**
 * Extracts the numerical offset from a UTC string (e.g., "UTC-5" -> -5)
 * @param {string} timezoneStr 
 * @returns {number}
 */
const convertTimezoneStr = (timezoneStr) => {
    const match = timezoneStr.match(/[+-]?\d+/);

    return match ? parseInt(match[0], 10) : 0;
};
