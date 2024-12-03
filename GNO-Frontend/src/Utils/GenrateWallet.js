// src/utils/generateWallet.js
import { ethers } from 'ethers';

export const generateWallet = () => {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    phrase: wallet.mnemonic.phrase
  };
};
