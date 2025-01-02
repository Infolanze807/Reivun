import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaRegCopy } from "react-icons/fa6";
import copy from "copy-to-clipboard";
import { Link } from 'react-router-dom';
import { MoonPayBuyWidget } from '@moonpay/moonpay-react';

const Header = ({ handleMenu }) => {
  const [isWidgetVisible, setIsWidgetVisible] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    const WalletData = localStorage.getItem("Wallet Data:");
    if (WalletData) {
      const FetchWalletData = JSON.parse(WalletData);
      setWalletAddress(FetchWalletData.Wallet_address);
    }
  }, []);

  const formatWalletAddress = (address) => {
    if (address.length < 8) return address; 
    const firstFour = address.substring(0, 4);
    const lastFour = address.substring(address.length - 4);
    return `${firstFour}....${lastFour}`; 
  };

  const copyToClipboard = () => {
    copy(walletAddress)
    alert("copied..!")
  };

  const toggleMoonpayWidget = () => {
    setIsWidgetVisible(true); // Toggle widget visibility
  };

  return (
    <div className="grid grid-cols-12 p-3 mt-4 mx-3 md:mx-5 lg:mx-8 justify-stretch rounded-xl items-center bg-[--green-color]">
      <div className="lg:col-span-9 md:col-span-6 sm:col-span-6 col-span-6 flex text-white items-center">
        <img
          className="bg-white h-[45px] w-[45px] p-[6px] rounded-full"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAKlBMVEU+aVdHcEw+aVc9Z1U+aVc+aVc9aFY+aVc+aVc9aFY9aFY+aVc9aFY9aFa0wS0JAAAADnRSTlP/AIIU7Mhh3LkuO5wfSHwab1sAAAD3SURBVCiRdZProoQgCIQHvGHq+7/uAdTWdjvzw4pPx0AEbVVOEYiJ6x3CemYFQCk2xvyAQYMyZmSITgofeAEp3GYUFF8bKsv0UAbGgkCjLzVgwQDwkzEQHObyQ52VrDAifVFnCZFQYfYnnZ6a9wW2X5WDznX2w4yk7+NwXp5Dc1BnddVZmy6mboBXtHZsuhm6xUzNcoZn5DnoKGYx11ZiTagbDdQFkak7Mg/MA2nUO81KDosm+HLExmL72n7CzY9VUcWhJOdXtfL9o0ie5Lus8FTeWfHzDO8w3G3yq+tosDd2tOZjv6M176ZeOTyb2lRZ7DrIcR3+APX8BR6lfT+rAAAAAElFTkSuQmCC"
          alt="Logo"
        />
        <p
          className='pl-3 text-sm lg:text-base'
        >
          {formatWalletAddress(walletAddress)}
        </p>
        <p
          className='pl-2 text-sm lg:text-base cursor-pointer'
          onClick={copyToClipboard}
        >
   <FaRegCopy />
        </p>
      </div>
      <div className="lg:col-span-3 md:col-span-6 sm:col-span-6 col-span-6 gap-5 flex text-white items-center justify-end">
      <button className='bg-white p-2 text-[12px] text-[--green-color] rounded-2xl' onClick={toggleMoonpayWidget}>Buy Crypto</button>
      <Link to={'/'}>
      <span className='text-[12px]'>Go to Home</span>
      </Link>
        <button onClick={handleMenu}>
          <FaBars />
        </button>
      </div>
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
