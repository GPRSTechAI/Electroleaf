const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware')

router.get('/me', authController.getMe)
router.post('/login', authController.loginUser)
router.post('/tokenRefresh', authController.tokenRefresh)
router.post('/changePassword', protect, authController.changePassword)
router.post('/forgotPassword', authController.forgotPassword)
router.post('/resetPassword', authController.resetPassword)

module.exports = router;