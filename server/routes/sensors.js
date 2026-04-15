const express = require('express');
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.get('/', sensorController.getSensors);
router.get('/parameters', sensorController.getAllParameters);
router.get('/boards', sensorController.getBoards);
router.get('/boards/:board', sensorController.sensorsOnBoard);
router.get('/find/:id', sensorController.findOne);
router.post('/', sensorController.createSensor);
router.put('/', sensorController.updateSensor);
router.delete('/sensor/:id', sensorController.deleteSensor);
router.delete('/parameter/:sensorId/:parameterId', sensorController.removeParameter);
router.post('/image/sensor/:sensorId', upload.single('file'), sensorController.uploadSensorImage)
router.post('/image/parameter/:parameterId', upload.single('file'), sensorController.uploadParameterImage)
router.delete('/image/sensor/:sensorId', sensorController.removeSensorImage);
router.delete('/image/parameter/:parameterId', sensorController.removeParameterImage)

module.exports = router;