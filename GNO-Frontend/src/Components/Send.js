import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import axios from "axios";
import { getWeb3 } from "../Utils/Rpc";
import { decryptPrivateKey } from "../Utils/Crypto";
import { FaSpinner } from "react-icons/fa";
import copy from "copy-to-clipboard";

function Send({ walletAddress, balance }) {
  const navigate = useNavigate();
  const [privateKey, setPrivateKey] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [txHash, setTxHash] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPrivateKey = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/wallet/${walletAddress}/${password}`
      );
      const encryptedPrivateKey = response.data.encryptedPrivateKey;
      const decryptedPrivateKey = decryptPrivateKey(
        encryptedPrivateKey,
        password
      );
      console.log(decryptedPrivateKey);
      setPrivateKey(decryptedPrivateKey);
      setError(null);
      setShowPasswordModal(false); 
      await sendTransaction(values, decryptedPrivateKey);
    } catch (error) {
      setError("Error fetching or decrypting private key. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendTransaction = async (values, privateKey) => {
    if (!values.walletAddress || !values.amount || !privateKey) {
      setIsLoading(false);
      return;
    }
  
    try {
      const web3 = getWeb3(); 
      const amountWei = web3.utils.toWei(values.amount, "ether");
  
      const nonce = await web3.eth.getTransactionCount(walletAddress, "latest");
      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = 21000; 
  
      const tx = {
        from: walletAddress,
        to: values.walletAddress,
        value: amountWei,
        gas: gasLimit,
        gasPrice: gasPrice,
        nonce: nonce,
      };
  
      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
      console.log("Transaction sent. TxHash:", txHash);
      setTxHash(txHash.transactionHash);
      await axios.post(`${process.env.REACT_APP_BACKEND}/wallet/transaction`, {
        from: walletAddress, 
        to: values.walletAddress,
        txHash: txHash.transactionHash,
        amount: values.amount,
      });
  
      alert("Transaction sent successfully!");
      formik.resetForm();
      setPassword(""); 
    } catch (error) {
      console.error("Failed to send transaction:", error);
      alert("Failed to send transaction.");
    } finally {
      setIsLoading(false);
    }
  };
  

  const formik = useFormik({
    initialValues: {
      walletAddress: "",
      amount: "",
    },
    validationSchema: Yup.object({
      walletAddress: Yup.string().required("Required"),
      amount: Yup.number()
        .required("Required")
        .test("is-sufficient", "Insufficient balance", function (value) {
          return parseFloat(value) <= parseFloat(balance);
        }),
    }),
    onSubmit: (values) => {
      setShowPasswordModal(true); 
    },
  });

  const handleSendClick = () => {
    fetchPrivateKey(formik.values);
  };

  const togglePasswordModal = () => {
    setShowPasswordModal(!showPasswordModal);
    setPassword("");
  };
  
  const copyToclipboard = () => {
    copy(txHash);
    alert("Copied..!")
    setTxHash("");
  }
  
  return (
    <>
      <div className="text-white flex flex-col mt-10">
        <div className="flex flex-col items-center justify-center bg-[--bg-color] border-[--border-color] border shadow-sm p-5 rounded-2xl w-[300px] sm:w-[320px] md:w-[350px] lg:w-[400px] xl:w-[450px]">
          <div className="w-full">
            <h1>Send Transaction</h1>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Recipient Wallet Address"
                  className="bg-[--input-color] w-full h-[40px] px-2 rounded-sm focus:outline-[--green-color] b"
                  id="walletAddress"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.walletAddress}
                />
                {formik.touched.walletAddress && formik.errors.walletAddress ? (
                  <div className="text-red-500">
                    {formik.errors.walletAddress}
                  </div>
                ) : null}
              </div>
              <div className="w-full mt-4">
                <input
                  type="text"
                  placeholder="Amount (in ETH)"
                  className="bg-[--input-color] w-full h-[40px] px-2 rounded-sm focus:outline-[--green-color] b"
                  id="amount"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                />
                {formik.touched.amount && formik.errors.amount ? (
                  <div className="text-red-500">{formik.errors.amount}</div>
                ) : null}
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button
                type="submit"
                className="bg-[--green-color] text-white text-base w-full rounded-full p-2 mt-4 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  "Send Transaction"
                )}
              </button>
            </form>
            {txHash && (<div className="mt-3 p-2 rounded-lg bg-white text-black border border-[--border-color]">
              <p onClick={copyToclipboard} className="truncate text-sm hover:underline cursor-pointer">Transaction Hash:<br/>{txHash}</p>
            </div>)}
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[--bg-color] text-black h-[230px] w-[320px] p-4 rounded-lg border border-[--green-color]">
            <div className="pb-5">
              <p className="text-sm text-white">
                Please Enter Your Password To Perform This Transaction
              </p>
            </div>
            <div>
              <label className="text-[--green-color]">Password:</label>
              <input
                type="password"
                placeholder="Password"
                className="bg-[--input-color] w-full h-[40px] px-2 rounded-sm focus:outline-white b mt-2"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-5 mt-6">
                <button
                  type="button"
                  className="bg-[--green-color] p-1 rounded-lg flex items-center justify-center"
                  onClick={handleSendClick}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <FaSpinner className="animate-spin mr-2" />
                  ) : (
                    "Send"
                  )}
                </button>
                <button
                  type="button"
                  className="bg-red-600 rounded-lg"
                  onClick={togglePasswordModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Send;
