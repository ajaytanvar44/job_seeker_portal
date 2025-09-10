import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide job title"],
    minLength: [3, "Job title must be at least 3 characters long"],
    maxLength: [50, "Job title must be at most 50 characters long"]
  },
  description: {
    type: String,
    required: [true, "Please provide job description"],
    minLength: [10, "Job description must be at least 10 characters long"],
    maxLength: [500, "Job description must be at most 500 characters long"]
  },
  category: {
    type: String,
    required: [true, "Please provide job category"],
    minLength: [3, "Job category must be at least 3 characters long"]
  },
  country: {
    type: String,
    required: [true, "Please provide job country"],
    minLength: [3, "Job country    must be at least 3 characters long"]
  },
  city: {
    type: String,
    required: [true, "Please provide job city"],
    minLength: [3, "Job city must be at least 3 characters long"]
  },
  location: {
    type: String,
    required: [true, "Please provide job location"],
    minLength: [50, "Job location must be at least 50 characters long"]
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "fixedSalary must be at least 4 characters long"],
    maxLength: [9, "fixedSalary must be at most 9 characters long"]
  },
  SalaryFrom: {
    type: Number,
    minLength: [4, "SalaryFrom must be at least 4 digits long"],
    maxLength: [9, "SalaryFrom must be at most 9 digits long"]
  },
  SalaryTo: {
    type: Number,
    minLength: [4, "SalaryTo must be at least 4 digits long"],
    maxLength: [9, "SalaryTo must be at most 9 digits long"]
  },
  expired: {
    type: Boolean,
    default: false
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please provide job poster"]
  },
});

export const Job = mongoose.model("Job", jobSchema);
