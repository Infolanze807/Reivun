import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa"; 
import axios from "axios";
import logo from "../Images/gno-wallet.jpeg";

function ImportWallet() {
  const [words, setWords] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };

  const handlePaste = (event) => {
    const pastedText = event.clipboardData.getData("Text");
    const wordArray = pastedText.split(/\s+/);

    if (wordArray.length > 1) {
      event.preventDefault();
      const newWords = [...words];
      for (let i = 0; i < wordArray.length && i < newWords.length; i++) {
        newWords[i] = wordArray[i];
      }
      setWords(newWords);
    }
  };

  const handleClearAll = () => {
    setWords(["", "", "", "", "", "", "", "", "", "", "", ""]);
  };

  const handleNext = async () => {
    setIsLoading(true);
    const seedPhrase = words.join(" ");
    if (words.every((word) => word.trim() !== "")) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND}/validate-seed-phrase`,
          { seedPhrase }
        );
  
        if (response.data.valid) {
          const { walletDetails } = response.data;
          navigate("/new-password", { state: { seedPhrase, walletDetails } });
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Error validating seed phrase:", error);
        setError("An error occurred in Backend. Please try again.");
      }
    } else {
      setError("Please fill in all the words to form a complete seed phrase.");
    }
    setIsLoading(false); 
  };
  

  return (
    <>
      <div className="text-white flex flex-col items-center h-full md:h-[90vh] lg:h-[90vh] xl:h-[90vh] justify-center">
        <img src={logo} className="mb-5 h-[100px] w-[100px] rounded-full  shadow-custom" />
        <div className="flex flex-col items-center justify-center bg-[--bg-color] border-[--border-color] border shadow-sm rounded-2xl p-4 w-[300px] sm:w-[320px] md:w-[350px] lg:w-[350px] xl:w-[350px]">
          <div className="border-t-2 border-t-[--green-color] border-b-2 border-b-[--green-color] w-full py-3">
            <div>
              <h1 className="py-2 text-center">
                Enter & Paste Your seedPhrase To Import Or Recover Your Wallet
              </h1>
              <div className="grid gap-2 grid-cols-2 pt-2">
                {words.map((word, index) => (
                  <input
                    key={index}
                    type="text"
                    className="px-2 bg-[--input-color] text-sm p-2 outline-none rounded-md"
                    placeholder={`Word #${index + 1}`}
                    value={word}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onPaste={handlePaste}
                  />
                ))}
              </div>
              <div
                className="text-[--green-color] text-center pt-5 text-sm cursor-pointer"
                onClick={handleClearAll}
              >
                <p>Clear All</p>
              </div>
              {error && (
                <div className="text-red-500 text-center pt-2">{error}</div>
              )}
              <div className="grid grid-cols-2 w-full mt-4">
                <div>
                  <button
                    className="text-[--green-color] text-base w-full p-2"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                </div>
                <div>
                  <button
                    className="bg-[--green-color] text-white text-base w-full rounded-full p-2 flex items-center justify-center"
                    type="submit"
                    disabled={isLoading} 
                    onClick={handleNext}
                  >
                  {isLoading ? <FaSpinner className="animate-spin mr-2" /> : "Next"} 
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImportWallet;
