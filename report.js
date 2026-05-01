/* ============================================================
   NTAG Southwest Incentive Report — Shared Logic
   ============================================================
   Loaded by BOTH index.html (viewer) and tool.html (generator).
   Exposes a global `Report` object with the public API:
       Report.classify(rawRow)            -> { tier, level, reward }
       Report.processWeek(rows, prevRows) -> processedData[]
       Report.render(state, container)    -> renders into container
       Report.attachStationClicks(state)  -> wires station click handlers
       Report.showPanel(station, state)   -> opens detail panel
       Report.closePanel()                -> closes panel
       Report.utils.*                     -> date helpers, etc.
   ============================================================ */

(function (window) {
'use strict';

/* ============================================================
   1. CONSTANTS
   ============================================================ */
const TOTAL_FY_DAYS = 233;

const PROD_DAY_SCHEDULE = {
    '01OCT24': 233, '02OCT24': 232, '03OCT24': 231, '04OCT24': 230, '07OCT24': 229,
    '08OCT24': 228, '09OCT24': 227, '10OCT24': 226, '11OCT24': 225, '14OCT24': 224,
    '15OCT24': 223, '16OCT24': 222, '17OCT24': 221, '18OCT24': 220, '21OCT24': 219,
    '22OCT24': 218, '23OCT24': 217, '24OCT24': 216, '25OCT24': 215, '28OCT24': 214,
    '01NOV24': 213, '03NOV24': 212, '04NOV24': 211, '05NOV24': 210, '06NOV24': 209,
    '07NOV24': 208, '12NOV24': 207, '13NOV24': 206, '14NOV24': 205, '17NOV24': 204,
    '18NOV24': 203, '19NOV24': 202, '20NOV24': 201, '21NOV24': 200, '24NOV24': 199,
    '25NOV24': 198, '26NOV24': 197,
    '01DEC25': 197, '02DEC25': 196, '03DEC25': 195, '04DEC25': 194, '08DEC25': 193,
    '09DEC25': 192, '10DEC25': 191, '11DEC25': 190, '12DEC25': 189, '15DEC25': 188,
    '16DEC25': 187, '17DEC25': 186, '18DEC25': 185, '19DEC25': 184,
    '05JAN26': 183, '06JAN26': 182, '07JAN26': 181, '08JAN26': 180, '09JAN26': 179,
    '12JAN26': 178, '13JAN26': 177, '14JAN26': 176, '15JAN26': 175, '16JAN26': 174,
    '20JAN26': 173, '21JAN26': 172, '22JAN26': 171, '23JAN26': 170, '26JAN26': 169,
    '27JAN26': 168, '28JAN26': 167, '29JAN26': 166, '30JAN26': 165,
    '02FEB26': 165, '03FEB26': 164, '04FEB26': 163, '05FEB26': 162, '06FEB26': 161,
    '09FEB26': 160, '10FEB26': 159, '11FEB26': 158, '12FEB26': 157, '13FEB26': 156,
    '17FEB26': 155, '18FEB26': 154, '19FEB26': 153, '20FEB26': 152, '23FEB26': 151,
    '24FEB26': 150, '25FEB26': 149, '26FEB26': 148, '27FEB26': 147,
    '02MAR26': 146, '03MAR26': 145, '04MAR26': 144, '05MAR26': 143, '09MAR26': 142,
    '10MAR26': 141, '11MAR26': 140, '12MAR26': 139, '16MAR26': 138, '17MAR26': 137,
    '18MAR26': 136, '19MAR26': 135, '20MAR26': 134, '23MAR26': 133, '24MAR26': 132,
    '25MAR26': 131, '26MAR26': 130, '30MAR26': 129, '31MAR26': 128,
    '01APR26': 127, '02APR26': 126, '06APR26': 125, '07APR26': 124, '08APR26': 123,
    '09APR26': 122, '10APR26': 121, '13APR26': 120, '14APR26': 119, '15APR26': 118,
    '16APR26': 117, '20APR26': 116, '21APR26': 115, '22APR26': 114, '23APR26': 113,
    '24APR26': 112, '27APR26': 111, '28APR26': 110, '29APR26': 109, '30APR26': 108
};

const HOLIDAYS = ['19JAN26'];
const WINTER_BREAK_START = new Date(2025, 11, 20);
const WINTE
