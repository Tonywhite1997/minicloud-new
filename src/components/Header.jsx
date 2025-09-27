import React from "react";
import { NavLink } from "react-router-dom";
import CloudIcon from "../UI/CloudIcon";

function Header() {
  return (
    <div className="shadow-md bg-gray-50 shadow-green-600/50 h-20 w-full flex justify-between items-center p-4">
      <NavLink to="/" className="flex flex-col justify-between items-center">
        <CloudIcon />
        <h2 className="text-gray-500 font-semibold text-xl">Minicloud</h2>
      </NavLink>
    </div>
  );
}

export default Header;
