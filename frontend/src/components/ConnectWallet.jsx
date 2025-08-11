
import API from "../utils/api";
import { useState, useEffect } from "react";
import { useTheme } from "../App";

export default function ConnectWallet() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const { isDark } = useTheme();

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window.ethereum !== "undefined";
  };

  // Connect to MetaMask
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      alert("MetaMask not detected. Please install MetaMask to continue.");
      return;
    }

    setLoading(true);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(accounts[0]);
    } catch (err) {
      if (err.code === 4001) {
        alert("Wallet connection rejected.");
      } else {
        alert("Error connecting wallet.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Format address: 0x1234...abcd
  const formatAddress = (addr) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Auto-connect if already connected
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        }
      });
    }
  }, []);

  return (
    <div className={`backdrop-blur-sm border rounded-xl p-6 max-w-xs mx-auto shadow-lg transition-all duration-300 hover:scale-105 animate-slideInUp ${
      isDark 
        ? 'bg-gray-800/50 border-gray-700' 
        : 'bg-white/50 border-gray-200'
    }`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">🦊</span>
        </div>
        <h3 className="text-lg font-semibold">Wallet Connection</h3>
      </div>

      {address ? (
        <div className="space-y-3 animate-fadeIn">
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Connected as:
          </p>
          <div className={`font-mono text-sm px-3 py-2 rounded-lg transition-colors duration-200 ${
            isDark 
              ? 'bg-gray-700 text-green-400' 
              : 'bg-green-50 text-green-600'
          }`}>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="break-all">{formatAddress(address)}</span>
            </div>
          </div>
          <button
            onClick={() => setAddress("")}
            className={`w-full py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 ${
              isDark 
                ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20' 
                : 'text-red-600 hover:text-red-700 hover:bg-red-50'
            }`}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-medium rounded-lg shadow hover:shadow-lg transition-all duration-200 hover:scale-105 animate-pulse"
        >
          <div className="flex items-center justify-center space-x-2">
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            <span>{loading ? "Connecting..." : "Connect Wallet"}</span>
          </div>
        </button>
      )}
    </div>
  );
}
