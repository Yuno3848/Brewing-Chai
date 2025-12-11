import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const Sidebar = () => {
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return <div>loading</div>;
  }
  return (
    <div className="flex flex-col justify-evenly items-center min-h-lvh">
      <div className="flex flex-col justify-center items-center gap-2 ">
        <img
          className="rounded-[50%] h-32 w-32"
          src={user?.avatar?.url}
          alt=""
        />
        <p>{`${user?.firstName} ${user?.lastName}`}</p>
        <p>{user.email || "test name"}</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-8 mb-40">
        <Link to="edit-avatar">Edit Avatar</Link>
        <Link to="account-security">Account Security</Link>
        <Link to="notification">Notifications</Link>
        <Link to="delete-account">Delete Account</Link>
      </div>
    </div>
  );
};

export default Sidebar;
