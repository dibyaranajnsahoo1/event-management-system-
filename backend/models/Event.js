const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EventSchema = new Schema({
profiles: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
timezone: { type: String, required: true },
startTimeUTC: { type: Date, required: true },
endTimeUTC: { type: Date, required: true },
createdAtUTC: { type: Date, default: () => new Date() },
updatedAtUTC: { type: Date, default: () => new Date() }
});


module.exports = mongoose.model('Event', EventSchema);