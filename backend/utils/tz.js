const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

// Extend dayjs with UTC + Timezone support
dayjs.extend(utc);
dayjs.extend(timezone);

module.exports = dayjs;
