import API from "../utils/api";
import { useState, useEffect } from "react";

export default function ConnectWallet() {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 max-w-xs mx-auto shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Wallet Connection</h3>

      {address ? (
        <div className="space-y-3">
          <p className="text-sm text-gray-300">Connected as:</p>
          <p className="font-mono text-sm bg-gray-700 px-3 py-2 rounded text-green-400 break-all">
            {formatAddress(address)}
          </p>
          <button
            onClick={() => setAddress("")}
            className="w-full py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={loading}
          className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-medium rounded-lg shadow hover:shadow-md transition-all"
        >
          {loading ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  );
}