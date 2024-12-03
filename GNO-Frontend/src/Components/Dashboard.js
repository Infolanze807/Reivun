import React, { useEffect, useState } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import { getWeb3 } from '../Utils/Rpc';
import axios from 'axios'; 
import copy from "copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Utils/AuthProvider";

function Dashboard({ address }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(false);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const walletDataString = localStorage.getItem('Wallet Data:');
  const walletData = walletDataString ? JSON.parse(walletDataString) : null;
  const walletAddress = walletData ? walletData.Wallet_address : null;
  console.log('Wallet Address:', walletAddress);

  const formatTxHash = (address) => {
    if (address.length < 10) return address;
    const firstFour = address.substring(0, 5);
    const lastFour = address.substring(address.length - 5);
    return `${firstFour}....${lastFour}`;
  };

  const copyToClipboard = (text) => {
    copy(text);
    alert("Copied to clipboard!");
  };

  useEffect(() => {
    const fetchBalance = async () => {
      if (!walletAddress) return;

      try {
        const web3 = getWeb3();
        const balanceInWei = await web3.eth.getBalance(walletAddress);
        const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
        setBalance(balanceInEth);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [walletAddress]);

  useEffect(() => {
    const fetchTransactions = async () => {
      console.log("d", walletAddress);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/wallet/auth/transactions/${walletAddress}`);
        console.log("hello", response);
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [walletAddress]);

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
      <Navbar isOpen={navbar} handleMenu={handleMenu}  handleSignOut={handleSignOut} />
      <div className='mx-3 md:mx-5 lg:mx-8 mt-10'>
        <h1 className='text-[--green-color] font-bold text-3xl text-center'>{balance ? `${balance} xDAI` : 'Loading...'}</h1>
      </div>
      <div className='mx-3 md:mx-5 lg:mx-8 mt-10'>
        <h1 className='text-white font-bold text-3xl text-center'>Transaction History</h1>
      </div>
      <div className="flex items-center justify-center">
      <div className='mx-3 md:mx-5 lg:mx-8 bg-white mt-10 p-3 text-center rounded-lg overflow-y-auto w-[460px] sm:w-[620px] md:w-[650px] lg:w-[800px] xl:w-[830px]'>
        <table className='w-full'>
          <thead className="bg-[--green-color] text-white">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                No.
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                To
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Transaction Hash
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.txHash}>
                <td className="px-6 py-4 whitespace-nowrap text-left border-b-2">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-left border-b-2">{transaction.to}</td>
                <td className="px-6 py-4 whitespace-nowrap text-left border-b-2 hover:underline cursor-pointer" onClick={() => copyToClipboard(transaction.txHash)}>{formatTxHash(transaction.txHash)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-left border-b-2">{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
}

export default Dashboard;
