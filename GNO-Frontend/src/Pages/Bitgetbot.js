// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FiActivity } from "react-icons/fi";
// import logo from "../Images/gno-wallet.png";
// import { BsStars } from "react-icons/bs";
// import { io }from "socket.io-client";

// const Bitgetbot = () => {
//   const [isRunning, setIsRunning] = useState(false);
//   const [symbolsData, setSymbolsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isSocketLoading, setIsSocketLoading] = useState(false);
//   const [config, setConfig] = useState({
//     timeframe: "1m",
//     leverage: 1,
//     tradeAmount: 100,
//     demoMode: true,
//   });
//   const [credentials, setCredentials] = useState({
//     apiKey: "",
//     secretKey: "",
//     passphrase: "",
//   });

//   // Handle changes in the config (such as timeframe, leverage, etc.)
//   const handleConfigChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setConfig((prevConfig) => ({
//       ...prevConfig,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Handle changes in credentials (API key, secret, etc.)
//   const handleCredentialsChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prevCred) => ({
//       ...prevCred,
//       [name]: value,
//     }));
//   };

//   // Start or stop the bot based on the current state
//   const handleStartStopBot = async () => {
//     if (isRunning) {
//       // Stop the bot
//       setIsRunning(false);
//       console.log("Bot stopped");
//     } else {
//       // Start the bot
//       if (config.demoMode) {
//         setLoading(true);
//         try {
//           const response = await axios.get("https://reivun-gkdi.vercel.app/symbols", {
//             headers: {
//               "API-Key": credentials.apiKey,
//               "Secret-Key": credentials.secretKey,
//               Passphrase: credentials.passphrase,
//             },
//           });
//           setSymbolsData(response.data);
//           console.log(response.data, "get");
//           setIsRunning(true);
//         } catch (error) {
//           console.error("Error fetching data from API", error);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         alert("Bot cannot run when demo mode is off!");
//       }
//     }
//   };

//   useEffect(() => {
//     // Function to fetch initial data
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("https://reivun-gkdi.vercel.app/symbols");
//         setSymbolsData(response.data); // Set the symbols data initially
//       } catch (error) {
//         setError("Error fetching data from API");
//         console.error("Error fetching data from API", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Fetch initial data
//     fetchData();

//     // Function to establish WebSocket connection with reconnection logic
//     const connectWebSocket = () => {
//       const socket = new WebSocket("wss://https://reivun-gkdi.vercel.app");

//       // WebSocket onopen event handler
//       socket.onopen = () => {
//         console.log("WebSocket connection established");
//       };

//       // WebSocket onmessage event handler
//       socket.onmessage = (event) => {
//         setIsSocketLoading(true);
//         console.log("WebSocket message received:", event.data); // Log the raw message

//         try {
//           const data = JSON.parse(event.data); // Parse incoming JSON data
//           console.log("Parsed WebSocket message:", data); // Log parsed data
//           setSymbolsData((prevData) => {
//             return {
//               ...prevData,
//               ...data, // Merge new WebSocket data with existing symbols data
//             };
//           });
//         } catch (error) {
//           console.error("Error processing WebSocket data:", error);
//           setError("Error processing WebSocket data");
//         } finally {
//           setIsSocketLoading(false);
//         }
//       };

//       // WebSocket onerror event handler
//       socket.onerror = (error) => {
//         setError("Error with WebSocket connection");
//         console.error("WebSocket error:", error);
//       };

//       // WebSocket onclose event handler to reconnect if the connection is closed
//       socket.onclose = (event) => {
//         if (!event.wasClean) {
//           console.error("WebSocket connection closed unexpectedly, reconnecting...");
//           setTimeout(connectWebSocket, 30000); // Reconnect after 3 seconds
//         } else {
//           console.log("WebSocket connection closed cleanly");
//         }
//       };

//       return socket;
//     };

//     // Establish the WebSocket connection
//     const socket = connectWebSocket();

