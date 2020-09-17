const express = require("express");
const { getComments, createComment } = require("../controllers/comments");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();



router.route('/').get(protect, getComments).post(protect, createComment);


module.exports = router;
 