const Event = require('../models/Event');


exports.createEvent = async (req, res) => {
/* expected body:
profiles: [id],
timezone: 'Asia/Kolkata',
startISO: '2025-10-12T12:00',
endISO: '2025-10-12T14:00'
*/
const { profiles, timezone, startISO, endISO } = req.body;
if (!profiles || !profiles.length) return res.status(400).json({ message: 'Profiles required' });
if (!timezone) return res.status(400).json({ message: 'Timezone required' });


const start = dayjs.tz(startISO, timezone);
const end = dayjs.tz(endISO, timezone);
if (end.isBefore(start)) return res.status(400).json({ message: 'End must be after start' });


const ev = new Event({
profiles,
timezone,
startTimeUTC: start.toDate(),
endTimeUTC: end.toDate(),
createdAtUTC: new Date(),
updatedAtUTC: new Date()
});
await ev.save();
res.json(ev);
};


exports.getEvents = async (req, res) => {
const { profileId } = req.query;
const filter = {};
if (profileId) filter.profiles = profileId;
const events = await Event.find(filter).populate('profiles').lean();
res.json(events);
};


exports.updateEvent = async (req, res) => {
const { id } = req.params;
const { profiles, timezone, startISO, endISO, updatedBy } = req.body;
const event = await Event.findById(id);
if (!event) return res.status(404).json({ message: 'Not found' });


const previous = {
profiles: event.profiles,
timezone: event.timezone,
startTimeUTC: event.startTimeUTC,
endTimeUTC: event.endTimeUTC,
};


if (profiles) event.profiles = profiles;
if (timezone) event.timezone = timezone;
if (startISO) event.startTimeUTC = dayjs.tz(startISO, timezone || event.timezone).toDate();
if (endISO) event.endTimeUTC = dayjs.tz(endISO, timezone || event.timezone).toDate();


event.updatedAtUTC = new Date();
await event.save();


const current = {
profiles: event.profiles,
timezone: event.timezone,
startTimeUTC: event.startTimeUTC,
endTimeUTC: event.endTimeUTC,
};


const log = new EventLog({ eventId: event._id, updatedBy, previous, current, updatedAtUTC: new Date() });
await log.save();


res.json({ event, log });
};