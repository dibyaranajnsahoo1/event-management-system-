import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function toUserTZ(dateISO, tz, format = 'MMM D, YYYY [at] h:mm a') {
  return dayjs(dateISO).tz(tz).format(format);
}

export function parseLocalToISO(dateStrTimeStr, tz) {
  return dayjs.tz(dateStrTimeStr, tz).toISOString();
}
