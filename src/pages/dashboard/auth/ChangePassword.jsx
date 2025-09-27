import React, { useState } from "react";
import { useEffect } from "react";
import useChangePassword from "../../../customHooks/changePassword/useChangePassword";
import useLogout from "../../../customHooks/changePassword/useLogout";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { changePassword, error, isPending, isSuccess } = useChangePassword();

  const { logout } = useLogout();

  function handleSubmit(e) {
    e.preventDefault();
    if (!oldPassword.trim() || !newPassword.trim()) {
      return;
    }
    changePassword({ oldPassword, newPassword });
  }

  useEffect(() => {
    if (isSuccess) {
      logout();
    }
  }, [isSuccess]);

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Change Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Old Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Old Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {error && (
            <p className="text-red-500 text-center">
              {error?.response?.data?.message}
            </p>
          )}

          {/* Continue Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            {isPending ? "Changing" : isSuccess ? "Changed" : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
