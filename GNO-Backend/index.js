// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 5000;

// const mongoose = require('./Config/database');
// const walletRoutes = require('./Routes/walletRoutes');
// const exchangeRoutes = require('./Routes/exchangeRoutes');
// const transactionRoutes = require('./Routes/transactionRoutes');

// app.use(express.json());

// const corsOptions = {
//   origin: process.env.REACT_APP_FRONTEND,
//   optionsSuccessStatus: 200,
// };
// // console.log(corsOptions.origin)

// app.get("/", (req, res) => res.send("GNO BACKEND RUN..."));

// app.use(cors(corsOptions));

// app.use('/', walletRoutes);
// app.use('/', exchangeRoutes);
// app.use('/', transactionRoutes);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

require('dotenv').config();
const express = require('express');
const ccxt = require('ccxt');
const moment = require('moment');
const fs = require('fs');
const { setIntervalAsync } = require('set-interval-async/dynamic');
const cors = require('cors');
const WebSocket = require('ws');
const mongoose = require('./Config/database');
const walletRoutes = require('./Routes/walletRoutes');
const exchangeRoutes = require('./Routes/exchangeRoutes');
const transactionRoutes = require('./Routes/transactionRoutes');

const app = express();
const port = 5000;
const wss = new WebSocket.Server({ noServer: true });
const jsonFilePath = './symbols_data.json';

// Bitget API configuration
const apiKey = process.env.REACT_APP_APIKEY;
const apiSecret = process.env.REACT_APP_SECRETKEY;
const apiPassphrase = process.env.REACT_APP_PASS;

// Create an exchange object for Bitget
const exchange = new ccxt.bitget({
  apiKey: apiKey,
  secret: apiSecret,
  password: apiPassphrase,
});

// Bot settings
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

app.use(express.json());

// const corsOptions = {
//   origin: process.env.REACT_APP_FRONTEND || 'https://reivun.vercel.app',
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

const allowedOrigins = [
  'https://reivun.vercel.app', // Hardcoded frontend URL
  process.env.REACT_APP_FRONTEND // Dynamic frontend URL from environment variable
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow request
    } else {
      callback(new Error('Not allowed by CORS')); // Block request
    }
  },
  optionsSuccessStatus: 200, // For older browsers that expect 200 status
};

app.use(cors(corsOptions));



app.get("/", (req, res) => res.send("GNO BACKEND RUN..."));

app.use('/', walletRoutes);
app.use('/', exchangeRoutes);
app.use('/', transactionRoutes);

// Test connection to Bitget
async function testConnection() {
  try {
    const balance = await exchange.fetchBalance();
    console.log("Connection successful! Account balance:", balance);
  } catch (error) {
    console.error(`Error connecting to Bitget: ${error.message}`);
    process.exit(1);
  }
}

async function fetchCandles(symbol, timeframe, limit = 100) {
  try {
    const candles = await exchange.fetchOHLCV(symbol, timeframe, undefined, limit);
    return candles.map(([timestamp, open, high, low, close, volume]) => {
      const realBody = Math.abs(close - open);
      const lowerShadow = Math.min(open, close) - low;
      const upperShadow = high - Math.max(open, close);

      const isHammer =
        lowerShadow > 2 * realBody &&
        upperShadow <= 0.1 * realBody &&
        close > open;

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
}

async function getAllSymbolData() {
  const allData = {};
  for (const symbol of cryptosToAnalyze) {
    const candles = await fetchCandles(symbol, timeframe);
    const lastCandle = candles[candles.length - 1];
    allData[symbol] = lastCandle || {};
  }
  return allData;
}

function storeDataInJson(data) {
  let existingData = [];

  if (fs.existsSync(jsonFilePath)) {
    try {
      const fileContent = fs.readFileSync(jsonFilePath, 'utf-8');
      existingData = JSON.parse(fileContent);
      if (!Array.isArray(existingData)) {
        console.warn("JSON file content is not an array. Reinitializing...");
        existingData = [];
      }
    } catch (error) {
      console.error("Error reading or parsing JSON file. Reinitializing...", error.message);
      existingData = [];
    }
  }

  existingData.push(data);

  try {
    fs.writeFileSync(jsonFilePath, JSON.stringify(existingData, null, 2));
    console.log("Data successfully appended to JSON file.");
  } catch (error) {
    console.error("Error writing to JSON file:", error.message);
  }
}

async function logAndStoreData() {
  try {
    const allData = await getAllSymbolData();
    console.log("Fetched Data:", allData);
    storeDataInJson(allData);
  } catch (error) {
    console.error("Error during data logging and storing:", error.message);
  }
}

app.get('/api/symbols', async (req, res) => {
  try {
    const allData = await getAllSymbolData();
    res.json(allData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve symbol data' });
  }
});

wss.on('connection', (ws) => {
  const sendData = async () => {
    const allData = await getAllSymbolData();
    ws.send(JSON.stringify(allData));
  };

  const interval = setIntervalAsync(() => {
    sendData();
  }, 6000);

  ws.on('close', () => {
    clearInterval(interval);
  });
});

app.server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

(async () => {
  await testConnection();
  setIntervalAsync(logAndStoreData, 6000);
})();
