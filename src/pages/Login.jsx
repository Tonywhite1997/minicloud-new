import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import useLogin from "../customHooks/useLogin";
import Loader from "../UI/Loader";

function Login() {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });

  function handleFormChange(e) {
    const { name, value } = e.target;

    setLoginDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }

  const { login, isPending, error } = useLogin();

  function handleFormSubmit(e) {
    e.preventDefault();
    login(loginDetails);
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex justify-center bg-white py-7">
      <div className="w-full max-w-sm bg-gray-100 rounded-lg shadow-md p-6 ">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Sign In</h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              value={loginDetails.email}
              onChange={handleFormChange}
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
              name="password"
              value={loginDetails.password}
              type="password"
              onChange={handleFormChange}
              required
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold cursor-pointer hover:opacity-90 transition"
          >
            {isPending ? <Loader /> : "Login"}
          </button>
          {error && (
            <p className="text-red-500 text-center w-full">
              {error?.response?.data?.message || "Error"}
            </p>
          )}
        </form>

        {/* Links */}
        <div className="mt-4 text-sm text-center space-y-2">
          <NavLink
            to="/auth/forgot"
            className="block text-blue-700 hover:underline"
          >
            forgot password?
          </NavLink>
          <p className="text-gray-700">
            Don’t have an account?{" "}
            <NavLink
              to="/auth/register"
              className="text-blue-700 hover:underline"
            >
              signup
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
