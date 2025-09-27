import React, { useState } from "react";
import useDeletAccount from "../../../customHooks/useDeletAccount";

function DeleteAccount() {
  const { deleteAccount, isPending, error } = useDeletAccount();
  const [password, setPassword] = useState("");

  const handleDelete = () => {
    if (!password.trim()) return; // simple validation
    deleteAccount(password);
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Delete Account
        </h1>
        <p className="text-gray-600 text-sm text-center">
          Please enter your password to confirm account deletion.
        </p>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-green-500 focus:border-green-500"
        />

        {error && (
          <p className="text-red-500 text-sm text-center">
            {error?.response?.data?.message}
          </p>
        )}

        <button
          onClick={handleDelete}
          disabled={isPending}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg shadow-md transition disabled:opacity-50 cursor-pointer"
        >
          {isPending ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
}

export default DeleteAccount;
