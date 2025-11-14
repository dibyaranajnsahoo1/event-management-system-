const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProfileSchema = new Schema({
name: { type: String, required: true },
timezone: { type: String, default: 'UTC' }
});


module.exports = mongoose.model('Profile', ProfileSchema);