import React, { useState } from 'react';
import { FiActivity } from "react-icons/fi";
import logo from "../Images/gno-wallet.png";
import { BsStars } from "react-icons/bs";
import { FaClockRotateLeft } from "react-icons/fa6";

const Bitgetbot = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [config, setConfig] = useState({
      timeframe: '1m',
      leverage: 1,
      tradeAmount: 100,
      demoMode: true
    });
    const [credentials, setCredentials] = useState({
      apiKey: '',
      secretKey: '',
      passphrase: ''
    });
  
    const handleConfigChange = (e) => {
      const { name, value, type, checked } = e.target;
      setConfig(prevConfig => ({
        ...prevConfig,
        [name]: type === 'checkbox' ? checked : value
      }));
    };
  
    const handleCredentialsChange = (e) => {
      const { name, value } = e.target;
      setCredentials(prevCred => ({
        ...prevCred,
        [name]: value
      }));
    };
  
    const handleStartBot = async () => {
      try {
        const response = await fetch('/api/trading', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...config, ...credentials }),
        });
        const data = await response.json();
        if (data.success) {
          setIsRunning(true);
        } else {
          console.error('Failed to start bot:', data.message);
        }
      } catch (error) {
        console.error('Error starting bot:', error);
      }
    };
  return (
    <div className="min-h-screen bg-[--bg-color] p-4">
    <div className="mx-auto max-w-7xl space-y-4">
      <header className="flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <h1 className="text-3xl font-light text-[--green-color]">Reivun Bot</h1>
          <p className="text-gray-600 pt-1">Automatic analysis of crypto markets in real time</p>
        </div>
        <a href='/' className='cursor-pointer'><img src={logo} alt="Logo" className="h-12 w-12 rounded-full" /></a>
      </header>

      <div className="grid gap-6 md:grid-cols-3 bg-white rounded-lg p-5">
        <div className="p-2 lg:p-0 lg:px-3 rounded-full shadow flex items-center gap-2">
            <FiActivity className="text-lg" />
            <h3 className="text-sm">5 markets to watch</h3>
        </div>
        <div className="p-2 lg:p-0 lg:px-3 rounded-full shadow flex items-center gap-2">
          <BsStars className="text-lg" />
            <h3 className="text-sm"> Automatic analysis active</h3>
        </div>
          <button 
            onClick={handleStartBot}
            className="bg-[--green-color] hover:bg-[--main-color] text-white font-bold p-2 rounded"
          >
            {isRunning ? 'Arrêter le Bot' : 'Start the Bot'}
          </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="mb-4 text-xl font-semibold">Watched Market</h2>
          <div className="space-y-2">
            {['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'XRP/USDT', 'ADA/USDT'].map((pair) => (
              <div key={pair} className="flex items-center justify-between rounded-lg border p-3">
                <span>{pair}</span>
                <span className="bg-[--green-color] text-white text-xs font-semibold px-3 py-1 rounded">Monitored</span>
              </div>
            ))}
          </div>
        </div>

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
            <label className="mb-2 block text-sm font-medium">Secret Key</label>
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
            <label className="mb-2 block text-sm font-medium">Passphrase</label>
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
          <span className="text-[--green-color]">Chart implementation coming soon...</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="mb-4 text-xl font-semibold">Trade History</h2>
        <div className="flex h-[200px] items-center justify-center rounded-lg border">
          <h3 className="text-gray-500">Aucun trade pour le moment</h3>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Bitgetbot