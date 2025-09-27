import React, { useState } from "react";
import useConfirmVerifyCode from "../../customHooks/useConfirmVerifyCode";

function VerifyEmail() {
  const [verificationCode, setVerificationCode] = useState("");
  const { confirmCode, error, isPending } = useConfirmVerifyCode();

  function handleSubmit(e) {
    e.preventDefault();
    if (!verificationCode.trim()) return;
    confirmCode(verificationCode);
  }

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Verify Your Email
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input */}
          <div>
            <label
              htmlFor="verificationCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter Verification Code
            </label>
            <input
              id="verificationCode"
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Enter the 6-digit code"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error?.response?.data?.message || "Invalid code"}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            {isPending ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
