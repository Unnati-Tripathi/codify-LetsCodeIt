import React from 'react';

import logo from "../images/logo.png";
import { FaArrowCircleDown } from "react-icons/fa";
import "../App.css";

export default function EditorNavbar() {
  return (
    <div className="EditorNavbar flex items-center justify-between px-[100px] h-[80px] ">
          <div className="logo">
            <img className="w-[150px] cursor-pointer" src={logo} alt=""/>
          </div>
        </div>
  )
}
