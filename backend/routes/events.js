const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/eventController');


router.post('/', ctrl.createEvent);
router.get('/', ctrl.getEvents);
router.put('/:id', ctrl.updateEvent);

module.exports = router;