import React from 'react'
import {  useNavigate } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import logo from '../Images/gno-wallet.jpeg'


function Success() {
  const navigate = useNavigate();

  const handleSuccess=()=>{
    navigate('/login');

  }
  return (
    <>
    <div className=" text-white flex flex-col items-center h-[75vh] md:h-[90vh] lg:h-[90vh] xl:h-[90vh] justify-center">
    <img
          src={logo}
          className="mb-5 h-[90px] w-[100px] shadow-custom"
        />
        <div className="flex flex-col items-center justify-center bg-[--bg-color] border-[--border-color] border shadow-sm p-4 rounded-2xl w-[300px] sm:w-[320px] md:w-[350px] lg:w-[350px] xl:w-[350px]">
        <FaCheckCircle className='text-[--green-color] text-4xl mb-5'/> 

       
       
            <div className='text-center w-full '>
                <p className='text-lg'>Your Wallet is ready to use!</p>
                <p className='text-sm mt-2 text-gray-400'>Remember to backup and keep your Secret Phrase safe.</p>
            </div>
            <div className='w-full my-4'>
            <button className="bg-[--green-color] text-white text-base w-full rounded-full p-2 mt-4" onClick={handleSuccess}>
                    Open Wallet
              </button>
            </div>
              </div>
        </div>
       
    </>
  )
}

export default Success;