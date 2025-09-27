import React, { useState } from "react";
import useResetPassword from "../customHooks/forgotPassword/useResetPassword";

function ResetPassword() {
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, isPending, error } = useResetPassword();

  function handleClick(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    resetPassword({ resetCode, newPassword });
  }

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Reset Your Password
        </h1>

        <form className="space-y-4" onSubmit={handleClick}>
          {/* Reset Code */}
          <div>
            <label
              htmlFor="resetCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Reset Code
            </label>
            <input
              id="resetCode"
              type="text"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              required
              placeholder="Enter reset code"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter new password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-center text-red-500">
              {error?.response?.data?.message || "Something went wrong"}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition cursor-pointer disabled:opacity-50"
          >
            {isPending ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
