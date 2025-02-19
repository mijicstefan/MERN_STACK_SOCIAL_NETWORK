const express = require("express");
const { register, login, getMe, forgotPassword, updateDetails, logout } = require("../controllers/auth");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout)
router.get('/me', protect, getMe);
router.put('/updateDetails', protect, updateDetails);
router.post('/forgotpassword', forgotPassword);

module.exports = router;
 