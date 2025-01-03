// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import logo from "../Images/gno-wallet.jpeg";
// import { MoonPayBuyWidget } from "@moonpay/moonpay-react";
// import { MdPlayArrow } from "react-icons/md";
// const Header = () => {
//   const [isWidgetVisible, setIsWidgetVisible] = useState(false);

//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const login = () => {
//     navigate("/sign-up");
//   };

//   // const handleMoonpay = () => {
//   //   setIsWidgetVisible(true); // Show the widget
//   // };

//   const toggleMoonpayWidget = () => {
//     setIsWidgetVisible((prev) => !prev); // Toggle widget visibility
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };
//   return (
//     <div>
//       <nav className="bg-zinc-800 fixed w-full z-20 top-0 start-0 border-b border-[--green-color]">
//         <div className="grid grid-cols-12 p-2 mx-2 md:mx-5 lg:mx-8 justify-stretch rounded-xl items-center">
//           <div className="lg:col-span-4 col-span-6">
//             <a
//               href="/"
//               className="flex items-center space-x-3 rtl:space-x-reverse"
//             >
//               <img
//                 src={logo}
//                 className="md:w-16 w-14 rounded-full"
//                 alt="Flowbite Logo"
//               />
//               <span className="self-center text-3xl font-semibold whitespace-nowrap text-[--main-color]">
//                 Reivun
//               </span>
//             </a>
//           </div>
//           <div className="lg:col-span-8 col-span-6 flex justify-end">
//             <div className="flex items-center gap-14">
//               <button
//                 type="button"
//                 className="text-black bg-[--main-color] hover:bg-[--green-color] transition-all duration-500 font-medium rounded-full text-sm px-7 py-2.5 text-center hidden md:block"
//                 onClick={toggleMoonpayWidget}
//               >
//                 Buy Crypto
//               </button>
//               <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//                 <button
//                   type="button"
//                   className="text-black bg-[--main-color] hover:bg-[--green-color] transition-all duration-500 font-medium rounded-full text-sm px-7 py-2.5 text-center hidden md:block"
//                   onClick={login}
//                 >
//                   Get started
//                 </button>

//                 <button
//                   data-collapse-toggle="navbar-sticky"
//                   type="button"
//                   className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[--green-color] rounded-lg md:hidden"
//                   aria-controls="navbar-sticky"
//                   aria-expanded={isMenuOpen}
//                   onClick={toggleMenu}
//                 >
//                   <span className="sr-only">Open main menu</span>
//                   <svg
//                     className="w-5 h-5"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 17 14"
//                   >
//                     <path
//                       stroke="currentColor"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       stroke-width="2"
//                       d="M1 1h15M1 7h15M1 13h15"
//                     />
//                   </svg>
//                 </button>
//               </div>
//               <div
//                 className={`items-center justify-between ${
//                   isMenuOpen ? "block bg-zinc-800" : "hidden"
//                 } absolute md:relative top-[73px] md:top-0 left-0 w-full md:flex md:w-auto md:order-1`}
//                 id="navbar-sticky"
//               >
//                 <ul className="flex flex-col p-4 md:p-0 font-normal  rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
//                   <li>
//                     <NavLink
//                       to={"/"}
//                       onClick={closeMenu}
//                       className={({ isActive }) =>
//                         isActive
//                           ? "py-2 px-3 text-[--main-color] md:p-0 flex items-center gap-x-2"
//                           : "py-2 px-3 text-white md:p-0 flex items-center gap-x-2"
//                       }
//                       aria-current="page"
//                     >
//                       <MdPlayArrow />
//                       <h4>Home</h4>
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to={"/about-us"}
//                       onClick={closeMenu}
//                       className={({ isActive }) =>
//                         isActive
//                           ? "py-2 px-3 text-[--main-color] md:p-0 flex items-center gap-x-2"
//                           : "py-2 px-3 text-white md:p-0 flex items-center gap-x-2"
//                       }
//                     >
//                       <MdPlayArrow />
//                       <h4>About</h4>
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       // to={"/about-us"}
//                       // onClick={closeMenu}
//                       // className={({ isActive }) =>
//                       //   isActive
//                       //     ? "py-2 px-3 text-[--main-color] md:p-0 flex items-center"
//                       //     : "py-2 px-3 text-white md:p-0 flex items-center"
//                       // }
//                       className="py-2 px-3 text-white md:p-0 flex items-center gap-x-2"
//                     >
//                       <MdPlayArrow />
//                       <h4>Services</h4>
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       // to={"/contact-us"}
//                       to="mailto:Leviathan5713@gmail.com"
//                       onClick={closeMenu}
//                       className={({ isActive }) =>
//                         isActive
//                           ? "py-2 px-3 text-[--main-color] md:p-0 flex items-center gap-x-2"
//                           : "py-2 px-3 text-white md:p-0 flex items-center gap-x-2"
//                       }
//                     >
//                       <MdPlayArrow />
//                       <h4>Contact</h4>
//                     </NavLink>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
//       {isWidgetVisible && (
//         <MoonPayBuyWidget
//           variant="overlay"
//           baseCurrencyCode="usd"
//           baseCurrencyAmount="100"
//           defaultCurrencyCode="eth"
//           visible
//         />
//       )}
//     </div>
//   );
// };

