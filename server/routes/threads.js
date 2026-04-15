const express = require('express');
const router = express.Router();
const threadController = require('../controllers/threadController');

router.get('/', threadController.getAll);
router.get('/find/:id', threadController.findOne);
router.post('/', threadController.createThread);
router.put('/changeExecution', threadController.changeExecution);
router.put('/:id', threadController.updateThread);
router.delete('/:id', threadController.deleteThread);

module.exports = router;