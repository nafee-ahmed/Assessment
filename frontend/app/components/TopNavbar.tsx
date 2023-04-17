"use client";
import React from "react";
import { IoMdLogOut } from "react-icons/io";
import { useAuth } from "../hooks/useAuth";
import MovingNavbar from "./MovingNavbar";

const TopNavbar: React.FC = () => {
  const { logout } = useAuth();
  return (
    <nav className="min-w-screen">
      <div className="flex justify-between items-center w-full py-3 px-smallSidePadding lg:px-bigSidePadding ">
        <a href="/home" className="flex items-center">
          <img
            className="h-6 mr-2"
            src="https://matchub.co/wp-content/uploads/2020/03/matchub_blackwords_highres-e1584588152685-2048x1106.png"
            alt="logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap text-gray bg-gradient-to-r from-pink-600 to-primaryColor bg-clip-text text-transparent">
            MatchHub
          </span>
        </a>
        <div className="hidden md:block bw-full">
          <MovingNavbar />
        </div>
        <div className=" cursor-pointer hover:animate-pulse">
          <IoMdLogOut
            onClick={() => logout()}
            size={30}
            style={{ color: "#707070" }}
          />
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