// export default Header;

// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import logo from "../Images/gno-wallet.jpeg";
// import { MoonPayBuyWidget } from "@moonpay/moonpay-react";
// import { MdPlayArrow } from "react-icons/md";
// import { CgClose } from "react-icons/cg";
// import { FaBars } from "react-icons/fa6"

// const Header = () => {
//   const [isWidgetVisible, setIsWidgetVisible] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleGetStarted = () => {
//     navigate("/sign-up");
//   };

//   const toggleMoonpayWidget = () => {
//     setIsWidgetVisible((prev) => !prev);
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <div>
//       <nav className="bg-zinc-800 fixed w-full z-20 top-0 border-b border-[--green-color]">
//         <div className="grid grid-cols-12 p-2 mx-2 md:mx-5 lg:mx-8 items-center">
//           {/* Logo and Site Name */}
//           <div className="lg:col-span-4 col-span-6">
//             <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
//               <img
//                 src={logo}
//                 className="md:w-16 w-12 rounded-full"
//                 alt="Reivun Logo"
//               />
//               <span className="text-3xl font-semibold text-[--main-color]">
//                 Reivun
//               </span>
//             </a>
//           </div>

//           {/* Menu */}
//           <div className="lg:col-span-8 col-span-6 flex justify-end">
//             <div className="flex items-center gap-5">
//               {/* Buy Crypto Button */}
//               <button
//                 type="button"
//                 className="hidden lg:block text-black bg-[--main-color] hover:bg-[--green-color] transition-all duration-500 font-medium rounded-full text-sm px-7 py-2.5"
//                 onClick={toggleMoonpayWidget}
//                 aria-label="Buy Crypto"
//               >
//                 Buy Crypto
//               </button>

//               {/* Get Started Button */}
//               <button
//                 type="button"
//                 className="hidden lg:block text-black bg-[--main-color] hover:bg-[--green-color] transition-all duration-500 font-medium rounded-full text-sm px-7 py-2.5"
//                 onClick={handleGetStarted}
//                 aria-label="Get Started"
//               >
//                 Get Started
//               </button>

//               {/* Mobile Menu Toggle */}
//               <button
//   type="button"
//   className="inline-flex items-center p-2 w-10 h-10 justify-center text-xl text-[--green-color] transition-all lg:hidden"
//   onClick={toggleMenu}
//   aria-controls="navbar-sticky"
//   aria-expanded={isMenuOpen}
//   aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
// >
//   {isMenuOpen ? (
    
//     <CgClose />
//   ) : (
//     <FaBars />
//   )}
// </button>


