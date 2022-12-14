import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const state = useSelector((state) => state.firebase);
  return (
    <div>
      <h1>User: {state.user.displayName}</h1>
    </div>
  );
};

export default Profile;
