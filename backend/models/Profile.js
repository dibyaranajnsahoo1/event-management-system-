const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProfileSchema = new Schema({
name: { type: String, required: true },
});

module.exports = mongoose.model('Profile', ProfileSchema);