//               {/* Navigation Links */}
//               <div
//                 className={`${
//                   isMenuOpen ? "block bg-zinc-800" : "hidden"
//                 } absolute lg:relative top-[65px] sm:top-[65px] md:top-[81px] lg:top-0 left-0 w-full lg:flex lg:w-auto`}
//                 id="navbar-sticky"
//               >
//                 <ul className="flex flex-col p-4 lg:p-0 font-normal lg:space-x-8 rtl:space-x-reverse lg:flex-row">
//                   <li>
//                     <NavLink
//                       to="/"
//                       onClick={closeMenu}
//                       className={({ isActive }) =>
//                         isActive
//                           ? "py-2 px-3 text-[--main-color] flex items-center gap-x-2"
//                           : "py-2 px-3 text-white flex items-center gap-x-2"
//                       }
//                     >
//                       <MdPlayArrow className="lg:hidden" />
//                       Home
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/about-us"
//                       onClick={closeMenu}
//                       className={({ isActive }) =>
//                         isActive
//                           ? "py-2 px-3 text-[--main-color] flex items-center gap-x-2"
//                           : "py-2 px-3 text-white flex items-center gap-x-2"
//                       }
//                     >
//                       <MdPlayArrow className="lg:hidden"/>
//                       About
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="#"
//                       className="py-2 px-3 text-white flex items-center gap-x-2"
//                     >
//                       <MdPlayArrow className="lg:hidden"/>
//                       Services
//                     </NavLink>
//                   </li>
//                   <li>
//                     <a
//                       href="mailto:Leviathan5713@gmail.com"
//                       onClick={closeMenu}
//                       className="py-2 px-3 text-white flex items-center gap-x-2"
//                     >
//                       <MdPlayArrow className="lg:hidden"/>
//                       Contact
//                     </a>
//                   </li>
//                   <li className="flex items-center gap-x-5">
//                   <button
//                 type="button"
//                 className="lg:hidden md:block text-black bg-[--main-color] hover:bg-[--green-color] transition-all duration-500 font-medium rounded-full text-sm px-7 py-2.5"
//                 onClick={toggleMoonpayWidget}
//                 aria-label="Buy Crypto"
//               >
//                 Buy Crypto
//               </button>
//                   <button
//                 type="button"
//                 className="lg:hidden md:block text-black bg-[--main-color] hover:bg-[--green-color] transition-all duration-500 font-medium rounded-full text-sm px-7 py-2.5"
//                 onClick={handleGetStarted}
//                 aria-label="Get Started"
//               >
//                 Get Started
//               </button>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* MoonPay Widget */}
//       {isWidgetVisible && (
//         <MoonPayBuyWidget
//           variant="overlay"
//           baseCurrencyCode="usd"
//           baseCurrencyAmount="100"
//           defaultCurrencyCode="eth"
//           visible={isWidgetVisible}
//         />
//       )}
//     </div>
//   );
// };

// export default Header;

// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import logo from "../Images/gno-wallet.jpeg";
// import { MoonPayBuyWidget } from "@moonpay/moonpay-react";
// import { MdPlayArrow } from "react-icons/md";
// import { CgClose } from "react-icons/cg";
// import { FaBars } from "react-icons/fa6";

// const Header = () => {
//   const [isWidgetVisible, setIsWidgetVisible] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleGetStarted = () => {
//     navigate("/sign-up");
//   };

//   const toggleMoonpayWidget = () => {
//     setIsWidgetVisible((prev) => !prev);
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <div>
//       <nav className="bg-zinc-800 fixed w-full z-20 top-0 border-b border-[--green-color]">
//         <div className="grid grid-cols-12 p-2 mx-2 md:mx-5 lg:mx-8 items-center">
//           {/* Logo and Site Name */}
//           <div className="lg:col-span-4 col-span-6">
//             <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
//               <img
//                 src={logo}
//                 className="md:w-16 w-12 rounded-full"
//                 alt="Reivun Logo"
//               />
//               <span className="text-3xl font-semibold text-[--main-color]">
//                 Reivun
//               </span>
//             </a>
//           </div>

//           {/* Menu */}
//           <div className="lg:col-span-8 col-span-6 flex justify-end">
//             <div className="flex items-center gap-5">
//               {/* Buy Crypto Button */}
//               <button
//                 type="button"
//                 className="hidden lg:block text-black bg-[--main-color] hover:bg-[--green-color] transition-all duration-500 font-medium rounded-full text-sm px-7 py-2.5"
//                 onClick={toggleMoonpayWidget}
//                 aria-label="Buy Crypto"
//               >
//                 Buy Crypto
//               </button>

//               {/* Get Started Button */}
//               <button
//                 type="button"
//                 className="hidden lg:block text-black bg-[--main-color] hover:bg-[--green-color] transition-all duration-500 font-medium rounded-full text-sm px-7 py-2.5"
//                 onClick={handleGetStarted}
//                 aria-label="Get Started"
//               >
//                 Get Started
//               </button>

