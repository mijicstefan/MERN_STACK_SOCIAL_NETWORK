const Blog = require("../models/Blog");
const asyncHandler = require("../middleware/async");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const upload = require("../utils/file-upload");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get Blogs
// @route     GET /api/v1/blogs
// @access    Private, only authenticated users.
exports.getBlogs = asyncHandler(async (req, res, next) => {
  const blogs = await Blog.find({});

  res.status(200).json({ success: true, data: [blogs] });
});


// @desc      Create Blog
// @route     POST /api/v1/blogs
// @access    Private
exports.createBlog = asyncHandler(async (req, res, next) => {
  req.body.blogger = req.user;
  console.log(req.body);

  const blog = await Blog.create(req.body);
  res.status(201).json({
    success: true,
    data: blog
  });
});

// @desc      Upload Photo
// @route     POST /api/v1/users/photo
// @access    Private/Admin
exports.uploadPhoto = asyncHandler(async (req, res, next) => {
  console.log(`Otvorena ruta za sliku`);
  const singelUpload = upload.single("image");
  singelUpload(req, res, function (err) {
    return res.json(`imageUrl: "check aws dashboard"`);
  });
});
