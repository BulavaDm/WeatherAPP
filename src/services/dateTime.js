const months = {
    0 : {
        full: 'January',
        short: 'JAN'
    },
    1: {
        full: 'February',
        short: 'FEB'
    },
    2: {
        full: 'March',
        short: 'MAR'
    },
    3: {
        full: 'April',
        short: 'APR'
    },
    4: {
        full: 'May',
        short: 'MAY'
    },
    5: {
        full: 'June',
        short: 'JUN'
    },
    6: {
        full: 'July',
        short: 'JUL'
    },
    7: {
        full: 'August',
        short: 'AUG'
    },
    8: {
        full: 'September',
        short: 'SEP'
    },
    9: {
        full: 'October',
        short: 'OCT'
    },
    10: {
        full: 'November',
        short: 'NOV'
    },
    11: {
        full: 'December',
        short: 'DEC'
    }
}

const days = {
    0 : {
        full: 'Sunday',
        short: 'SUN'
    },
    1: {
        full: 'Monday',
        short: 'MON'
    },
    2: {
        full: 'Tuesday',
        short: 'TUE'
    },
    3: {
        full: 'Wednesday',
        short: 'WED'
    },
    4: {
        full: 'Thursday',
        short: 'THU'
    },
    5: {
        full: 'Friday',
        short: 'FRI'
    },
    6: {
        full: 'Saturday',
        short: 'SAT'
    },
}

function getNameMonth(dateTime, type = 'full') {
    const monthIndexNumber = new Date(dateTime * 1000).getUTCMonth();
    let monthName = '';

    switch (type) {
        case 'full':
            monthName = months[monthIndexNumber].full;
            break;
        case 'short':
            monthName = months[monthIndexNumber].short;
            break;   
    }


    return monthName;
}

function getDayName(dateTime, type = 'full') {
    const dayIndexNumber = new Date(dateTime * 1000).getUTCDay();
    let dayName = '';

    switch (type) {
        case 'full':
            dayName = days[dayIndexNumber].full;
            break;
        case 'short':
            dayName = days[dayIndexNumber].short;
            break;   
    }


    return dayName;
}

function getDate(dateTime) {
    return new Date(dateTime * 1000).getUTCDate();
}

export { 
    getNameMonth,
    getDayName,
    getDate
}