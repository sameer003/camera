import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiDashboardFill, RiLogoutCircleLine } from "react-icons/ri";
import { logout } from "../../redux/reducers/user/user.actions";
import { initializeCameras } from "../../redux/reducers/cameras/cameras.actions";

export default function Header() {
  const refresh_token = useSelector((state) => state.user.refresh_token);
  const dispatch = useDispatch();
  const onLogOut = () => {
    dispatch(logout());
    dispatch(initializeCameras([]));
  };

  return (
    <header className="py-3 bg-teal-600 text-white flex justify-center">
      <div className="fixed top-0 left-0"></div>

      <h4 className="flex items-center cursor-pointer">
        <RiDashboardFill className="mr-1" /> {refresh_token ? "Dashboard" : "Login"}
      </h4>
      {refresh_token && (
        <div
          onClick={onLogOut}
          className="fixed right-0 top-0 py-3 px-6 cursor-pointer flex items-center"
        >
          <RiLogoutCircleLine className="mr-1" />
          Log Out
        </div>
      )}
    </header>
  );
}
