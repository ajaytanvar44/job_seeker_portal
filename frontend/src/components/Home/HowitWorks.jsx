import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How JobZone Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                Join us today and unlock new opportunities! By creating an account, you can track your applications, receive personalized job recommendations, and stay updated with the latest career opportunities. Signing up is fast, easy, and completely free.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
                Discover thousands of job opportunities that match your skills and interests. Apply with ease, track your applications, and take the next step in your career journey today.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
                Explore exciting opportunities and apply to positions that match your skills and career goals. Submit your applications easily and stay updated on your progress every step of the way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
