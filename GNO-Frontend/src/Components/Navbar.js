import React from "react";
import { FaTimes, FaWallet, FaLink, FaBan, FaKey, FaLanguage, FaBell, FaAngleRight, FaChartBar } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ isOpen, handleMenu, handleSignOut }) => {
  const location = useLocation(); // Hook to get the current location

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
          <nav className="bg-[--bg-color] border-4 border-[--border-color] text-white h-full pt-8">
            <ul className="flex flex-col">
              <Link to={'/main'}>
                <li
                  className={`flex items-center justify-between p-3 border-b-2 border-b-[#2e3035] ${location.pathname === '/main' ? 'bg-green-500' : ''}`}
                >
                  <div className="flex items-center">
                    <FaWallet className="mr-2" />
                    Home
                  </div>
                  <FaAngleRight />
                </li>
              </Link>
              <Link to={'/dash'}>
                <li
                  className={`flex items-center justify-between p-3 border-b-2 border-b-[#2e3035] ${location.pathname === '/dash' ? 'bg-green-500' : ''}`}
                >
                  <div className="flex items-center">
                    <FaChartBar className="mr-2" />
                    Dashboard
                  </div>
                  <FaAngleRight />
                </li>
              </Link>
              <li
                className="flex items-center justify-between p-3 border-b-2 border-b-[#2e3035] cursor-pointer"
                onClick={handleSignOut}
              >
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
