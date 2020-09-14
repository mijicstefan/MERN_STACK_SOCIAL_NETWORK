const express = require("express");
const { getBlogs, createBlog } = require("../controllers/blog");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();



router.route('/').get(protect, getBlogs).post(protect, createBlog );


module.exports = router;
 