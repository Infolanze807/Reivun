import React, { useState, useEffect } from "react";
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import Header from "./Header";
import Navbar from "./Navbar";
import { getWeb3 } from "../Utils/Rpc";
import Send from "./Send";
import Receive from "./Receive";
import Swap from "./Swap";
import Buy_Sell from "./Buy_Sell";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Utils/AuthProvider";
import axios from 'axios';

function Main({ walletAddress, privateKey }) {
  const { logout } = useAuth();
  const [navbar, setNavbar] = useState(false);
  const [balance, setBalance] = useState(null);
  const [balanceUSD, setBalanceUSD] = useState(null);
  const [send, setSend] = useState(false);
  const [receive, setReceive] = useState(false);
  const [swap, setSwap] = useState(false);
  const [buy_sell, setBuy_Sell] = useState(false);
  const navigate = useNavigate();

  const showSend = () => {
    setSend(true);
    setReceive(false);
    setSwap(false);
    setBuy_Sell(false);
  };

  const showReceive = () => {
    setSend(false);
    setReceive(true);
    setSwap(false);
    setBuy_Sell(false);
  };

  const showSwap = () => {
    setSend(false);
    setReceive(false);
    setSwap(true);
    setBuy_Sell(false);
  };

  const showBuy_Sell = () => {
    setSend(false);
    setReceive(false);
    setSwap(false);
    setBuy_Sell(true);
  };

  const fetchBalance = async () => {
    if (!walletAddress) return;

    try {
      const web3 = getWeb3();
      const balanceInWei = await web3.eth.getBalance(walletAddress);
      const balanceInEth = web3.utils.fromWei(balanceInWei, "ether");
      setBalance(balanceInEth);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const fetchExchangeRate = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND}/wallet/exchange-balance`);
      const exchangeRate = response.data.Price; 

      if (typeof exchangeRate === 'number' && exchangeRate > 0) {
        if (balance !== null) {
          const balanceInUSD = balance * exchangeRate;
          setBalanceUSD(balanceInUSD.toFixed(2));
        }
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [walletAddress]);

  useEffect(() => {
    if (balance !== null) {
      fetchExchangeRate();
    }
  }, [balance]);

  const handleMenu = () => {
    setNavbar((prev) => !prev);
  };

  const handleSignOut = () => {
    console.log("User signed out");
    logout("False");
    navigate("/login");
  };

  return (
    <>
      <Header handleMenu={handleMenu} walletAddress={walletAddress} />
      <Navbar isOpen={navbar} handleMenu={handleMenu} handleSignOut={handleSignOut}/>
      <div className="flex flex-col items-center h-full md:h-[90vh] lg:h-[90vh] xl:h-[90vh] py-8">
        <div className="text-white text-xl md:text-2xl lg:text-3xl font-bold pb-5">
          {balance !== null ? `${balance} xDAI (${balanceUSD ? `$ : ${balanceUSD}` : "Calculating..."})` : "Loading..."}
        </div>
        <div className="grid grid-cols-2 xl:gap-14 lg:gap-10 md:gap-6 sm:gap-4 gap-10 text-black">
          <div className="flex flex-col items-center">
            <button
              onClick={showSend}
              className="lg:p-4 md:p-3 sm:p-2 p-2 bg-[--green-color] text-white text-4xl rounded-full"
            >
              <IoMdArrowRoundUp />
            </button>
            <p className="text-white">Send</p>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={showReceive}
              className="lg:p-4 md:p-3 sm:p-2 p-2 bg-[--green-color] text-white text-4xl rounded-full"
            >
              <IoMdArrowRoundDown />
            </button>
            <p className="text-white">Receive</p>
          </div>
          {/* <div className="flex flex-col items-center">
            <button
              onClick={showSwap}
              className="lg:p-4 md:p-3 sm:p-2 p-2 bg-[--green-color] text-white text-4xl rounded-full"
            >
              <MdSwapHorizontalCircle />
            </button>
            <p className="text-white">Swap</p>
          </div> */}
          {/* <div className="flex flex-col items-center">
            <button
              onClick={showBuy_Sell}
              className="lg:p-4 md:p-3 sm:p-2 p-2 bg-[--green-color] text-white text-4xl rounded-full"
            >
              <CiCreditCard1 />
            </button>
            <p className="text-white">Buy & Sell</p>
          </div> */}
        </div>
        {send && <Send walletAddress={walletAddress} privateKey={privateKey} balance={balance}/>}
        {receive && (<Receive walletAddress={walletAddress}/>)}
        {swap && (<Swap/>)}
        {buy_sell && (<Buy_Sell/>)}
      </div>
    </>
  );
}

export default Main;
