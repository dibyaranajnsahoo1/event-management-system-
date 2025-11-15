const Event = require('../models/Event');
const EventLog = require('../models/EventLog');
const dayjs = require('../utils/tz');

// 🟢 Helper: Safe parse
function parseWithTZ(iso, tz) {
  const d = dayjs(iso).tz(tz);
  if (!d.isValid()) {
    console.error("Invalid Date Received:", iso, "Timezone:", tz);
  }
  return d;
}

exports.createEvent = async (req, res) => {
  const { profiles, timezone, startISO, endISO } = req.body;

  if (!profiles || !profiles.length)
    return res.status(400).json({ message: "Profiles required" });

  if (!timezone)
    return res.status(400).json({ message: "Timezone required" });

  // 🟢 FIXED PARSING
  const start = parseWithTZ(startISO, timezone);
  const end = parseWithTZ(endISO, timezone);

  if (!start?.isValid() || !end?.isValid()) {
    return res.status(400).json({ message: "Invalid date format received" });
  }

  if (end.isBefore(start))
    return res.status(400).json({ message: "End must be after start" });

  const ev = new Event({
    profiles,
    timezone,
    startTimeUTC: start.toDate(),
    endTimeUTC: end.toDate(),
    createdAtUTC: new Date(),
    updatedAtUTC: new Date()
  });

  await ev.save();
  return res.json(ev);
};


exports.getEvents = async (req, res) => {
  const { profileId } = req.query;
  const filter = {};
  if (profileId) filter.profiles = profileId;

  const events = await Event.find(filter).populate("profiles").lean();
  res.json(events);
};


exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { profiles, timezone, startISO, endISO, updatedBy } = req.body;

  const event = await Event.findById(id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  const previous = {
    profiles: event.profiles,
    timezone: event.timezone,
    startTimeUTC: event.startTimeUTC,
    endTimeUTC: event.endTimeUTC,
  };

  if (profiles) event.profiles = profiles;
  if (timezone) event.timezone = timezone;

  // 🟢 FIXED PARSING FOR UPDATE ALSO
  if (startISO) {
    const start = parseWithTZ(startISO, timezone || event.timezone);
    if (!start.isValid()) return res.status(400).json({ message: "Invalid start time" });
    event.startTimeUTC = start.toDate();
  }

  if (endISO) {
    const end = parseWithTZ(endISO, timezone || event.timezone);
    if (!end.isValid()) return res.status(400).json({ message: "Invalid end time" });
    event.endTimeUTC = end.toDate();
  }

  event.updatedAtUTC = new Date();
  await event.save();

  const current = {
    profiles: event.profiles,
    timezone: event.timezone,
    startTimeUTC: event.startTimeUTC,
    endTimeUTC: event.endTimeUTC,
  };

  const log = new EventLog({
    eventId: event._id,
    updatedBy,
    previous,
    current,
    updatedAtUTC: new Date(),
  });

  await log.save();

  return res.json({ event, log });
};