//               {/* Mobile Menu Toggle */}
//               <button
//                 type="button"
//                 className="inline-flex items-center p-2 w-10 h-10 justify-center text-xl text-[--green-color] transition-all duration-500 lg:hidden"
//                 onClick={toggleMenu}
//                 aria-controls="navbar-sticky"
//                 aria-expanded={isMenuOpen}
//                 aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
//               >
//                 {isMenuOpen ? <CgClose /> : <FaBars />}
//               </button>

//               {/* Navigation Links */}
//               <div
//                 className={`absolute lg:relative top-[65px] sm:top-[65px] md:top-[81px] lg:top-0 left-0 w-full lg:flex lg:w-auto transition-all duration-500 ${
//                   isMenuOpen ? "block bg-zinc-800" : "hidden"
//                 }`}
//                 id="navbar-sticky"
//               >
//                 <ul className="flex flex-col p-4 lg:p-0 font-normal lg:space-x-8 rtl:space-x-reverse lg:flex-row">
//                   <li>
//                     <NavLink
//                       to="/"
//                       onClick={closeMenu}
//                       className={({ isActive }) =>
//                         isActive
//                           ? "py-2 px-3 text-[--main-color] flex items-center gap-x-2"
//                           : "py-2 px-3 text-white flex items-center gap-x-2"
//                       }
//                     >
//                       <MdPlayArrow className="lg:hidden" />
//                       Home
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/about-us"
//                       onClick={closeMenu}
//                       className={({ isActive }) =>
//                         isActive
//                           ? "py-2 px-3 text-[--main-color] flex items-center gap-x-2"
//                           : "py-2 px-3 text-white flex items-center gap-x-2"
//                       }
//                     >
//                       <MdPlayArrow className="lg:hidden" />
//                       About
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="#"
//                       className="py-2 px-3 text-white flex items-center gap-x-2"
//                     >
//                       <MdPlayArrow className="lg:hidden" />
//                       Services
//                     </NavLink>
//                   </li>
//                   <li>
//                     <a
//                       href="mailto:Leviathan5713@gmail.com"
//                       onClick={closeMenu}
//                       className="py-2 px-3 text-white flex items-center gap-x-2"
//                     >
//                       <MdPlayArrow className="lg:hidden" />
//                       Contact
//                     </a>
//                   </li>
//                   <li className="flex items-center gap-x-5">
//                     <button
//                       type="button"
//                       className="lg:hidden md:block text-black bg-[--main-color] hover:bg-[--green-color] transition-all duration-500 font-medium rounded-full text-sm px-7 py-2.5"
//                       onClick={toggleMoonpayWidget}
//                       aria-label="Buy Crypto"
//                     >
//                       Buy Crypto
//                     </button>
//                     <button
//                       type="button"
//                       className="lg:hidden md:block text-black bg-[--main-color] hover:bg-[--green-color] transition-all duration-500 font-medium rounded-full text-sm px-7 py-2.5"
//                       onClick={handleGetStarted}
//                       aria-label="Get Started"
//                     >
//                       Get Started
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* MoonPay Widget */}
//       {isWidgetVisible && (
//         <MoonPayBuyWidget
//           variant="overlay"
//           baseCurrencyCode="usd"
//           baseCurrencyAmount="100"
//           defaultCurrencyCode="eth"
//           visible={isWidgetVisible}
//         />
//       )}
//     </div>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MoonPayBuyWidget } from "@moonpay/moonpay-react";
import { MdPlayArrow } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { FaBars } from "react-icons/fa6";
import logo from "../Images/gno-wallet.png";

