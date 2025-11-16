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
