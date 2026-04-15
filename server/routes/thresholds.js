const express = require('express');
const router = express.Router();
const thresholdController = require('../controllers/thresholdController');

router.get('/', thresholdController.getAll);
router.get('/find/:id', thresholdController.findOne);
router.post('/', thresholdController.createThreshold);
router.put('/status/:id', thresholdController.updateStatus);
router.put('/:id', thresholdController.updateThreshold);
router.delete('/:id', thresholdController.deleteThreshold);

module.exports = router;