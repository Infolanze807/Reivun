import React, { useState,useEffect } from 'react';
import { PiEyeFill, PiEyeSlashFill } from "react-icons/pi";
import { FaSpinner } from "react-icons/fa"; 
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import logo from '../Images/gno-wallet.jpeg';
import axios from 'axios';
import { useAuth } from "../Utils/AuthProvider";
import copy from 'copy-to-clipboard';
import { Link } from "react-router-dom";


function Login({ setFunctionData}) {
  const [walletAddress, setWalletAddress] = useState('');
  useEffect(() => {
    const WalletData = localStorage.getItem("Wallet Data:");
    if (WalletData) {
      const FetchWalletData = JSON.parse(WalletData);
      setWalletAddress(FetchWalletData.Wallet_address);
    }
  }, []);

  const { login } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const WalletData = localStorage.getItem("Wallet Data:");
        const FetchWalletData = JSON.parse(WalletData);
        const address = FetchWalletData.Wallet_address;
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/wallet/${address}/${values.password}`);
        
        if (response.data && response.data.success) {
          console.log("dd:",response)
          console.log(response.data.address);
          setFunctionData(response.data.address);
          console.log("Login successful");
      login("True");
          navigate("/main");
        } else {
          setError("Invalid address or password. Please try again.");
        }
      } catch (error) {
        if (error.response) {
          setError(`Error: ${error.response.data.message || "Invalid address or password. Please try again."}`);
        } else if (error.request) {
          setError("Network error: Unable to reach the backend. Please check your internet connection or try again later.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
        console.error("Error during authentication:", error);
      } finally {
        setIsLoading(false); 
      }
    },
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const copyToClipboard = () => {
    copy(walletAddress);
    alert("Copied to clipboard!");
  };


  return (
    <>
      <div className="text-white flex flex-col items-center h-[80vh] md:h-[90vh] lg:h-[90vh] xl:h-[90vh] justify-center">
        <img src={logo} className="mb-5 h-[100px] w-[100px] rounded-full  shadow-custom"  id="notinvert" />
        <div className="flex flex-col items-center justify-center bg-[--bg-color] border-[--border-color] border shadow-sm p-4 rounded-2xl w-[300px] sm:w-[320px] md:w-[350px] lg:w-[350px] xl:w-[400px]">
          <div className="text-center w-full">
            <p className="text-base">Secure and trusted crypto wallet</p>
          </div>
          <form onSubmit={formik.handleSubmit} className="w-full">
            <div className="w-full relative py-4">
              <div className='text-center py-2 '>
                <h1 className='lg:truncate truncate cursor-pointer' value={walletAddress} onClick={copyToClipboard}>{walletAddress}</h1>
              </div>
              <div className='relative'>
              {passwordVisible ? (
                <PiEyeFill onClick={togglePasswordVisibility} className="absolute top-9 right-2 text-[--green-color] font-bold cursor-pointer" />
              ) : (
                <PiEyeSlashFill onClick={togglePasswordVisibility} className="absolute top-9 right-2 text-[--green-color] font-bold cursor-pointer" />
              )}
              <label className="text-sm text-[--green-color]">Password:</label>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                className="bg-[--border-color] w-full h-[40px] rounded-sm px-2 focus:outline-[--green-color] b"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder='Enter Your Password'
              />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="grid grid-cols-2 w-full py-2">
              <div>
                <Link to={'/sign-up'}>
                <button className="text-[--green-color] text-base w-full p-2">
                  Back
                </button>
                </Link>
              </div>
              <div>
                <button
                  className="bg-[--green-color] text-white text-base w-full rounded-full p-2 flex items-center justify-center"
                  type="submit"
                  disabled={isLoading} 
                >
                  {isLoading ? <FaSpinner className="animate-spin mr-2" /> : "Unlock"} 
                </button>
              </div>
            </div>
            {error && <p className='text-red-600 w-full pt-2 text-xs text-center'>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
