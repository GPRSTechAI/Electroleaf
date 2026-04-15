const express = require('express');
const router = express.Router();
const tankController = require('../controllers/tankController');

router.get('/', tankController.getTanks);
router.get('/find/:id', tankController.findOne);
router.post('/', tankController.createTank);
router.put('/reading/:id', tankController.updateReading);
router.put('/:id', tankController.updateTank);
router.delete('/:id', tankController.deleteTank);

module.exports = router;