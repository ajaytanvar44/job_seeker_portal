import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from '../utils/errorHandler.js';
import { User } from '../models/userSchema.js';
import { sendToken } from '../utils/jwtToken.js';



export const register = catchAsyncError(async (req, res, next) => {
  // fallback {} so destructuring doesn't throw error
  const { name, email, phone, role, password } = req.body || {};

  if (!name || !email || !phone || !role || !password) {
    return next(new ErrorHandler("Please fill full registration form", 400));
  }

  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already exists", 400));
  }

  const user = await User.create({
    name,
    email,
    phone,
    role,
    password
  });

  sendToken(user, 200, res, "User Registered Successfully");
});


export const login = catchAsyncError(async (req, res, next) => {
  const { email, password ,role} = req.body || {};

  if (!email || !password || !role) {
    return next(new ErrorHandler("Please enter email , password and role", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
   
  if(user.role !== role){
    return next(new ErrorHandler("User with this role not found!", 400));  
  }

  sendToken(user, 200, res, "User Logged In Successfully");
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
      //sameSite: "None",   // important if frontend is on a different domain (React + API)
      //secure: true        // required when using HTTPS in production
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});


export const getUser = catchAsyncError(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    });
});
