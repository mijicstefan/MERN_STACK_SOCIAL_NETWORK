const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
// const { use } = require("../routes/auth");
const sendEmail = require("../utils/sendEmail");

// @desc   Register user
// @route  POST /api/v1/auth/register
// @access Public
exports.register = asyncHandler(async (req,res, next) => {
    const { name, email, password, role } = req.body;

    //Create user
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    //Create token 
    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token });

});


// @desc   Login user
// @route  POST /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req,res, next) => {
    const { email, password } = req.body;

    //Validate email & password because it is not running through the model
    //have to check it manualy

    if(!email || !password) {
        return next(new ErrorResponse(`Please provide an email and password!`, 400));

    }

    //Check for user, find one finds only one record
    //In user model in password field we set up a select  = false for a password
    const user = await User.findOne({email: email}).select('+password');

    if(!user) {
        return next(new ErrorResponse(`Invalid credentials!`, 401));
    }

    //Check if password matched
    //This function is a promise
    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        return next(new ErrorResponse(`Invalid credentials!`, 401));
    }

    //This function has been written below.
    //If code comes up to this point, it means user has been found,
    //we just need to make httpOnly cookie response with a token,
    //then send a response to a client 
    sendTokenResponse(user, 200, res);

});

// @desc   Get current logged in user
// @route  GET /api/v1/auth/me
// @access Private
exports.getMe = asyncHandler(async(req, res, next) => {
    console.log(req.user);
    const user = await User.findById(req.user.id);
    console.log(`User in getMe funkciji: ${user}`);

    res.status(200).json({ 
        success:true,
        data: user
     });
});



//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    //Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true

    };

    //U cookie tabu u postmanu, subtab secured ce biti false
    //sto znaci da ce cookie biti poslat preko http,
    //a samo oko je u production modu, onda cemo staviti secure flag na true
    // i cookie ce biti poslat preko https-a.
    if(process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ 
        success: true,
        token
    });
};


// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
  
    if (!user) {
      return next(new ErrorResponse('There is no user with that email', 404));
    }
  
    // Get reset token
    const resetToken = user.getResetPasswordToken();
  
    await user.save({ validateBeforeSave: false });
  
    // Create reset url
    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/auth/resetpassword/${resetToken}`;

    console.log(resetUrl);
  
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: 'Password reset token',
        message: message
      });
  
      res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
      console.log(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return next(new ErrorResponse('Email could not be sent', 500));
    }
  });

// @desc   Update user details
// @route  PUT /api/v1/auth/updatedetails
// @access Private
exports.updateDetails = asyncHandler(async(req, res, next) => {
    const fieldsToUpdate = {
        name: req.body.name,
        email:req.body.email
    };
    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new:true,
        runValidators: true
    });

    res.status(200).json({ 
        success:true,
        data: user
     });
});



// @desc   Update user details
// @route  GET /api/v1/auth/updatedetails
// @access Private
exports.logout = asyncHandler(async(req, res, next) => {
   res.cookie('token', 'none', {
       expires: new Date(Date.now() + 10 * 1000),
       httpOnly: true
   });

    res.status(200).json({ 
        success:true,
        data: {}
     });
});


