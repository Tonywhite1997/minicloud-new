import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiDatabase,
  FiUser,
  FiShare2,
  FiKey,
  FiTrash2,
  FiLogOut,
} from "react-icons/fi";
import useLogout from "../../customHooks/changePassword/useLogout";
import { useEffect } from "react";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const linkClasses =
    "flex items-center gap-3 p-2 rounded transition-colors duration-200";

  const { logout, isLoading, error, isSuccess: logoutSuccess } = useLogout();

  if (error) {
    alert(error?.response?.data?.message);
  }

  useEffect(() => {
    if (logoutSuccess) {
      navigate("/");
    }
  });

  return (
    <>
      {/* Hamburger button - visible on mobile only */}
      <button
        className="block md:hidden p-3 absolute top-24 left-0 z-50 bg-gray-100 shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar nav */}
      <aside
        className={`fixed top-20 left-0 h-[calc(100vh-80px)] w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform z-40 duration-300 overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static`}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold mb-6">MiniCloud</h1>

          <nav className="flex flex-col gap-3">
            <NavLink
              to="/dashboard/database"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${linkClasses} ${
                  isActive
                    ? "bg-green-100 text-green-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <FiDatabase /> Database
            </NavLink>

            <NavLink
              to="/dashboard/profile"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${linkClasses} ${
                  isActive
                    ? "bg-green-100 text-green-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <FiUser /> Profile
            </NavLink>

            <NavLink
              to="/dashboard/shared-files"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${linkClasses} ${
                  isActive
                    ? "bg-green-100 text-green-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <FiShare2 /> Shared Files
            </NavLink>

            <div className="mt-6">
              <h2 className="text-red-600 font-semibold mb-2">
                Authentication
              </h2>

              <NavLink
                to="/dashboard/change-password"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${linkClasses} ${
                    isActive
                      ? "bg-green-100 text-green-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                <FiKey /> Change Password
              </NavLink>

              <NavLink
                to="/dashboard/delete-account"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${linkClasses} ${
                    isActive
                      ? "bg-green-100 text-green-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                <FiTrash2 /> Delete Account
              </NavLink>

              <button
                onClick={logout}
                className="flex ml-3 justify-center items-center gap-2"
              >
                <FiLogOut /> {isLoading ? "Logging out" : "Logout"}
              </button>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Nav;
