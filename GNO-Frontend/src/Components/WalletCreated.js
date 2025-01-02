import React, { useState } from "react";
import axios from "axios";
import { decryptPrivateKey } from "../Utils/Crypto"; // Adjust path as per your project structure
import logo from "../Images/gno-wallet.jpeg";

function WalletCreated() {
  const [walletData, setWalletData] = useState(null);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFetchWalletData = async () => {
    try {
      const WalletData = localStorage.getItem("Wallet Data:");
      const FetchWalletData = JSON.parse(WalletData);
      const address = FetchWalletData.Wallet_address;
       const response = await axios.get(`${process.env.REACT_APP_BACKEND}/wallet/${address}/${password}`);
      setWalletData(response.data);
      setShowPrivateKey(false); // Reset showPrivateKey state on new fetch
      setError(null); // Reset error state on new fetch
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Wrong password. Please try again.");
      } else {
        setError("Error fetching wallet data. Please try again later.");
      }
    }
  };

  const decryptAndDisplayPrivateKey = () => {
    if (walletData) {
      try {
        const decryptedPrivateKey = decryptPrivateKey(walletData.encryptedPrivateKey, password);
        setShowPrivateKey(true);
        setCopied(false); // Reset copied state on new private key display
      } catch (error) {
        console.error("Error decrypting private key:", error);
        setError("Error decrypting private key.");
      }
    }
  };

  const handleCopyPrivateKey = () => {
    if (walletData) {
      navigator.clipboard.writeText(decryptPrivateKey(walletData.encryptedPrivateKey, password))
        .then(() => setCopied(true))
        .catch(() => setError("Failed to copy private key. Please try again."));
    }
  };

  return (
    <div className="text-white flex flex-col items-center h-[100vh] md:h-[95vh] lg:h-[80vh] xl:h-[100vh] justify-center">
      <img src={logo} className="mb-5 h-[90px] w-[100px]shadow-custom" alt="logo" />
      <div className="flex flex-col items-center justify-center bg-[--bg-color] border-[--border-color] border shadow-sm p-5 rounded-2xl w-[300px] sm:w-[320px] md:w-[350px] lg:w-[400px] xl:w-[450px]">
        <div className="w-full">
          <h1>Wallet Details</h1>
          <div>
            <input
              id="passwordInput"
              type="password"
              className="bg-[--border-color] w-full h-[40px] px-2 focus:outline-[--green-color] outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-[--green-color] text-white text-base w-full rounded-full p-2 mt-4"
            onClick={handleFetchWalletData}
          >
            Fetch Wallet Data
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {walletData && (
            <div className="w-full">
              <p className="text-wrap">Wallet Address: <br /> {walletData.address}</p>
              <p>Password:<br /> {password}</p>
              {showPrivateKey && (
                <div>
                  <p>Decrypted Private Key:</p>
                  <textarea
                    rows={3}
                    readOnly
                    className="bg-[--border-color] w-full px-2 focus:outline-[--green-color] outline-none"
                    value={decryptPrivateKey(walletData.encryptedPrivateKey, password)}
                  />
                  <button onClick={handleCopyPrivateKey}>
                    {copied ? "Copied!" : "Copy Private Key"}
                  </button>
                </div>
              )}
              <button onClick={decryptAndDisplayPrivateKey}>
                Show Private Key
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WalletCreated;