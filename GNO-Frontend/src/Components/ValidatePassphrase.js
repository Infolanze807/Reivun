// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { encryptPrivateKey } from "../Utils/Crypto";
// import axios from "axios";
// import logo from "../Images/gno-wallet.jpeg";
// import { FaRegCopy } from "react-icons/fa";

// function ValidatePassphrase() {
//   const [selectedWords, setSelectedWords] = useState([]);
//   const [validationIndexes, setValidationIndexes] = useState([]);
//   const [validationError, setValidationError] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { wallet, password } = location.state;

//   useEffect(() => {
//     const generateUniqueRandomNumbers = (min, max, count) => {
//       const numbers = new Set();
//       while (numbers.size < count) {
//         const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
//         numbers.add(randomNumber);
//       }
//       return Array.from(numbers);
//     };

//     const words = wallet.phrase.split(" ");
//     const shuffledIndexes = generateUniqueRandomNumbers(0, 11, 4);
//     setValidationIndexes(shuffledIndexes);
//     setSelectedWords(Array(words.length).fill(""));
//   }, [wallet]);

//   const handleValidatePassphrase = async () => {
//     const filledWords = validationIndexes.map(index => selectedWords[index]?.trim());
//     const fullPassphraseWords = wallet.phrase.split(' ').map(word => word.trim());

//     const isValid = validationIndexes.every((index, i) => filledWords[i] === fullPassphraseWords[index]);

//     if (isValid) {
//       const encryptedPrivateKey = encryptPrivateKey(wallet.privateKey, password);
//       const walletData = {
//         address: wallet.address,
//         encryptedPrivateKey,
//         password,
//       };
//       try {
//         const respone = await axios.post(`${process.env.REACT_APP_BACKEND}/wallet`, walletData);
//         console.log(respone)
//         const {address,_id} = respone.data.wallet;

//         const WalletDatas = {Wallet_address:address,User_id:_id}
//         localStorage.setItem("Wallet Data:",JSON.stringify(WalletDatas))

//         navigate('/success');
//       } catch (error) {
//         console.error('Error creating wallet:', error);
//         setValidationError('Error creating wallet. Please try again.');
//       }
//     } else {
//       setValidationError('The entered words do not match the passphrase.');
//     }
//   };

