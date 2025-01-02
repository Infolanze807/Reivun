import React, { useState } from "react";
import img1 from "../Images/raw.d927cfe4.svg";
import img2 from "../Images/raw.0acff7b3.svg";
import img31 from "../Images/raw.323e03ee.svg";
import img32 from "../Images/raw.16e2b8fb.svg";
import img33 from "../Images/raw.f17c90c5.svg";
import { MoonPayBuyWidget } from '@moonpay/moonpay-react';
import { Link } from "react-router-dom";

const User = () => {
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);

  // Function to toggle the visibility of the widget
  const toggleMoonpayWidget = () => {
    setIsWidgetVisible((prev) => !prev); // Toggle widget visibility
  };
  return (
    <div className="lg:px-28 md:px-16 px-5">
      <div className="">
        <div className="lg:px-28 md:px-14 px-5 lg:py-14 md:py-14 py-8 lg:pb-24 pb-24 md:pb-24 bg-gradient-to-b from-[#fff4ad] to-[#ffaefe] rounded-3xl">
          <div className="text-center font-bold text-5xl pb-5">
            Simple. Seamless.
          </div>
          <div className="text-center text-lg max-w-2xl mx-auto leading-6 pb-10">
            Enjoy a smooth mobile app and desktop experience with easy-to-use,
            powerful tools to support your entire Web3 journey.
          </div>
          <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-center gap-10 bg-[--bg-color] lg:px-16 md:px-10 px-5 pt-5 rounded-2xl">
            <div className="text-white max-w-sm">
              <div className="text-3xl font-bold">
                Deposit crypto easily from exchanges
              </div>
              <div className="py-5">
                Take control of your crypto. Avoid complicated steps and deposit
                directly to your wallet from exchanges like Binance and
                Coinbase.
              </div>
              <div onClick={toggleMoonpayWidget} className="py-2.5 px-6 text-[--main-color] border border-[--main-color] rounded-full hover:cursor-pointer hover:bg-[--main-color] hover:text-black w-max transition-all duration-300 font-semibold">
                Get Started with Deposits
              </div>
            </div>
            <div>
              <img className="w-[600px]" src={img1} alt="Qr"  id="notinvert" />
            </div>
          </div>
        </div>
        <div className="lg:px-28 md:px-14 px-5 lg:py-14 md:py-14 py-8 bg-gradient-to-b from-[#fff465] to-[--main-color] rounded-3xl -mt-10">
          <div className="text-center font-bold text-5xl pb-5">
            Stay private and secure
          </div>
          <div className="text-center text-lg max-w-2xl mx-auto leading-6 pb-10">
            Rest easy knowing that our privacy and security measures keep you in
            control of your data and digital assets, while also keeping them
            safe.
          </div>
          <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-center gap-10 bg-[--bg-color] lg:px-16 md:px-10 px-5 py-10 rounded-2xl">
            <div className="text-white max-w-sm">
              <div className="text-3xl font-bold">
                True ownership of your crypto assets
              </div>
              <div className="py-5">
                We secure your wallet, but don't control or have access to your
                private keys or secret phrase - only you do.
              </div>
              <Link to={'/sign-up'}>
              <div className="py-2.5 px-6 text-[--bg-color] bg-[--main-color] border border-[--main-color] rounded-full hover:cursor-pointer hover:bg-[--bg-color] hover:text-[--main-color] w-max transition-all duration-300 font-semibold">
                Get Started
              </div>
              </Link>
            </div>
            <div>
              <img className="w-[330px] mx-auto" src={img2} alt="Qr"  id="notinvert" />
            </div>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 items-center pt-10 lg:gap-10 md:gap-5 gap-10">
            <div className="bg-[--bg-color] lg:p-8 md:p-3 p-5 rounded-2xl">
                <div className="text-2xl font-bold text-white leading-6">Added security with encryption</div>
                <div className="py-12"><img className="mx-auto w-36" src={img31} alt="Security"  id="notinvert"/></div>
                <div className="text-white">Use our Encrypted Cloud Backup for increased wallet security.</div>
            </div>
            <div className="bg-[--bg-color] lg:p-8 md:p-3 p-5 rounded-2xl">
                <div className="text-2xl font-bold text-white leading-6">Zero personal tracking</div>
                <div className="py-12"><img className="mx-auto w-24" src={img32} alt="Security"  id="notinvert"/></div>
                <div className="text-white">We don't track any personal information, including your IP address or balances.</div>
            </div>
            <div className="bg-[--bg-color] lg:p-8 md:p-3 p-5 rounded-2xl">
                <div className="text-2xl font-bold text-white leading-6">Proactive alerts for risky transactions</div>
                <div className="py-12"><img className="mx-auto w-36" src={img33} alt="Security"  id="notinvert"/></div>
                <div className="text-white">Stay safe with alerts for risky address and dApp connections.</div>
            </div>
          </div>
          <Link to={'/sign-up'}>
          <div className="mt-12 mx-auto py-2.5 px-6 text-[--main-color] bg-[--bg-color] border border-[--bg-color] rounded-full hover:cursor-pointer hover:bg-[--main-color] hover:text-black w-max transition-all duration-300 font-semibold">
                Create New Wallet
              </div>
              </Link>
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

export default User;
