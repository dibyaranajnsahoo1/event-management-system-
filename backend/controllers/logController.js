const EventLog = require('../models/EventLog');

exports.getLogs = async (req, res) => {
const { id } = req.params; 
const logs = await EventLog.find({ eventId: id }).populate('updatedBy').sort({ updatedAtUTC: -1 }).lean();
res.json(logs);
};