//     // Cleanup WebSocket connection when the component unmounts
//     return () => {
//       console.log("Closing WebSocket connection");
//       socket.close();
//     };
//   }, []);  
//   return (
//     <div className="min-h-screen bg-[--bg-color] p-4">
//       <div className="mx-auto max-w-7xl space-y-4">
//         <header className="flex items-center justify-between">
//           {/* <div className="flex items-center space-x-5">
//           <h1 className="text-3xl font-light text-[--green-color]">Reivun Bot</h1>
//           <p className="text-gray-600 pt-1">Automatic analysis of crypto markets in real time</p>
//         </div>
//         <a href='/' className='cursor-pointer'><img src={logo} alt="Logo" className="h-12 w-12 rounded-full" /></a> */}
//           <div className="lg:col-span-4 col-span-6">
//             <a href="/" className="flex items-center grid-cols-3 space-x-3">
//               <img
//                 src={logo}
//                 g
//                 className="md:w-16 w-12 rounded-full"
//                 alt="Reivun Logo"
//               />
//               <span className="text-3xl font-semibold text-[--main-color]">
//                 Reivun Bot
//               </span>
//             </a>
//           </div>
//         </header>

//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 bg-white rounded-lg p-5">
//           <div className="p-2 lg:p-0 lg:px-3 rounded-full shadow flex items-center gap-2">
//             <FiActivity className="text-lg" />
//             <h3 className="text-sm">5 markets to watch</h3>
//           </div>
//           <p className="text-gray-600 pt-1">
//             Automatic analysis of crypto markets in real time
//           </p>
//           <div className="p-2 lg:p-0 lg:px-3 rounded-full shadow flex items-center gap-2">
//             <BsStars className="text-lg" />
//             <h3 className="text-sm"> Automatic analysis active</h3>
//           </div>
//           <button
//             onClick={handleStartStopBot}
//             className="bg-[--green-color] hover:bg-[--main-color] text-white font-bold p-2 rounded"
//           >
//             {isRunning ? "Bot Are Running " : "Start the Bot"}
//           </button>
//         </div>

//         <div className="grid gap-4 md:grid-cols-2 h-full">
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h1 className="text-2xl font-bold mb-4">Watched Market</h1>
//             {loading || isSocketLoading ? (
//               <div className="text-center text-xl text-[--green-color]">Loading...</div>
//             ) : isRunning && symbolsData.length === 0 ? (
//               <div className="text-center text-xl text-[--green-color]">No data available</div>
//             ) : isRunning ? (
//               <div className="space-y-3 max-h-[280px] overflow-y-scroll pl-3">
//                 {Object.entries(symbolsData).map(([pair, update], index) => (
//                   <div
//                     key={index}
//                     className="border-b border-gray-100 py-3 last:border-b-0"
//                   >
//                     <div className="flex justify-between">
//                       {/* Pair Name */}
//                       <div className="text-lg font-bold text-gray-700">
//                         {pair}
//                       </div>

//                       {/* Timestamp */}
//                       <div className="text-sm text-gray-500">
//                         {update.timestamp}
//                       </div>
//                     </div>
//                     {/* Dynamic Fields */}
//                     <div className="mt-1 flex gap-5">
//                       {Object.entries(update).map(([key, value]) => {
//                         // Skip rendering the timestamp again if already displayed above
//                         if (key === "timestamp") return null;

//                         // Handle specific keys like 'message' and 'price' separately
//                         if (key === "message" && update.price) {
//                           return (
//                             <div key={key} className="text-sm text-gray-800">
//                               <span className="font-medium">{key}: </span>
//                               {value.includes("Analyzing") ? (
//                                 <>
//                                   Analyzing... Current price: $$
//                                   {Number(update.price).toLocaleString()}
//                                 </>
//                               ) : (
//                                 ` $${Number(update.price).toLocaleString()}`
//                               )}
//                             </div>
//                           );
//                         }

