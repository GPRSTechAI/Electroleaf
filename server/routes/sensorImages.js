const express = require('express');
const router = express.Router();
const sensorImageController = require('../controllers/sensorImageController')

router.post('/', sensorImageController.uploadImage);
router.get('/forSensor/:sensorId', sensorImageController.getSensorImages);

module.exports = router;