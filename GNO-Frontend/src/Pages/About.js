// import React from 'react'
// import Header from './Header'
// import Footer from './Footer'

// const About = () => {
//   return (
//     <div>
//       <Header />
//       <div className='text-white py-28 md:py-32 px-5 md:px-20'>
//       <div className="max-w-3xl mx-auto font-sans">
//       <h1 className="text-3xl font-bold text-center mb-10 text-[--green-color]">About Us</h1>
//       <p className="text-lg mb-4">
//         Welcome to Reivun, the next-generation wallet designed for secure and decentralized management of your digital assets.
//       </p>
//       <p className="text-lg mb-4">
//         Founded in 2024 by the Leviatekh team, Reivun is built on a robust foundation: our proprietary blockchain, ensuring unmatched performance and uncompromising security. Anchored to the stablecoin DAI, we combine innovation, transparency, and stability to revolutionize your financial transactions.
//       </p>
//       <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Reivun?</h2>
//       <ul className="list-disc pl-5 space-y-2">
//         <li className="text-lg">
//           <strong>Proprietary Blockchain:</strong> Specifically designed for Reivun, our blockchain provides a unique, high-performance foundation optimized for decentralized asset management.
//         </li>
//         <li className="text-lg">
//           <strong>24/7 Advanced Security:</strong> Our dedicated cybersecurity team works around the clock, 24/7, to monitor network activity and safeguard your funds against potential threats.
//         </li>
//         <li className="text-lg">
//           <strong>Total Decentralization:</strong> With Reivun, you have complete control over your assets—no intermediaries, no third parties. You are the master of your finances.
//         </li>
//         <li className="text-lg">
//           <strong>Guaranteed Stability:</strong> By leveraging the stablecoin DAI, we deliver a seamless and stable financial experience tailored to your daily needs.
//         </li>
//       </ul>
//       <p className="text-lg mt-6">
//         At Reivun, we envision a future where autonomy, security, and innovation converge. Backed by Leviatekh, we are redefining the standards of decentralized financial management to offer you a solution that is both reliable and groundbreaking.
//       </p>
//       <p className="text-lg mt-4">
//         Reivun - your trust, secured and decentralized.
//       </p>
//     </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }

// export default About

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiActivity } from "react-icons/fi";
import logo from "../Images/gno-wallet.png";
import { BsStars } from "react-icons/bs";

