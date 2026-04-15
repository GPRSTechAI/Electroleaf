const express = require('express');
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const router = express.Router();
const actuatorController = require('../controllers/actuatorController');

router.get('/', actuatorController.getActuators);
router.get('/find/:id', actuatorController.viewActuator);
router.post('/', upload.single('file'), actuatorController.createActuator);
router.put('/:id', upload.single('file'), actuatorController.updateActuator);
// router.put('/setCurrentCommand/:actuatorId', actuatorController.setCurrentCommand);
router.delete('/:id', actuatorController.deleteActuator);

module.exports = router;