const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

//Protect routes
exports.protect = asyncHandler(async(req, res, next) => {
   let token;
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
       token = req.headers.authorization.split(' ')[1];
   }
//    else if(req.cookies.token) {
//         token = req.cookies.token;
//    }

   //Make sure token exists, dal iz ukikija da l iz authorizacije iz hedera.
   if(!token) {
       return next(new ErrorResponse('Not authorized to access this route.', 401));

   }

   try {
       //verify token
       //We should extract data from payload, and payload looks alike a object.
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
       console.log(`User ID decoded from jwt payload: ${JSON.stringify(decoded.id)}`);
       //Setting user field to req object, that's the logged in user.
       //Get him from the database and asign it to the req.user.
       req.user = await User.findById(decoded.id);
       console.log(`user logged in: ${req.user}`);
   } catch (err) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
   }
   //a izadje iz ovog middleware-a i krene dalje kod da izvrsava.
   next();
});

//Grant access to specific roles
//...roles are csv values of roles permitted to acces the route
exports.authorize = (...roles) => {
    
    return (req, res, next) => {
        console.log(`Userova uloga je: ${req.user.role}`);
        if(!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403));
        }
        //?Next je proslijedjen gore kao parametar u funkciji koja se vraca
        next();
    };
    
};