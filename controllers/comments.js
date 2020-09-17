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

// @desc      Get All Users, only admin
// @route     GET /api/v1/users/admin
// @access    Private, only for admin.
exports.getUsersAdmin = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({ success: true, data: users });
});

// @desc      Get single user
// @route     GET /api/v1/users/:id
// @access    Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
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

// @desc      Update user
// @route     PUT /api/v1/users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  //Prvo nadjemo usera sa tim id-em.
  let user = await User.findById(req.params.id);

  //Ako ne postoji, bacamo error.
  if (!user) {
    return next(
      new ErrorResponse(`User not found with an id of ${req.params.id}`, 404)
    );
  }

  //Make sure user wants to do self update, user can't upload other users.
  if (req.params.id === req.user.id || req.user.role === "admin") {
    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      user: user,
    });
  } else {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this resource.`,
        401
      )
    );
  }
});

// @desc      Delete user
// @route     DELETE /api/v1/users
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  //Ako ne postoji, bacamo error.
  if (!user) {
    return next(
      new ErrorResponse(`User not found with an id of ${req.params.id}`, 404)
    );
  }

  //Make sure user wants to do self delete, user can't delete other users if he's not an admin.
  if (req.params.id === req.user.id || req.user.role === "admin") {
    //Remove the document from the db.
    user.remove();
    res.status(200).json({
      success: true,
      data: {},
    });
  } else {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this resource.`,
        401
      )
    );
  }
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
