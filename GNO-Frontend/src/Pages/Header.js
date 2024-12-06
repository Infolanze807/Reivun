import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../Images/gno-wallet.jpeg"
import { MoonPayBuyWidget } from '@moonpay/moonpay-react';
const Header = () => {
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const login = () => {
    navigate("/sign-up");
  };

  // const handleMoonpay = () => {
  //   setIsWidgetVisible(true); // Show the widget
  // };

  const toggleMoonpayWidget = () => {
    setIsWidgetVisible((prev) => !prev); // Toggle widget visibility
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  }
  return (
    
    <div>
       
   
  
      <nav className="bg-zinc-800 fixed w-full z-20 top-0 start-0 border-b border-gray-700 dark:border-gray-600">
        <div className="flex flex-wrap items-center justify-between mx-auto p-2 lg:p-3 md:p-3 lg:px-10 md:px-10 px-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={logo}
              className="w-14 rounded-full"
              alt="Flowbite Logo"
            />
            <span className="self-center text-3xl font-semibold whitespace-nowrap text-[--main-color]">
              Reivun
            </span>
          </a>
          <div className="flex items-center gap-14">
          <button
              type="button"
              className="text-black bg-[--main-color] hover:bg-[--green-color] transition-all duration-300 font-medium rounded-full text-sm px-7 py-2.5 text-center"
              onClick={toggleMoonpayWidget} 
            >
            Buy Crypto
            </button>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-black bg-[--main-color] hover:bg-[--green-color] transition-all duration-300 font-medium rounded-full text-sm px-7 py-2.5 text-center"
              onClick={login}
            >
              Get started
            </button>
            
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${isMenuOpen ? "block bg-gray-900" : "hidden"} absolute md:relative top-16 md:top-0 left-0 w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-normal  rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <NavLink
                  to={"/"}
                  onClick={closeMenu}
                  className={({ isActive }) => isActive ? "block py-2 px-3 text-[--main-color] md:p-0" : "block py-2 px-3 text-white md:p-0" }
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/about-us"}
                  onClick={closeMenu}
                  className={({ isActive }) => isActive ? "block py-2 px-3 text-[--main-color] md:p-0" : "block py-2 px-3 text-white md:p-0" }
                >
                  About
                </NavLink>
              </li>
              {/* <li>
                <a href="#" className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
                </li> */}
              <li>
                <NavLink
                  // to={"/contact-us"}
                  to="mailto:Leviathan5713@gmail.com"
                  onClick={closeMenu}
                  className={({ isActive }) => isActive ? "block py-2 px-3 text-[--main-color] md:p-0" : "block py-2 px-3 text-white md:p-0" }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          </div>
        </div>
      </nav>
      {isWidgetVisible && (
        <MoonPayBuyWidget
          variant="overlay"
          baseCurrencyCode="usd"
          baseCurrencyAmount="100"
          defaultCurrencyCode="eth"
          visible
        />
      )}
    </div>
  );
};

export default Header;
