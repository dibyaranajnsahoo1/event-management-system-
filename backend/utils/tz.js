const dayjs = require('dayjs');
require('dayjs/plugin/utc');
require('dayjs/plugin/timezone');


const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');


dayjs.extend(utc);
dayjs.extend(timezone);


module.exports = dayjs;