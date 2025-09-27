import React, { useState } from "react";
import useForgotPass from "../customHooks/forgotPassword/useForgotPass";

function ForgotPassword() {
  const [registeredEmail, setRegisteredEmail] = useState("");
  const { forgotPassword, isPending, error } = useForgotPass();

  function handleClick() {
    if (!registeredEmail.trim()) return;
    forgotPassword(registeredEmail);
  }
  return (
    <div className="flex flex-col p-8 items-center min-h-[calc(100vh-80px)]">
      <h1 className="text-2xl">Enter your registered email</h1>
      <input
        placeholder="registered email"
        onChange={(e) => {
          setRegisteredEmail(e.target.value);
        }}
        className="border w-full sm:w-1/2 rounded-md my-2 h-10 indent-2"
      />
      {error && (
        <p className="text-center text-red-500">
          {error?.response?.data?.message}
        </p>
      )}
      <button
        className="w-full sm:w-1/2 bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 cursor-pointer transition disabled:opacity-50"
        disabled={isPending}
        onClick={handleClick}
      >
        {isPending ? "Sending" : "Confirm"}
      </button>
    </div>
  );
}

export default ForgotPassword;
