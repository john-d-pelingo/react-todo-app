let moment = require('moment');


console.log(moment().format());

// UNIX timestamps
// January 1st 1970 @ 12:00am -> 0
// January 1st 1970 @ 12:01am -> 60
// December 31st 1969 @ 11:59am -> -60

let now = moment();
console.log('Current timestamp: ', now.unix());

let timestamp = 1480200506;
let currentMoment = moment.unix(timestamp);
console.log('Current moment: ', currentMoment.format('MMM D, YY @hh:mm a'));

// January 3rd, 2016 @ 12:13 AM
console.log('Current moment: ', currentMoment.format('MMMM Do, YYYY @h:mm A'));
