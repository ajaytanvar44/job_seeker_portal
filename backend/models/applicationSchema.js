import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
        minLength: [3, "Name must be at least 3 characters long"],
        maxLength: [30, "Name must be at most 30 characters long"]
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email"],
        required: [true, "Please provide your email"]
    },
    coverLetter: {
        type: String,
        required: [true, "Please provide a cover letter"],
    },
    phone: {
        type: String,
        required: [true, "Please provide your phone number"]
    },
    address: {
        type: String,
        required: [true, "Please provide your address"]
    },
    resume: {
        public_id: {
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    applicantID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: ["Job Seeker"],
            required: true
        }
    },
    employerID: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        role: {
            type: String,
            enum: ["Employer"],
            required: true
        }
    }

});

export const Application = mongoose.model("Application", applicationSchema);
