const Comment = require("../models/Comment");
const asyncHandler = require("../middleware/async");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const upload = require("../utils/file-upload");
const ErrorResponse = require("../utils/errorResponse");

// @desc      Get Blogs
// @route     GET /api/v1/blogs
// @access    Private, only authenticated users.
exports.getComments = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({});

  res.status(200).json({ success: true, data: comments });
});



// @desc      Create Comment
// @route     POST /api/v1/comments
// @access    Private
exports.createComment = asyncHandler(async (req, res, next) => {
  req.body.blogger = req.user;
  console.log('req.body iz createComent funckije: ', req.body);

  const comment = await Comment.create(req.body);
  res.status(201).json({
    success: true,
    data: comment
  });
});