//                         // Render other fields dynamically
//                         return (
//                           <div key={key} className="text-sm text-gray-800">
//                             <span className="font-medium capitalize flex">
//                               {key}:{" "}
//                             </span>
//                             <span>{String(value)}</span>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : <div className="text-center text-xl text-[--green-color]"> No Data Available..</div>}
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h2 className="mb-4 text-xl font-semibold">
//               Configuration For Bot
//             </h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="mb-2 block text-sm font-medium">
//                   Timeframe
//                 </label>
//                 <select
//                   name="timeframe"
//                   value={config.timeframe}
//                   onChange={handleConfigChange}
//                   className="w-full border rounded-md p-2"
//                 >
//                   <option value="1m">1m</option>
//                   <option value="5m">5m</option>
//                   <option value="15m">15m</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium">
//                   Leverage
//                 </label>
//                 <input
//                   type="number"
//                   name="leverage"
//                   value={config.leverage}
//                   onChange={handleConfigChange}
//                   className="w-full border rounded-md p-2"
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium">
//                   Trade Amount (USDT)
//                 </label>
//                 <input
//                   type="number"
//                   name="tradeAmount"
//                   value={config.tradeAmount}
//                   onChange={handleConfigChange}
//                   className="w-full border rounded-md p-2"
//                 />
//               </div>

//               <div className="flex items-center justify-between">
//                 <span>Demo Mode</span>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     name="demoMode"
//                     checked={config.demoMode}
//                     onChange={handleConfigChange}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[--green-color]"></div>
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="mb-4 text-xl font-semibold">API Configuration</h2>
//           <div className="grid gap-4 md:grid-cols-3">
//             <div>
//               <label className="mb-2 block text-sm font-medium">API Key</label>
//               <input
//                 type="password"
//                 name="apiKey"
//                 value={credentials.apiKey}
//                 onChange={handleCredentialsChange}
//                 placeholder="Enter your Bitget API key"
//                 className="w-full border rounded-md p-2"
//               />
//             </div>
//             <div>
//               <label className="mb-2 block text-sm font-medium">
//                 Secret Key
//               </label>
//               <input
//                 type="password"
//                 name="secretKey"
//                 value={credentials.secretKey}
//                 onChange={handleCredentialsChange}
//                 placeholder="Enter your Bitget secret key"
//                 className="w-full border rounded-md p-2"
//               />
//             </div>
//             <div>
//               <label className="mb-2 block text-sm font-medium">
//                 Passphrase
//               </label>
//               <input
//                 type="password"
//                 name="passphrase"
//                 value={credentials.passphrase}
//                 onChange={handleCredentialsChange}
//                 placeholder="Enter your Bitget passphrase"
//                 className="w-full border rounded-md p-2"
//               />
//             </div>
//           </div>
//           <button className="mt-4 w-full bg-[--green-color] hover:bg-[--main-color] text-white font-bold py-2 px-4 rounded">
//             Save Credentials
//           </button>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="mb-4 text-xl font-semibold">BTC/USDT Price Chart</h2>
//           <div className="h-[400px] rounded-lg bg-zinc-800 flex items-center justify-center">
//             <span className="text-[--green-color]">
//               Chart implementation coming soon...
//             </span>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="mb-4 text-xl font-semibold">Trade History</h2>
//           <div className="flex h-[200px] items-center justify-center rounded-lg border">
//             <h3 className="text-gray-500">Aucun trade pour le moment</h3>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Bitgetbot;

// // import { useState,useEffect } from 'react';
// // import { FiActivity } from "react-icons/fi";
// // import logo from "../Images/gno-wallet.png";
// // import { BsStars } from "react-icons/bs";

// // const Bitgetbot = () => {
// //   const [isRunning, setIsRunning] = useState(false);
// //   const [logs, setLogs] = useState([]);
// //   const [config, setConfig] = useState({
// //     timeframe: '1m',
// //     leverage: 1,
// //     tradeAmount: 100,
// //     demoMode: true
// //   });
// //   const [credentials, setCredentials] = useState({
// //     apiKey: '',
// //     secretKey: '',
// //     passphrase: ''
// //   });

