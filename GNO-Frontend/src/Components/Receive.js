import React from 'react'
import QRCode from 'qrcode.react';
import { FaRegCopy } from 'react-icons/fa';
import copy from "copy-to-clipboard";


function Receive({walletAddress}) {

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
  return (
    <>
    <div className="text-[--bg-color] flex flex-col items-center mt-10">
        <div className="flex flex-col items-center justify-center bg-white border-[--border-color] border shadow-sm p-6 gap-3 rounded-2xl">
          <div className='bg-[--green-color] p-1'>
          <QRCode value={walletAddress} size={180} />
          </div>
          <div className='relative'>
            <h1>{formatWalletAddress(walletAddress)} <FaRegCopy className='absolute right-[-20px] top-2 text-[12px] cursor-pointer' onClick={copyToClipboard} /></h1>
          </div>
            </div>
        </div>
    </>
)
}

export default Receive