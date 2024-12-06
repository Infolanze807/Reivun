import React, { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { GrFormNextLink } from "react-icons/gr";
import { MdOutlineSecurity } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { generateWallet } from "../Utils/GenrateWallet";
import logo from "../Images/gno-wallet.jpeg";

function Welcome() {
  const [wallet, setWallet] = useState(null);
  const navigate = useNavigate();

  const handleCreateWallet = () => {
    const newWallet = generateWallet();
    setWallet(newWallet);
    navigate("/set-password", { state: { wallet: newWallet } });
  };
  const handleImportWallet = () => {
    navigate("/importWallet");
  };
  return (
    <>
      <div className=" text-white flex flex-col items-center h-[80vh] md:h-[90vh] lg:h-[90vh] xl:h-[90vh] justify-center">
        <Link to={'/'}>
        <img src={logo} className="mb-5 h-[100px] w-[100px] rounded-full  shadow-custom" />
        </Link>
        <div className="flex flex-col items-center justify-center bg-[--bg-color] border-[--border-color] border shadow-sm rounded-2xl p-4 w-[300px] sm:w-[320px] md:w-[350px] lg:w-[350px] xl:w-[350px] ">
          <div className="text-center">
            <h1 className="text-base">Welcome to the GNO Wallet Extension</h1>
            <p className="text-xs text-center text-gray-400">
              The multi-chain wallet trusted by millions
            </p>
          </div>
          <div className="grid grid-cols-12  items-center py-5 border-b-2 w-full border-b-[#2e3035]">
            <div className="col-span-2">
              <IoAddCircle className="text-xl text-gray-400" />
            </div>
            <div className="col-span-9">
              {!wallet ? (
                <h1
                  className="text-base cursor-pointer hover:text-[--green-color]"
                  onClick={handleCreateWallet}
                >
                  Create a new wallet
                </h1>
              ) : (
                <div>hello</div>
              )}
              <p className="text-gray-400 text-xs">
                start fresh with a new wallet
              </p>
            </div>
            <div className="col-span-1">
              <GrFormNextLink className="text-2xl text-gray-400" />
            </div>
          </div>
          <div className="grid grid-cols-12 w-full items-center py-5 border-b-2 border-b-[#2e3035]">
            <div className="col-span-2 ">
              <MdOutlineSecurity color="gray" className=" text-xl" />
            </div>
            <div className="col-span-9">
              <h1 className="text-base cursor-pointer hover:text-[--green-color]"  onClick={handleImportWallet}>
                Import or Recover Wallet
              </h1>
              <p className="text-gray-400 text-xs">
                Import with your Secret Phrase
              </p>
            </div>
            <div className="col-span-1">
              <GrFormNextLink className="text-2xl text-gray-400" />
            </div>
          </div>
          <div className=" w-full pt-3 flex justify-center">
           <p className="text-xs">if you have Account,<Link to={'/login'}><span className="text-[--green-color] pl-2 text-[15px]">login here</span></Link></p>
          </div>
         
        </div>
      </div>
    </>
  );
}

export default Welcome;