// //     const CRYPTO_PAIRS = [
// //       'BTC/USDT', 'TAO/USDT', 'ETH/USDT', 'XRP/USDT', 'SHIB/USDT', 'PEPE/USDT',
// //       'SOL/USDT', 'BGB/USDT', 'ADA/USDT', 'SUI/USDT', 'SEI/USDT', 'DOGE/USDT',
// //       'FIL/USDT', 'LTC/USDT', 'LINK/USDT', 'FET/USDT', 'PEAQ/USDT', 'TON/USDT',
// //       'APE/USDT', 'AVAX/USDT', 'ARB/USDT', 'TIA/USDT', 'NEAR/USDT', 'KAS/USDT',
// //       'APT/USDT', 'ATOM/USDT', 'RENDER/USDT', 'STX/USDT', 'INJ/USDT', 'FTM/USDT',
// //       'JASMY/USDT', 'BNB/USDT', '1INCH/USDT', 'BONK/USDT', 'SUSHI/USDT',
// //       'ROSE/USDT', 'AERO/USDT'
// //     ];

// //     const handleConfigChange = (e) => {
// //       const { name, value, type, checked } = e.target;
// //       setConfig(prevConfig => ({
// //         ...prevConfig,
// //         [name]: type === 'checkbox' ? checked : value
// //       }));
// //     };

// //     const handleCredentialsChange = (e) => {
// //       const { name, value } = e.target;
// //       setCredentials(prevCred => ({
// //         ...prevCred,
// //         [name]: value
// //       }));
// //     };

// //     const handleStartBot = async () => {
// //       try {
// //         // Simulating API call
// //         await new Promise(resolve => setTimeout(resolve, 1000));
// //         setIsRunning(true);
// //         addLog('System', 'Bot started successfully');
// //       } catch (error) {
// //         console.error('Error starting bot:', error);
// //         addLog('System', `Error starting bot: ${error.message}`);
// //       }
// //     };

// //     const handleStopBot = () => {
// //       setIsRunning(false);
// //       addLog('System', 'Bot stopped');
// //     };

// //     const addLog = (symbol, message) => {
// //       const timestamp = new Date().toLocaleString();
// //       setLogs(prevLogs => [{ timestamp, symbol, message }, ...prevLogs.slice(0, 99)]);
// //     };

// //     useEffect(() => {
// //       if (isRunning) {
// //         const interval = setInterval(() => {
// //           const randomPair = CRYPTO_PAIRS[Math.floor(Math.random() * CRYPTO_PAIRS.length)];
// //           const randomAction = Math.random();

// //           if (randomAction < 0.1) {
// //             // Simulate hammer pattern detection
// //             addLog(randomPair, "Hammer detected!");
// //             addLog(randomPair, `[DEMO] Simulated buy order: 100 USDT`);
// //           } else if (randomAction < 0.2) {
// //             // Simulate trailing stop hit
// //             addLog(randomPair, "[DEMO] Trailing stop hit at 35000 (entry: 34000)");
// //           } else if (randomAction < 0.3) {
// //             // Simulate take profit
// //             addLog(randomPair, "[DEMO] Taking profit at 36000 (entry: 34000)");
// //           } else if (randomAction < 0.4) {
// //             // Simulate stop loss
// //             addLog(randomPair, "[DEMO] Stop loss at 33000 (entry: 34000)");
// //           } else {
// //             // Regular analysis log
// //             const price = (Math.random() * 1000 + 30000).toFixed(2);
// //             addLog(randomPair, `Analyzing... Current price: $${price}`);
// //           }
// //         }, 2000); // Generate a log every 2 seconds