//   const handleInputChange = (index, value) => {
//     const updatedWords = [...selectedWords];
//     updatedWords[index] = value;
//     setSelectedWords(updatedWords);
//     setValidationError("");
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(wallet.phrase).then(() => {
//       alert('Phrase copied to clipboard!');
//     }).catch(err => {
//       console.error('Could not copy text: ', err);
//     });
//   };


//   return (
//     <div className="text-white flex flex-col items-center h-[100vh] md:h-[90vh] lg:h-[90vh] xl:h-[90vh] justify-center">
//       <img src={logo} className="mb-5 h-[100px] w-[100px] rounded-full  shadow-custom" />
//       <div className="flex flex-col items-center justify-center bg-[--bg-color] border-[--border-color] border shadow-sm p-4 gap-3 rounded-2xl w-[300px] sm:w-[320px] md:w-[350px] lg:w-[350px] xl:w-[350px]">
//         <h1 className="text-xl">Validate Passphrase Words</h1>
//         <div className="w-full border-2 border-[--green-color] my-2 relative">
//           <p className="p-3 text-balance text-center text-gray-400">
//             {wallet.phrase}     <FaRegCopy  className="absolute bottom-1 right-1 cursor-pointer" onClick={copyToClipboard}/>
//           </p>
//         </div>
//         <div className="grid grid-cols-2 gap-2">
//           {wallet.phrase
//             .split(" ")
//             .map((word, index) =>
//               validationIndexes.includes(index) ? (
//                 <input
//                   key={index}
//                   type="text"
//                   placeholder={`Word ${index + 1}`}
//                   className="bg-[--input-color] outline-none p-2 rounded-sm"
//                   value={selectedWords[index] || ""}
//                   onChange={(e) => handleInputChange(index, e.target.value)}
//                 />
//               ) : (
//                 <input
//                   key={index}
//                   type="text"
//                   className="bg-gray-600 outline-none p-2 rounded-sm bg-[--input-color]"
//                   value={word}
//                   readOnly
//                 />
//               )
//             )}
//         </div>
//         {validationError && <p style={{ color: "red" }}>{validationError}</p>}
//         <button
//           onClick={handleValidatePassphrase}
//           className="bg-[--green-color] text-white text-base w-full rounded-full p-2 mt-4"
//         >
//           Create Wallet
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ValidatePassphrase;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { encryptPrivateKey } from "../Utils/Crypto";
import axios from "axios";
import logo from "../Images/gno-wallet.jpeg";
import { FaRegCopy } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import copy from "copy-to-clipboard";

function ValidatePassphrase() {
  const [selectedWords, setSelectedWords] = useState([]);
  const [validationIndexes, setValidationIndexes] = useState([]);
  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();
  const { wallet, password } = location.state;

  useEffect(() => {
    const generateUniqueRandomNumbers = (min, max, count) => {
      const numbers = new Set();
      while (numbers.size < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        numbers.add(randomNumber);
      }
      return Array.from(numbers);
    };

    const words = wallet.phrase.split(" ");
    const shuffledIndexes = generateUniqueRandomNumbers(0, 11, 4);
    setValidationIndexes(shuffledIndexes);
    setSelectedWords(Array(words.length).fill(""));
  }, [wallet]);

  const handleValidatePassphrase = async () => {
    const filledWords = validationIndexes.map(index => selectedWords[index]?.trim());
    const fullPassphraseWords = wallet.phrase.split(' ').map(word => word.trim());

    const isValid = validationIndexes.every((index, i) => filledWords[i] === fullPassphraseWords[index]);

    if (isValid) {
      setIsLoading(true); 
      const encryptedPrivateKey = encryptPrivateKey(wallet.privateKey, password);
      const walletData = {
        address: wallet.address,
        encryptedPrivateKey,
        password,
      };
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND}/wallet`, walletData);
        console.log(response)
        const {address,_id} = response.data.wallet;

        const WalletDatas = {Wallet_address:address,User_id:_id}
        localStorage.setItem("Wallet Data:",JSON.stringify(WalletDatas))

        navigate('/success');
      } catch (error) {
        console.error('Error creating wallet:', error);
        setValidationError('Error creating wallet. Please try again.');
        setIsLoading(false); 
      }
    } else {
      setValidationError('The entered words do not match the passphrase.');
    }
  };

  const handleInputChange = (index, value) => {
    const updatedWords = [...selectedWords];
    updatedWords[index] = value;
    setSelectedWords(updatedWords);
    setValidationError("");
  };

  const copyToClipboard = () => {
    copy(wallet.phrase)
    alert("copied..!")
  };

  return (
    <div className="text-white flex flex-col items-center h-[90vh] md:h-[90vh] lg:h-[90vh] xl:h-[90vh] justify-center">
      <img src={logo} className="mb-5 h-[100px] w-[100px] rounded-full  shadow-custom"  id="notinvert"/>
      <div className="flex flex-col items-center justify-center bg-[--bg-color] border-[--border-color] border shadow-sm p-4 gap-3 rounded-2xl w-[300px] sm:w-[320px] md:w-[350px] lg:w-[350px] xl:w-[350px]">
        <h1 className="text-xl">Validate Passphrase Words</h1>
        <div className="w-full border-2 border-[--green-color] my-2 relative">
          <p className="p-3 text-balance text-center text-gray-400">
            {wallet.phrase}     <FaRegCopy  className="absolute bottom-1 right-1 cursor-pointer" onClick={copyToClipboard}/>
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {wallet.phrase
            .split(" ")
            .map((word, index) =>
              validationIndexes.includes(index) ? (
                <input
                  key={index}
                  type="text"
                  placeholder={`Word ${index + 1}`}
                  className="bg-[--input-color] outline-none p-2 rounded-sm"
                  value={selectedWords[index] || ""}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ) : (
                <input
                  key={index}
                  type="text"
                  className="bg-gray-600 outline-none p-2 rounded-sm bg-[--input-color]"
                  value={word}
                  readOnly
                />
              )
            )}
        </div>
        {validationError && <p style={{ color: "red" }}>{validationError}</p>}
        <button
          onClick={handleValidatePassphrase}
          className="bg-[--green-color] text-white text-base w-full rounded-full p-2 mt-4 flex items-center justify-center"
          disabled={isLoading} 
        >
          {isLoading ? <FaSpinner className="animate-spin mr-2" /> : "Create Wallet"}
        </button>
      </div>
    </div>
  );
}

export default ValidatePassphrase;
