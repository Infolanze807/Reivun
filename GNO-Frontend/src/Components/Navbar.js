import React from "react";
import { FaTimes, FaWallet, FaLink, FaBan, FaKey, FaLanguage, FaBell, FaAngleRight, FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";
const Navbar = ({ isOpen, handleMenu, handleSignOut }) => {

  return (
    <>
      {isOpen && (
        <div className="absolute h-full w-[300px] left-0 top-0">
          <button
            type="button"
            className="p-2 absolute right-2 top-2 text-right rounded-md text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            onClick={handleMenu}
          >
            <FaTimes />
          </button>
          <nav className="bg-[--bg-color] border-4 border-[--border-color] text-white p-4 h-full pt-8">
            <ul className="flex flex-col">
            <Link to={'/main'}>
              <li className="flex items-center justify-between py-3 border-b-2 border-b-[#2e3035]">
                <div className="flex items-center">
                  <FaWallet className="mr-2" />
                  BAck To Home
                </div>
                <FaAngleRight />
              </li>
              </Link>
              {/* <li className="flex items-center justify-between py-3 border-b-2 border-b-[#2e3035]">
                <div className="flex items-center">
                  <FaLink className="mr-2" />
                  Connected dApps
                </div>
                <FaAngleRight />
              </li> */}
              {/* <li className="flex items-center justify-between py-3 border-b-2 border-b-[#2e3035]">
                <div className="flex items-center">
                  <FaBan className="mr-2" />
                  Blocked dApps
                </div>
                <FaAngleRight />
              </li> */}
              {/* <li className="flex items-center justify-between py-3 border-b-2 border-b-[#2e3035]">
                <div className="flex items-center">
                  <FaKey className="mr-2" />
                  View Secret Phrase
                </div>
                <FaAngleRight />
              </li> */}
              {/* <li className="flex items-center justify-between py-3 border-b-2 border-b-[#2e3035]">
                <div className="flex items-center">
                  <FaLanguage className="mr-2" />
                  Language
                </div>
                <FaAngleRight />
              </li> */}
              {/* <li className="flex items-center justify-between py-3 border-b-2 border-b-[#2e3035]">
                <div className="flex items-center">
                  <FaBell className="mr-2" />
                  Notifications
                </div>
                <FaAngleRight />
              </li> */}
              <Link to={'/dash'}>
              <li className="flex items-center justify-between py-3 border-b-2 border-b-[#2e3035]">
                <div className="flex items-center">
                  <FaChartBar className="mr-2" />
                  Dashboard
                </div>
                <FaAngleRight />
              </li></Link>
              <li className="flex items-center justify-between py-3 border-b-2 border-b-[#2e3035] cursor-pointer"  onClick={handleSignOut}>
                <div className="flex items-center">
                  <button type="button"><FaKey className="mr-2" /></button>
                  Lock Wallet
                </div>
                <FaAngleRight />
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
