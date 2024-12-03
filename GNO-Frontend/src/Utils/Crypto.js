// src/utils/crypto.js
import CryptoJS from 'crypto-js';

// Encryption function
export const encryptPrivateKey = (privateKey, password) => {
  return CryptoJS.AES.encrypt(privateKey, password).toString();
};

// Decryption function
export const decryptPrivateKey = (encryptedPrivateKey, password) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedPrivateKey, password);
    const decryptedPrivateKey = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedPrivateKey;
  } catch (error) {
    console.error('Error decrypting private key:', error);
    return null;
  }
};
