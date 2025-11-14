const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EventLogSchema = new Schema({
eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
updatedBy: { type: Schema.Types.ObjectId, ref: 'Profile' },
previous: { type: Schema.Types.Mixed },
current: { type: Schema.Types.Mixed },
updatedAtUTC: { type: Date, default: () => new Date() }
});


module.exports = mongoose.model('EventLog', EventLogSchema);