// //         return () => clearInterval(interval);
// //       }
// //     }, [isRunning]);
// //   return (
// //     <div className="min-h-screen bg-[--bg-color] p-4">
// //     <div className="mx-auto max-w-7xl space-y-4">
// //       <header className="flex items-center justify-between">
// //         {/* <div className="flex items-center space-x-5">
// //           <h1 className="text-3xl font-light text-[--green-color]">Reivun Bot</h1>
// //           <p className="text-gray-600 pt-1">Automatic analysis of crypto markets in real time</p>
// //         </div>
// //         <a href='/' className='cursor-pointer'><img src={logo} alt="Logo" className="h-12 w-12 rounded-full" /></a> */}
// //         <div className="lg:col-span-4 col-span-6">
// //                     <a href="/" className="flex items-center grid-cols-3 space-x-3">
// //                       <img
// //                         src={logo}g
// //                         className="md:w-16 w-12 rounded-full"
// //                         alt="Reivun Logo"
// //                       />
// //                       <span className="text-3xl font-semibold text-[--main-color]">
// //                         Reivun Bot
// //                       </span>
// //                     </a>
// //                   </div>
// //       </header>

// //       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 bg-white rounded-lg p-5">
// //         <div className="p-2 lg:p-0 lg:px-3 rounded-full shadow flex items-center gap-2">
// //             <FiActivity className="text-lg" />
// //             <h3 className="text-sm">5 markets to watch</h3>
// //         </div>
// //         <p className="text-gray-600 pt-1">Automatic analysis of crypto markets in real time</p>
// //         <div className="p-2 lg:p-0 lg:px-3 rounded-full shadow flex items-center gap-2">
// //           <BsStars className="text-lg" />
// //             <h3 className="text-sm"> Automatic analysis active</h3>
// //         </div>
// //           <button
// //             onClick={handleStartBot}
// //             className="bg-[--green-color] hover:bg-[--main-color] text-white font-bold p-2 rounded"
// //           >
// //             {isRunning ? 'Arrêter le Bot' : 'Start the Bot'}
// //           </button>
// //       </div>

// //       <div style={{ display: 'flex', gap: '20px' }}>
// //         <div style={{ flex: 1 }}>
// //           <h2>Watched Market</h2>
// //           <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
// //             {logs.map((log, index) => (
// //               <div key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
// //                 <span style={{ fontSize: '0.8em', color: '#666' }}>{log.timestamp}</span>
// //                 <p style={{ margin: '5px 0' }}>
// //                   <strong>{log.symbol}:</strong> {log.message}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="bg-white p-6 rounded-lg shadow">
// //           <h2 className="mb-4 text-xl font-semibold">Configuration du Bot</h2>
// //           <div className="space-y-4">
// //             <div>
// //               <label className="mb-2 block text-sm font-medium">Timeframe</label>
// //               <select
// //                 name="timeframe"
// //                 value={config.timeframe}
// //                 onChange={handleConfigChange}
// //                 className="w-full border rounded-md p-2"
// //               >
// //                 <option value="1m">1m</option>
// //                 <option value="5m">5m</option>
// //                 <option value="15m">15m</option>
// //               </select>
// //             </div>

// //             <div>
// //               <label className="mb-2 block text-sm font-medium">Leverage</label>
// //               <input
// //                 type="number"
// //                 name="leverage"
// //                 value={config.leverage}
// //                 onChange={handleConfigChange}
// //                 className="w-full border rounded-md p-2"
// //               />
// //             </div>

// //             <div>
// //               <label className="mb-2 block text-sm font-medium">Trade Amount (USDT)</label>
// //               <input
// //                 type="number"
// //                 name="tradeAmount"
// //                 value={config.tradeAmount}
// //                 onChange={handleConfigChange}
// //                 className="w-full border rounded-md p-2"
// //               />
// //             </div>

