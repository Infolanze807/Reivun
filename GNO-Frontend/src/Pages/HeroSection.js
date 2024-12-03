import React from "react";
import { IoIosStar } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import img from "../Images/svgviewer-png-output (1).png";

const HeroSection = () => {
  return (
    <div className="text-white lg:px-28 md:px-20 px-5 pt-5">
      <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 items-center">
        <div className="max-w-lg mx-auto order-2 lg:order-1 md:order-2">
          <div className="lg:text-5xl text-4xl  font-bold leading-tight">
            True crypto ownership.
          </div>
          <div className="lg:text-5xl text-4xl font-bold leading-tight">
            Powerful Web3 experiences
          </div>
          <div className="pt-5 text-lg">
            Unlock the power of your cryptocurrency assets and explore the world
            of Web3 with Trust.
          </div>
          <div className="py-5 pt-7">
            <NavLink
              to={"/sign-up"}
              className="text-[--main-color] border border-[--main-color] py-3 px-6 hover:cursor-pointer rounded-full w-max hover:bg-[--main-color] hover:text-black transition-all duration-500 flex items-center"
            >
              Get Started&nbsp;
              <RiArrowRightDoubleFill className="text-xl" />
            </NavLink>
          </div>
        </div>
        <div className="order-1 lg:order-2 md:order-1">
          <img className="lg:w-[560px] md:w-[400px] w-[300px] mx-auto" src={img} alt="Gnosis" />
        </div>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-5 grid-cols-1 gap-5 lg:gap-0 md:gap-0 pt-8 lg:pb-20 md:pb-20 pb-10">
        <div className="text-center font-bold text-xl">
          <p>Trusted by</p>
          <p>
            <span className="text-[--main-color]">100M+</span> people
          </p>
        </div>
        <div className="text-center font-bold text-xl">
          <p>Founded in</p>
          <p className="text-[--main-color]">2017</p>
        </div>
        <div className="text-center font-bold text-xl">
          <p>Independently</p>
          <p className="text-[--main-color]">Audited</p>
        </div>
        <div className="text-center font-bold text-xl">
          <p>ISO</p>
          <p className="text-[--main-color]">Certified</p>
        </div>
        <div className="text-center font-bold text-xl">
          <p>Top Reviews</p>
          <p className="flex gap-1 justify-center text-[--main-color] text-2xl">
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
            <IoIosStar />
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
