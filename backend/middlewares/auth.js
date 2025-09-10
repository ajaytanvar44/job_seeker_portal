import {catchAsyncError} from './catchAsyncError.js';
import ErrorHandler from './error.js';
import JWT from 'jsonwebtoken';
import { User } from '../models/userSchema.js';

export const isAuthorized = catchAsyncError(async(req,res,next)=>{
  const {token} = req.cookies;
  if(!token){
    return next(new ErrorHandler('User not authorized', 400));
  }
  const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});


// ✅ role-based authorization
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