const Header = () => {
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/sign-up");
  };

  const toggleMoonpayWidget = () => {
    setIsWidgetVisible((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <nav className="bg-zinc-800 fixed w-full z-20 top-0 border-b border-[--green-color]">
        <div className="grid grid-cols-12 p-2 mx-2 md:mx-5 lg:mx-8 items-center">
          {/* Logo and Site Name */}
          <div className="lg:col-span-4 col-span-6 bg-zinc-800">
            <a href="/" className="flex items-center grid-cols-3 space-x-3">
              <img
                src={logo}
                className="md:w-16 w-12 rounded-full dark:invert-0" 
                alt="Reivun Logo"
              />
              <span className="text-3xl font-semibold text-[--main-color]">
                Reivun
              </span>
            </a>
          </div>

          {/* Menu */}
          <div className="lg:col-span-8 col-span-6 flex justify-end">
            <div className="flex items-center gap-5">
              {/* Buy Crypto Button */}
              <button
                type="button"
                className="hidden lg:block text-black bg-[--main-color] hover:bg-[--green-color] transition-all duration-500 font-medium rounded-full text-sm px-7 py-2.5"
                onClick={toggleMoonpayWidget}
                aria-label="Buy Crypto"
              >
                Buy Crypto
              </button>

              {/* Get Started Button */}
              <button
                type="button"
                className="hidden lg:block text-black bg-[--main-color] hover:bg-[--green-color] transition-all duration-500 font-medium rounded-full text-sm px-7 py-2.5"
                onClick={handleGetStarted}
                aria-label="Get Started"
              >
                Get Started
              </button>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-xl text-[--green-color] transition-all duration-500 lg:hidden"
                onClick={toggleMenu}
                aria-controls="navbar-sticky"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
              >
                {isMenuOpen ? <CgClose /> : <FaBars />}
              </button>

              {/* Navigation Links */}
              <div
                className={`absolute lg:relative top-[65px] sm:top-[65px] md:top-[81px] lg:top-0 left-0 w-full lg:flex lg:w-auto transition-all duration-500 ease-in-out ${
                  isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible lg:opacity-100 lg:visible"
                } ${
                  isMenuOpen ? "max-h-[400px]" : "max-h-0 lg:max-h-full"
                } bg-zinc-800 overflow-hidden`}
                id="navbar-sticky"
              >
                <ul className="flex flex-col p-4 lg:p-0 font-normal lg:space-x-8 rtl:space-x-reverse lg:flex-row">
                  <li>
                    <NavLink
                      to="/"
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        isActive
                          ? "py-2 px-3 text-[--main-color] flex items-center gap-x-2 transition-colors duration-500"
                          : "py-2 px-3 text-white hover:text-[--main-color] flex items-center gap-x-2 transition-colors duration-500"
                      }
                    >
                      <MdPlayArrow className="lg:hidden" />
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/about-us"
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        isActive
                          ? "py-2 px-3 text-[--main-color] flex items-center gap-x-2 transition-colors duration-500"
                          : "py-2 px-3 text-white hover:text-[--main-color] flex items-center gap-x-2 transition-colors duration-500"
                      }
                    >
                      <MdPlayArrow className="lg:hidden" />
                      About
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink
                      to="/bot"
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        isActive
                          ? "py-2 px-3 text-[--main-color] flex items-center gap-x-2 transition-colors duration-500"
                          : "py-2 px-3 text-white hover:text-[--main-color] flex items-center gap-x-2 transition-colors duration-500"
                      }
                    >
                      <MdPlayArrow className="lg:hidden" />
                      Reivun Bot
                    </NavLink>
                  </li> */}
                  <li>
                    <a
                      href="mailto:Leviathan5713@gmail.com"
                      onClick={closeMenu}
                      className="py-2 px-3 text-white hover:text-[--main-color] flex items-center gap-x-2 transition-colors duration-500"
                    >
                      <MdPlayArrow className="lg:hidden" />
                      Contact
                    </a>
                  </li>
                  
                  <li className="flex items-center gap-x-5">
                    <button
                      type="button"
                      className="lg:hidden md:block text-black bg-[--main-color] hover:bg-[--green-color] transition-all duration-500 font-medium rounded-full text-sm px-7 py-2.5"
                      onClick={toggleMoonpayWidget}
                      aria-label="Buy Crypto"
                    >
                      Buy Crypto
                    </button>
                    <button
                      type="button"
                      className="lg:hidden md:block text-black bg-[--main-color] hover:bg-[--green-color] transition-all duration-500 font-medium rounded-full text-sm px-7 py-2.5"
                      onClick={handleGetStarted}
                      aria-label="Get Started"
                    >
                      Get Started
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* MoonPay Widget */}
      {isWidgetVisible && (
        <MoonPayBuyWidget
          variant="overlay"
          baseCurrencyCode="usd"
          baseCurrencyAmount="100"
          defaultCurrencyCode="eth"
          visible={isWidgetVisible}
        />
      )}
    </div>
  );
};

export default Header;

