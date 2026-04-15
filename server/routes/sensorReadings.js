const express = require('express');
const router = express.Router();
const sensorReadingController = require('../controllers/sensorReadingController')

router.get('/', sensorReadingController.getAll);
router.get('/totalCount', sensorReadingController.totalCount);
router.get('/sensors', sensorReadingController.groupBySensor);
router.get('/find/:readingId', sensorReadingController.findOne);
router.get('/sensors/:sensorId', sensorReadingController.getSensorReadings);
router.get('/dashboard/sensors/:sensorId', sensorReadingController.getDashboardSensorReadings);
// router.get('/forSensor/:sensorId/:limit/:lt', sensorReadingController.getSensorReadingsWithLimitAndTime);
router.get('/dashboard/board/:board', sensorReadingController.forDashboardBoard);
router.get('/dashboard/parameter/:sensorId/:parameterId', sensorReadingController.forDashboardParameter);
router.post('/', sensorReadingController.addReading);
router.put('/:id', sensorReadingController.updateReading);
// router.delete('/clearAll', sensorReadingController.clearAllReadings);
router.delete('/:id', sensorReadingController.deleteSensorReading);
// router.get('/allReadings/:limit/:lt', sensorReadingController.getAllNReadingsWithLimitAndTime);

module.exports = router;