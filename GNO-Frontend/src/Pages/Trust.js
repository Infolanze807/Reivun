import React from "react";
import trust from "../Images/raw.b373ab3f.svg"

const Trust = () => {
  return (
    <div className="text-white py-28 md:py-32 px-5 md:px-20">
      <div className="lg:flex md:flex items-center gap-10 justify-between lg:px-28 md:px-14 px-5 lg:py-14 md:py-14 py-8 rounded-xl bg-[#0500ff]">
        <div className="text-white">
          <div className="text-4xl font-bold">Building on Trust</div>
          <div className="py-5 text-lg max-w-2xl">
            We know that working together as a community is better for everyone.
            Our platform enables blockchain developers to build their dApps and
            wallets natively and connect with millions of users, without having
            to worry about the low-level implementation details.
          </div>
          <a 
      href="https://t.me/+QAJbwb4lS1IzZGQ0" 
      target="_blank" 
      rel="noopener noreferrer"
    >
          <div className="text-[#0500ff] bg-white w-max rounded-full py-2.5 px-6 font-semibold hover:cursor-pointer">Join Our Network</div>
        </a>
        </div>
        <div><img className="w-52 mx-auto" src={trust} alt="Trust"  id="notinvert" /></div>
      </div>
    </div>
  );
};

export default Trust;