const Bitgetbot = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [symbolsData, setSymbolsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSocketLoading, setIsSocketLoading] = useState(false);
  const [config, setConfig] = useState({
    timeframe: "1m",
    leverage: 1,
    tradeAmount: 100,
    demoMode: true,
  });
  const [credentials, setCredentials] = useState({
    apiKey: "",
    secretKey: "",
    passphrase: "",
  });

  const handleConfigChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCredentialsChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCred) => ({
      ...prevCred,
      [name]: value,
    }));
  };

  const handleStartBot = async () => {
    if (config.demoMode) {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/symbols", {
          headers: {
            "API-Key": credentials.apiKey,
            "Secret-Key": credentials.secretKey,
            "Passphrase": credentials.passphrase,
          },
        });
        setSymbolsData(response.data);
        console.log(response.data, "get");
        setIsRunning(true);
      } catch (error) {
        console.error("Error fetching data from API", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Bot cannot run in demo mode OFF");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/symbols");
        setSymbolsData(response.data);
        console.log(response.data, "get");
      } catch (error) {
        console.error("Error fetching data from API", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up WebSocket connection
    const socket = new WebSocket("ws://localhost:5000");
    socket.onmessage = (event) => {
      setIsSocketLoading(true);
      const data = JSON.parse(event.data);
      setSymbolsData((prevData) => [data, ...prevData]); // Prepend new data to the existing data
      setIsSocketLoading(false);
    };

    // Cleanup the WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[--bg-color] p-4">
      <div className="mx-auto max-w-7xl space-y-4">
        <header className="flex items-center justify-between">
          <div className="lg:col-span-4 col-span-6">
            <a href="/" className="flex items-center grid-cols-3 space-x-3">
              <img
                src={logo}
                className="md:w-16 w-12 rounded-full"
                alt="Reivun Logo"
              />
              <span className="text-3xl font-semibold text-[--main-color]">
                Reivun Bot
              </span>
            </a>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 bg-white rounded-lg p-5">
          <div className="p-2 lg:p-0 lg:px-3 rounded-full shadow flex items-center gap-2">
            <FiActivity className="text-lg" />
            <h3 className="text-sm">5 markets to watch</h3>
          </div>
          <p className="text-gray-600 pt-1">
            Automatic analysis of crypto markets in real time
          </p>
          <div className="p-2 lg:p-0 lg:px-3 rounded-full shadow flex items-center gap-2">
            <BsStars className="text-lg" />
            <h3 className="text-sm">Automatic analysis active</h3>
          </div>
          <button
            onClick={handleStartBot}
            className="bg-[--green-color] hover:bg-[--main-color] text-white font-bold p-2 rounded"
          >
            {isRunning ? "Arrêter le Bot" : "Start the Bot"}
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 h-full">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-4">Watched Market</h1>
            {(loading || isSocketLoading) ? (
              <div className="text-center">Loading...</div>
            ) : symbolsData.length === 0 ? (
              <div className="text-center">No data available</div>
            ) : (
              <div className="space-y-3 max-h-[280px] overflow-y-auto scroll">
                {Object.entries(symbolsData).map(([pair, update], index) => (
                  <div key={index} className="border-b border-gray-100 py-3 last:border-b-0">
                    <div className="text-lg font-bold text-gray-700">{pair}</div>
                    <div className="text-sm text-gray-500">{update.timestamp}</div>
                    <div className="mt-1 flex gap-3">
                      {Object.entries(update).map(([key, value]) => {
                        if (key === "timestamp") return null;
                        if (key === "message" && update.price) {
                          return (
                            <div key={key} className="text-sm text-gray-800">
                              <span className="font-medium">{key}: </span>
                              {value.includes("Analyzing") ? (
                                <>Analyzing... Current price: ${Number(update.price).toLocaleString()}</>
                              ) : (
                                ` $${Number(update.price).toLocaleString()}`
                              )}
                            </div>
                          );
                        }
                        return (
                          <div key={key} className="text-sm text-gray-800">
                            <span className="font-medium capitalize">{key}: </span>
                            <span>{String(value)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bot Configuration */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="mb-4 text-xl font-semibold">Configuration du Bot</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Timeframe</label>
                <select
                  name="timeframe"
                  value={config.timeframe}
                  onChange={handleConfigChange}
                  className="w-full border rounded-md p-2"
                >
                  <option value="1m">1m</option>
                  <option value="5m">5m</option>
                  <option value="15m">15m</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Leverage</label>
                <input
                  type="number"
                  name="leverage"
                  value={config.leverage}
                  onChange={handleConfigChange}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Trade Amount (USDT)</label>
                <input
                  type="number"
                  name="tradeAmount"
                  value={config.tradeAmount}
                  onChange={handleConfigChange}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <span>Demo Mode</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="demoMode"
                    checked={config.demoMode}
                    onChange={handleConfigChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:bg-[--green-color] peer-checked:ring-0"></div>
                </label>
              </div>

              <div>
                <h3 className="text-lg font-medium">API Credentials</h3>
                <div className="mt-2 space-y-4">
                  <div>
                    <label className="block text-sm font-medium">API Key</label>
                    <input
                      type="text"
                      name="apiKey"
                      value={credentials.apiKey}
                      onChange={handleCredentialsChange}
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Secret Key</label>
                    <input
                      type="text"
                      name="secretKey"
                      value={credentials.secretKey}
                      onChange={handleCredentialsChange}
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Passphrase</label>
                    <input
                      type="text"
                      name="passphrase"
                      value={credentials.passphrase}
                      onChange={handleCredentialsChange}
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bitgetbot;

// The data you've provided for the "BNB/USDT" pair is a candlestick, and based on the provided values, it doesn't meet the criteria for a Hammer candlestick. Let me explain why.

// Provided Candlestick Data:
// Timestamp: "2024-12-26 16:57:00"
// Open: 697.6
// High: 698.1
// Low: 697.6
// Close: 698.1
// Volume: 0.0981
// Calculations for Hammer Criteria:
// Real Body:
// realBody = |close - open| = |698.1 - 697.6| = 0.5

// Lower Shadow:
// lowerShadow = open - low = 697.6 - 697.6 = 0

// Upper Shadow:
// upperShadow = high - close = 698.1 - 698.1 = 0

// Hammer Conditions:

// Lower Shadow: Should be at least 2x the size of the real body.
// lowerShadow > 2 * realBody → 0 > 2 * 0.5 → 0 > 1 ❌

// Upper Shadow: Should be very small, typically no more than 10% of the real body.
// upperShadow <= 0.1 * realBody → 0 <= 0.1 * 0.5 → 0 <= 0.05 ✅

// Optional Bullish Candle: The candle is considered bullish if close > open.
// close > open → 698.1 > 697.6 → ✅

// Conclusion:
// The lower shadow is zero, which is not enough to fulfill the Hammer condition (lowerShadow > 2 * realBody).
// Therefore, this candlestick does not qualify as a Hammer (isHammer: false).