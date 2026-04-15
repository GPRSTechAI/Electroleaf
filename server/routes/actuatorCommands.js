const express = require('express');
const router = express.Router();
const actuatorController = require('../controllers/actuatorCommandController');


router.get('/', actuatorController.getAllCommands);
router.get('/actuator/:actuatorId', actuatorController.getActuatorCommands);
router.post('/', actuatorController.runActuator);
router.delete('/', actuatorController.clearAll);

module.exports = router;