// //             <div className="flex items-center justify-between">
// //               <span>Demo Mode</span>
// //               <label className="relative inline-flex items-center cursor-pointer">
// //                 <input
// //                   type="checkbox"
// //                   name="demoMode"
// //                   checked={config.demoMode}
// //                   onChange={handleConfigChange}
// //                   className="sr-only peer"
// //                 />
// //                 <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[--green-color]"></div>
// //               </label>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="bg-white p-6 rounded-lg shadow">
// //         <h2 className="mb-4 text-xl font-semibold">API Configuration</h2>
// //         <div className="grid gap-4 md:grid-cols-3">
// //           <div>
// //             <label className="mb-2 block text-sm font-medium">API Key</label>
// //             <input
// //               type="password"
// //               name="apiKey"
// //               value={credentials.apiKey}
// //               onChange={handleCredentialsChange}
// //               placeholder="Enter your Bitget API key"
// //               className="w-full border rounded-md p-2"
// //             />
// //           </div>
// //           <div>
// //             <label className="mb-2 block text-sm font-medium">Secret Key</label>
// //             <input
// //               type="password"
// //               name="secretKey"
// //               value={credentials.secretKey}
// //               onChange={handleCredentialsChange}
// //               placeholder="Enter your Bitget secret key"
// //               className="w-full border rounded-md p-2"
// //             />
// //           </div>
// //           <div>
// //             <label className="mb-2 block text-sm font-medium">Passphrase</label>
// //             <input
// //               type="password"
// //               name="passphrase"
// //               value={credentials.passphrase}
// //               onChange={handleCredentialsChange}
// //               placeholder="Enter your Bitget passphrase"
// //               className="w-full border rounded-md p-2"
// //             />
// //           </div>
// //         </div>
// //         <button className="mt-4 w-full bg-[--green-color] hover:bg-[--main-color] text-white font-bold py-2 px-4 rounded">
// //           Save Credentials
// //         </button>
// //       </div>

// //       <div className="bg-white p-6 rounded-lg shadow">
// //         <h2 className="mb-4 text-xl font-semibold">BTC/USDT Price Chart</h2>
// //         <div className="h-[400px] rounded-lg bg-zinc-800 flex items-center justify-center">
// //           <span className="text-[--green-color]">Chart implementation coming soon...</span>
// //         </div>
// //       </div>

// //       <div className="bg-white p-6 rounded-lg shadow">
// //         <h2 className="mb-4 text-xl font-semibold">Trade History</h2>
// //         <div className="flex h-[200px] items-center justify-center rounded-lg border">
// //           <h3 className="text-gray-500">Aucun trade pour le moment</h3>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// //   )
// // }

// // export default Bitgetbot

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiActivity } from "react-icons/fi";
import logo from "../Images/gno-wallet.png";
import { BsStars } from "react-icons/bs";
import io from 'socket.io-client';

