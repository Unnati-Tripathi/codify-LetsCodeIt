



import React from "react";
import logo from "../images/logo.png";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ isLightMode }) => {
  const userInitial =
    localStorage.getItem("userName")?.substring(0, 1).toUpperCase() ||
    localStorage.getItem("userId")?.substring(0, 1).toUpperCase() ||
    "U";

  return (
    <div
      className={`sticky top-0 z-[1000] flex items-center justify-between px-[80px] h-[85px] backdrop-blur-xl border-b transition-all duration-500 ${
        isLightMode
          ? "bg-white/70 border-gray-200"
          : "bg-[#0d1117]/70 border-white/5"
      }`}
    >
      <Link to="/" className="hover:scale-105 transition-transform duration-300">
        <img src={logo} className="w-[160px] object-contain" alt="Logo" />
      </Link>

     
      <div className="flex items-center gap-5">
        <div className="flex flex-col items-end leading-tight">
          <span
            className={`text-[11px] font-bold uppercase tracking-widest ${
              isLightMode ? "text-blue-600" : "text-[#00AEEF]"
            }`}
          >
            Developer
          </span>
          <span
            className={`text-xs ${
              isLightMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            Pro Account
          </span>
        </div>

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg cursor-pointer transition-all duration-300 ${
            isLightMode
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
              : "bg-gradient-to-tr from-[#00AEEF] to-[#005f82] text-white shadow-[0_0_20px_rgba(0,174,239,0.3)]"
          }`}
        >
          {userInitial}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

