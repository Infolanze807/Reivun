const ccxt = require('ccxt');
const moment = require('moment');
const fs = require('fs');
const { setIntervalAsync } = require('set-interval-async/dynamic');

const apiKey = process.env.REACT_APP_APIKEY;
const apiSecret = process.env.REACT_APP_SECRETKEY;
const apiPassphrase = process.env.REACT_APP_PASS;

const exchange = new ccxt.bitget({
  apiKey: apiKey,
  secret: apiSecret,
  password: apiPassphrase,
});

const timeframe = '1m';
const cryptosToAnalyze = [
  'BTC/USDT', 'TAO/USDT', 'ETH/USDT', 'XRP/USDT', 'SHIB/USDT', 'PEPE/USDT',
  'SOL/USDT', 'BGB/USDT', 'ADA/USDT', 'SUI/USDT', 'SEI/USDT', 'DOGE/USDT',
  'FIL/USDT', 'LTC/USDT', 'LINK/USDT', 'FET/USDT', 'PEAQ/USDT', 'TON/USDT',
  'APE/USDT', 'AVAX/USDT', 'ARB/USDT', 'TIA/USDT', 'NEAR/USDT', 'KAS/USDT',
  'APT/USDT', 'ATOM/USDT', 'RENDER/USDT', 'STX/USDT', 'INJ/USDT', 'FTM/USDT',
  'JASMY/USDT', 'BNB/USDT', '1INCH/USDT', 'BONK/USDT', 'SUSHI/USDT',
  'ROSE/USDT', 'AERO/USDT'
];

const jsonFilePath = './symbols_data.json';
const trueJsonFilePath = './true.json';

// Fetch candle data for a given symbol
const fetchCandles = async (symbol, timeframe, limit = 100) => {
  try {
    const candles = await exchange.fetchOHLCV(symbol, timeframe, undefined, limit);
    return candles.map(([timestamp, open, high, low, close, volume]) => {
      const realBody = Math.abs(close - open);
      const lowerShadow = Math.min(open, close) - low;
      const upperShadow = high - Math.max(open, close);
      const isHammer = lowerShadow > 2 * realBody && upperShadow <= 0.1 * realBody && close > open;

      return {
        timestamp: moment(timestamp).format('YYYY-MM-DD HH:mm:ss'),
        open,
        high,
        low,
        close,
        volume,
        isHammer,
      };
    });
  } catch (error) {
    console.error(`Error fetching candles for ${symbol}:`, error.message);
    return [];
  }
};

// Get data for all symbols
const getAllSymbolData = async () => {
  const allData = {};
  for (const symbol of cryptosToAnalyze) {
    const candles = await fetchCandles(symbol, timeframe);
    const lastCandle = candles[candles.length - 1];
    allData[symbol] = lastCandle || {};
  }
  return allData;
};

// // Store data in a JSON file
// const storeDataInJson = (data) => {
//   let existingData = [];
//   if (fs.existsSync(jsonFilePath)) {
//     try {
//       const fileContent = fs.readFileSync(jsonFilePath, 'utf-8');
//       existingData = JSON.parse(fileContent);
//       if (!Array.isArray(existingData)) {
//         console.warn("JSON file content is not an array. Reinitializing...");
//         existingData = [];
//       }
//     } catch (error) {
//       console.error("Error reading or parsing JSON file. Reinitializing...", error.message);
//       existingData = [];
//     }
//   }

//   existingData.push(data);

//   try {
//     fs.writeFileSync(jsonFilePath, JSON.stringify(existingData, null, 2));
//     console.log("Data successfully appended to JSON file.");
//   } catch (error) {
//     console.error("Error writing to JSON file:", error.message);
//   }
// };

// // Store hammer data in true.json
// const storeHammerData = (data) => {
//   let hammerData = [];

//   if (fs.existsSync(trueJsonFilePath)) {
//     try {
//       const fileContent = fs.readFileSync(trueJsonFilePath, 'utf-8');
//       hammerData = JSON.parse(fileContent);
//       if (!Array.isArray(hammerData)) {
//         console.warn("true.json content is not an array. Reinitializing...");
//         hammerData = [];
//       }
//     } catch (error) {
//       console.error("Error reading or parsing true.json. Reinitializing...", error.message);
//       hammerData = [];
//     }
//   }

//   Object.entries(data).forEach(([symbol, symbolData]) => {
//     if (symbolData.isHammer) {
//       hammerData.push({ symbol, data: symbolData });
//     }
//   });

//   if (hammerData.length > 0) {
//     try {
//       fs.writeFileSync(trueJsonFilePath, JSON.stringify(hammerData, null, 2));
//       console.log("Hammer data successfully appended to true.json.");
//     } catch (error) {
//       console.error("Error writing hammer data to true.json:", error.message);
//     }
//   }
// };

// Controller function for logging and storing data
const logAndStoreData = async () => {
  try {
    const allData = await getAllSymbolData();
    console.log("Fetched Data:", allData);
    // storeDataInJson(allData);
    // storeHammerData(allData);
  } catch (error) {
    console.error("Error during data logging and storing:", error.message);
  }
};

// Export controller functions
module.exports = {
  getAllSymbolData,
  logAndStoreData
};
