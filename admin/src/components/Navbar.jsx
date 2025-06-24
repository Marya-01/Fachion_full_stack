import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="w-[max(20px,90px)]" src={assets.logo} alt="Logo" />
      <button
        onClick={() => setToken("")}
        className="bg-[#fcba63] text-white px-5 py-2 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
