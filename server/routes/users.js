const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware')

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/find/:id', userController.findUser)
router.put('/:id', userController.updateUser);
router.put('/privileges/:id', userController.updatePrivileges);
router.delete('/:id', userController.deleteUser);

module.exports = router;