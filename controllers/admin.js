const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get All Users, only admin
// @route     GET /api/v1/users/admin
// @access    Private, only for admin.
exports.getUsersAdmin = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({success: true, data: users});
});






