const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/profileController');


router.post('/', ctrl.createProfile);
router.get('/', ctrl.listProfiles);

module.exports = router;