import React, { useState } from "react";
import logo from "../Images/gno-wallet.jpeg"
import {
  FaTelegramPlane,
} from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineIosShare } from "react-icons/md";
import Certificate from "../Images/image.8354ab2c.svg";
import { Link } from "react-router-dom";
import { MoonPayBuyWidget } from "@moonpay/moonpay-react";
import usePWA from "./UsePWA";

const Footer = () => {
  const { isAppInstalled, isIosOrMac, showPopup, setShowPopup, handleInstallClick,showPopupInstalled,setShowPopupInstalled } = usePWA();
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);

  const toggleMoonpayWidget = () => {
    setIsWidgetVisible((prev) => !prev);
  };

  return (
    <div className="lg:px-28 md:px-20 px-5 border-t border-gray-600">
            {/* Popup for iOS/macOS */}
            {showPopup && isIosOrMac && (
              <div className="fixed inset-0 bg-[#000c] flex items-end md:items-center justify-center p-4">
                <div className="bg-[#d6d4d5] rounded-2xl max-w-sm w-full shadow-lg">
                  <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-lg font-semibold text-black">Add to Home Screen</h2>
                    <button
                       onClick={() => setShowPopup(false)}
                      className="text-[--green-color] text-sm font-medium"
                    >
                      <CgClose  className="text-2xl"/>
                    </button>
                  </div>
                  <div className="p-4 space-y-4">
                    <p className="text-gray-500 text-sm">
                      This website has app functionality. Add it to your home screen to use it in fullscreen and while offline.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-white p-2 rounded-lg">
                          <MdOutlineIosShare className="w-6 h-6 text-[--green-color]" />
                        </div>
                        <p className="text-sm pt-1 text-gray-800">
                          1) Press the &apos;Share&apos; button on the menu bar below.
                        </p>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-white p-2 rounded-lg">
                          <FaPlus className="w-6 h-6 text-[--green-color]" />
                        </div>
                        <p className="text-sm pt-2 text-gray-800">
                          2) Press &apos;Add to Home Screen&apos;.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* for app status */}
      {showPopupInstalled && isAppInstalled && (
        <div className="fixed inset-0 bg-[#000c] flex items-end md:items-center justify-center p-4">
          <div className="bg-[#d6d4d5] rounded-2xl max-w-sm w-full shadow-lg">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-lg font-semibold text-black"> Application already Installed</h2>
              <button
                onClick={() => setShowPopupInstalled(false)} 
                className="text-[--green-color] text-sm font-medium"
              >
                <CgClose  className="text-2xl"/>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-10 md:grid-cols-1 grid-cols-1 items-center gap-5 py-10">
        <div className="lg:col-span-2">
          <div className="text-4xl text-[--main-color] text-center font-bold uppercase">
            Reivun
          </div>
          <div className="pt-3">
            <img className="mx-auto w-40 rounded-full" src={logo} alt="Gnosis" />
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-4 lg:gap-0 md:gap-0">
            <div className="text-white">
              <div className="font-bold pb-4">Wallet</div>
              {isAppInstalled ? (
            <button
            onClick={() => setShowPopupInstalled(true)}
            className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300"
          >
            Install App
          </button>
          ) : isIosOrMac ? (
            <button
              onClick={() => setShowPopup(true)}
              className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300"
            >
              Install App
            </button>
          ) : (
            <button
              onClick={handleInstallClick}
              className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300"
            >
               Install App
            </button>
          )}
              <Link to={'/browser-extension'}>
              <p className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300">
                Browser Extension
              </p>
              </Link>
            </div>
            <div className="text-white">
              <div className="font-bold pb-4">Features</div>
              <p className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300" onClick={toggleMoonpayWidget}>
                Buy Crypto
              </p>
              <Link to={'/swap'}>
              <p className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300">
                Swaps
              </p>
              </Link>
            </div>
            <div className="text-white">
              <div className="font-bold pb-4">Support</div>
              <Link to={'/faq'}>
              <p className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300">
                FAQs
              </p>
              </Link>
              <a href="mailto:Leviathan5713@gmail.com">
              <p className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300">
                Contact Us
              </p>
              </a>
            </div>
            <div className="text-white">
              <div className="font-bold pb-4">About</div>
              <Link to={'/about-us'}>
              <p className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300">
                About Us
              </p>
              </Link>
              <Link to={'/terms'}>
              <p className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300">
                Terms & Conditions
              </p>
              </Link>
              <Link to={'/policy'}>
              <p className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300">
                Privacy Policy
              </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 md:text-center">
          <div className="pb-5">
            <img className="md:mx-auto" src={Certificate} alt="Certfied" />
          </div>
          <div>
            <div className="text-lg font-semibold pb-1 text-white">
              Stay Connected:
            </div>
            <div className=" flex gap-4 md:justify-center">
            <a 
      href="https://t.me/+QAJbwb4lS1IzZGQ0" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      <FaTelegramPlane className="bg-white p-1.5 text-3xl rounded hover:text-[--main-color] hover:cursor-pointer transition-all duration-300" />
    </a>
          </div>
          </div>
        </div>
      </div>
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

export default Footer;
