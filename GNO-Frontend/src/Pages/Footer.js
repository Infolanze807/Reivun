import React from "react";
import logo from "../Images/gno-wallet.jpeg"
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaGithubAlt,
  FaTelegramPlane,
} from "react-icons/fa";
import Certificate from "../Images/image.8354ab2c.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="lg:px-28 md:px-20 px-5 border-t border-gray-600">
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
              <p className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300">
                Mobile App
              </p>
              <p className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300">
                Browser Extension
              </p>
            </div>
            <div className="text-white">
              <div className="font-bold pb-4">Features</div>
              <p className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300">
                Buy Crypto
              </p>
              <p className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300">
                NFTs
              </p>
              <p className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300">
                Security
              </p>
              <p className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300">
                Wallet Core
              </p>
              <p className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300">
                Swaps
              </p>
            </div>
            <div className="text-white">
              <div className="font-bold pb-4">Support</div>
              <p className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300">
                FAQs
              </p>
              <p className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300">
                Contact Us
              </p>
              <p className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300">
                Community Forum
              </p>
            </div>
            <div className="text-white">
              <div className="font-bold pb-4">About</div>
              <p className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300">
                Blog
              </p>
              <p className="text-sm pb-1 hover:text-[--main-color] hover: cursor-pointer transition-all duration-300">
                About Us
              </p>
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
              <FaFacebookF className="bg-white p-1.5 text-3xl rounded hover:text-[--main-color] hover: cursor-pointer transition-all duration-300" />
              <FaGithub className="bg-white p-1.5 text-3xl rounded hover:text-[--main-color] hover: cursor-pointer transition-all duration-300" />
              <FaInstagram className="bg-white p-1.5 text-3xl rounded hover:text-[--main-color] hover: cursor-pointer transition-all duration-300" />
              <FaTelegramPlane className="bg-white p-1.5 text-3xl rounded hover:text-[--main-color] hover: cursor-pointer transition-all duration-300" />
              <FaGithubAlt className="bg-white p-1.5 text-3xl rounded hover:text-[--main-color] hover: cursor-pointer transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
