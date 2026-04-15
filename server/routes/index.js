const express = require('express');
const router = express.Router();

router.use('/sensors', require('./sensors'));
router.use('/sensorReadings', require('./sensorReadings'));
router.use('/sensorImages', require('./sensorImages'));

router.use('/actuators', require('./actuators'));
router.use('/commands', require('./actuatorCommands'));

router.use('/threads', require('./threads'));
router.use('/tanks', require('./tanks'));
router.use('/thresholds', require('./thresholds'));

router.use('/users', require('./users'))
router.use('/auth', require('./auth'))
router.use('/flask-check', require('./flask'))
router.use('/farm', require('./farm'))

module.exports = router;