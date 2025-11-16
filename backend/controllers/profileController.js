const Profile = require('../models/Profile');


exports.createProfile = async (req, res) => {
const { name } = req.body;
if (!name) return res.status(400).json({ message: 'Name required' });
const p = new Profile({ name });
await p.save();
res.json(p);
};

exports.listProfiles = async (req, res) => {
const profiles = await Profile.find().lean();
res.json(profiles);
};

exports.updateTimezone = async (req, res) => {
const { id } = req.params;
const { timezone } = req.body;
const profile = await Profile.findByIdAndUpdate(id, { timezone }, { new: true });
res.json(profile);
};