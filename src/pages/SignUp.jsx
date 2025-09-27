import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useSignUp from "../customHooks/useSignUp";

function SignUp() {
  const { signUp, isPending, error, isSuccess } = useSignUp();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    signUp(formData);
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex justify-center bg-white p-7">
      <div className="w-full max-w-sm bg-gray-100 rounded-lg shadow-md p-6">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sign Up</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Your Name"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition cursor-pointer disabled:opacity-50"
          >
            {isPending ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {error?.response?.data?.message || "Something went wrong"}
            </p>
          )}

          {/* Success */}
          {isSuccess && (
            <p className="text-green-600 text-sm mt-2 text-center">
              Account created successfully!
            </p>
          )}
        </form>

        {/* Links */}
        <div className="mt-4 text-sm text-center">
          <p className="text-gray-700">
            Already a user?{" "}
            <NavLink to="/" className="text-green-600 hover:underline">
              login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
