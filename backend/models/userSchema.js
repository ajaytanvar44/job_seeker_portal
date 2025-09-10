import mongoose from "mongoose";
import validator from "validator";
import bcypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [30, "Name must be at most 30 characters"],
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please enter a valid email address"],
        unique: true
    },
    phone: {
        type: Number,
        required: [true, "Please enter your phone number"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [8, "Password must be at least 8 characters"],
        maxlength: [32, "Password must be at most 32   characters"],
        select: false, // won't show password in any response
    },
    role: {
        type: String,
        required: [true, "Please enter your role"],
        enum: ["Job Seeker", "Employer"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

//Hashing the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcypt.hash(this.password, 10);
});

//Comparing passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcypt.compare(enteredPassword, this.password);
};

//Generating JWT token for authorization
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

    
export const User = mongoose.model("User", userSchema); 