import React, { useState } from "react";
import { ethers } from "ethers";
import "../styles/Button.css";

const Button = () => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState(null);

  if (window.ethereum)
    window.ethereum.on("accountsChanged", () => connectWalletHandler());

  const connectWalletHandler = async () => {
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        const req = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(req[0]);
        setBalance("Loading...");

        const balanceReq = await window.ethereum.request({
          method: "eth_getBalance",
          params: [req[0], "latest"],
        });

        const balance = +ethers.utils.formatEther(balanceReq);
        setBalance(balance);
      } else setError("Please install MetaMask");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <button onClick={connectWalletHandler} className="button">
        Sync
      </button>
      {balance !== null && <p>Balance: {balance}</p>}
      {account && <p>Account: {account}</p>}
      {error && <p>Error: {error}</p>}
    </>
  );
};

export default Button;
