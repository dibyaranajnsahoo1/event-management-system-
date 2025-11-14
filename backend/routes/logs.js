const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/logController');


router.get('/:id/logs', ctrl.getLogs);


module.exports = router;