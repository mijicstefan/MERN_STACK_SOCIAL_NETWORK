const express = require("express");
const { getUsersAdmin } = require("../controllers/admin");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();
router
    .route('/').get(protect, authorize, getUsersAdmin);

module.exports = router;