const Bitgetbot = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [symbolsData, setSymbolsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSocketLoading, setIsSocketLoading] = useState(false);
  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({
    apiKey: "",
    secretKey: "",
    passphrase: ""
  });
  const [config, setConfig] = useState({
    timeframe: "1m",
    leverage: 1,
    tradeAmount: 100,
    demoMode: true,
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
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleStartStopBot = async () => {
    if (isRunning) {
      setIsRunning(false);
      console.log("Bot stopped");
    } else {
      if (config.demoMode) {
        setLoading(true);
        try {
          const response = await axios.get("https://reivun-gkdi.vercel.app/symbols", {
            headers: {
              "API-Key": credentials.apiKey,
              "Secret-Key": credentials.secretKey,
              Passphrase: credentials.passphrase,
            },
          });
          setSymbolsData(response.data);
          console.log(response.data, "get");
          setIsRunning(true);
        } catch (error) {
          setError("Error fetching data from API");
          console.error("Error fetching data from API", error);
        } finally {
          setLoading(false);
        }
      } else {
        alert("Bot cannot run when demo mode is off!");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://reivun-gkdi.vercel.app/symbols");
        setSymbolsData(response.data);
      } catch (error) {
        setError("Error fetching data from API");
        console.error("Error fetching data from API", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const socket = io('https://reivun-gkdi.vercel.app');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('symbolsData', (data) => {
      setIsSocketLoading(true);
      console.log("Socket.IO message received:", data);
      setSymbolsData((prevData) => ({
        ...prevData,
        ...data,
      }));
      setIsSocketLoading(false);
    });

    socket.on('error', (error) => {
      setError("Error with Socket.IO connection");
      console.error("Socket.IO error:", error);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      console.log('Closing Socket.IO connection');
      socket.disconnect();
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
            <h3 className="text-sm"> Automatic analysis active</h3>
          </div>
          <button
            onClick={handleStartStopBot}
            className="bg-[--green-color] hover:bg-[--main-color] text-white font-bold p-2 rounded"
          >
            {isRunning ? "Bot Are Running " : "Start the Bot"}
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 h-full w-full">
          <div className="bg-white p-2 rounded-lg shadow">
            <h2 className="mb-4 text-xl font-semibold">Watched Market</h2>
            <div className="bg-[--bg-color] rounded-lg px-2 overflow-y-scroll max-h-[300px]">
            {Object.entries(symbolsData).length === 0 && !isSocketLoading ? (
            <p>No data available.</p>
          ) : (
            Object.entries(symbolsData).map(([symbol, data]) => (
                <div key={symbol} className="py-2">
                  <div className="flex justify-between border-b border-[--green-color] pb-1">
                    <h3 className="text-[--green-color]">{symbol}</h3>
                    <h4 className="text-gray-400">{data.timestamp}</h4>
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-[--green-color] font-thin">
                        <th className="px-2">Open</th>
                        <th className="px-2">High</th>
                        <th className="px-2">Low</th>
                        <th className="px-2">Close</th>
                        <th className="px-2">Volume</th>
                        <th className="px-2">Hammer</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-xs text-center text-gray-400">
                        <td className="">{data?.open?.toFixed(2) || "N/A"}</td>
                        <td className="">{data?.high?.toFixed(2) || "N/A"}</td>
                        <td className="">{data?.low?.toFixed(2) || "N/A"}</td>
                        <td className="">{data?.close?.toFixed(2) || "N/A"}</td>
                        <td className="">
                          {data?.volume?.toFixed(2) || "N/A"}
                        </td>
                        <td className="">{data?.isHammer ? "Yes" : "No"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))
            )}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="mb-4 text-xl font-semibold">
              Configuration For Bot
            </h2>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Timeframe
                </label>
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
                <label className="mb-2 block text-sm font-medium">
                  Leverage
                </label>
                <input
                  type="number"
                  name="leverage"
                  value={config.leverage}
                  onChange={handleConfigChange}
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Trade Amount (USDT)
                </label>
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
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[--green-color]"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="mb-4 text-xl font-semibold">API Configuration</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">API Key</label>
              <input
                type="password"
                name="apiKey"
                value={credentials.apiKey}
                onChange={handleCredentialsChange}
                placeholder="Enter your Bitget API key"
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Secret Key
              </label>
              <input
                type="password"
                name="secretKey"
                value={credentials.secretKey}
                onChange={handleCredentialsChange}
                placeholder="Enter your Bitget secret key"
                className="w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Passphrase
              </label>
              <input
                type="password"
                name="passphrase"
                value={credentials.passphrase}
                onChange={handleCredentialsChange}
                placeholder="Enter your Bitget passphrase"
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>
          <button className="mt-4 w-full bg-[--green-color] hover:bg-[--main-color] text-white font-bold py-2 px-4 rounded">
            Save Credentials
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="mb-4 text-xl font-semibold">BTC/USDT Price Chart</h2>
          <div className="h-[400px] rounded-lg bg-zinc-800 flex items-center justify-center">
            <span className="text-[--green-color]">
              Chart implementation coming soon...
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="mb-4 text-xl font-semibold">Trade History</h2>
          <div className="flex h-[200px] items-center justify-center rounded-lg border">
            <h3 className="text-gray-500">No trades at the moment</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bitgetbot;

