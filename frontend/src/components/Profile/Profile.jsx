import React, { useContext } from "react";
import { Context } from "../../main";

const Profile = () => {
  const { user } = useContext(Context);

  if (!user) {
    return <h2 className="text-center mt-5">No user data available</h2>;
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
};

export default Profile;
