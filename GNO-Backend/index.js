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

// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('./Config/database');
// const walletRoutes = require('./Routes/walletRoutes');
// const exchangeRoutes = require('./Routes/exchangeRoutes');
// const transactionRoutes = require('./Routes/transactionRoutes');
// const ccxt = require('ccxt');
// const moment = require('moment');
// const fs = require('fs');
// const { setIntervalAsync } = require('set-interval-async/dynamic');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// const port = 5000;

// // Middleware
// app.use(express.json());
// app.use(cors({
//   origin: "*",
//   optionsSuccessStatus: 200,
// }));

// // Routes
// app.use('/', walletRoutes);
// app.use('/', exchangeRoutes);
// app.use('/', transactionRoutes);

// // API Routes
// app.get("/", (req, res) => res.send("GNO BACKEND RUN..."));

// // Bitget API Configuration
// const apiKey = process.env.REACT_APP_APIKEY;
// const apiSecret = process.env.REACT_APP_SECRETKEY;
// const apiPassphrase = process.env.REACT_APP_PASS;

// const exchange = new ccxt.bitget({
//   apiKey: apiKey,
//   secret: apiSecret,
//   password: apiPassphrase,
// });

// // Bot settings
// const timeframe = '1m';
// const cryptosToAnalyze = [
//   'BTC/USDT', 'TAO/USDT', 'ETH/USDT', 'XRP/USDT', 'SHIB/USDT', 'PEPE/USDT',
//   'SOL/USDT', 'BGB/USDT', 'ADA/USDT', 'SUI/USDT', 'SEI/USDT', 'DOGE/USDT',
//   'FIL/USDT', 'LTC/USDT', 'LINK/USDT', 'FET/USDT', 'PEAQ/USDT', 'TON/USDT',
//   'APE/USDT', 'AVAX/USDT', 'ARB/USDT', 'TIA/USDT', 'NEAR/USDT', 'KAS/USDT',
//   'APT/USDT', 'ATOM/USDT', 'RENDER/USDT', 'STX/USDT', 'INJ/USDT', 'FTM/USDT',
//   'JASMY/USDT', 'BNB/USDT', '1INCH/USDT', 'BONK/USDT', 'SUSHI/USDT',
//   'ROSE/USDT', 'AERO/USDT'
// ];

// // const jsonFilePath = './symbols_data.json';
// // const trueJsonFilePath = './true.json';

// // Helper functions
// async function testConnection() {
//   try {
//     const balance = await exchange.fetchBalance();
//     console.log("Connection successful! Account balance:", balance);
//   } catch (error) {
//     console.error(`Error connecting to Bitget: ${error.message}`);
//     process.exit(1);
//   }
// }

// async function fetchCandles(symbol, timeframe, limit = 100) {
//   try {
//     const candles = await exchange.fetchOHLCV(symbol, timeframe, undefined, limit);
//     return candles.map(([timestamp, open, high, low, close, volume]) => {
//       const realBody = Math.abs(close - open);
//       const lowerShadow = Math.min(open, close) - low;
//       const upperShadow = high - Math.max(open, close);

//       const isHammer =
//         lowerShadow > 2 * realBody &&
//         upperShadow <= 0.1 * realBody &&
//         close > open;

//       return {
//         timestamp: moment(timestamp).format('YYYY-MM-DD HH:mm:ss'),
//         open,
//         high,
//         low,
//         close,
//         volume,
//         isHammer,
//       };
//     });
//   } catch (error) {
//     console.error(`Error fetching candles for ${symbol}:`, error.message);
//     return [];
//   }
// }

// async function getAllSymbolData() {
//   const allData = {};
//   for (const symbol of cryptosToAnalyze) {
//     const candles = await fetchCandles(symbol, timeframe);
//     const lastCandle = candles[candles.length - 1];
//     allData[symbol] = lastCandle || {};
//   }
//   return allData;
// }

// // function storeDataInJson(data) {
// //   let existingData = [];
// //   if (fs.existsSync(jsonFilePath)) {
// //     try {
// //       const fileContent = fs.readFileSync(jsonFilePath, 'utf-8');
// //       existingData = JSON.parse(fileContent);
// //     } catch (error) {
// //       console.error("Error reading or parsing JSON file. Reinitializing...", error.message);
// //     }
// //   }
// //   existingData.push(data);
// //   try {
// //     fs.writeFileSync(jsonFilePath, JSON.stringify(existingData, null, 2));
// //     console.log("Data successfully appended to JSON file.");
// //   } catch (error) {
// //     console.error("Error writing to JSON file:", error.message);
// //   }
// // }

// // function storeHammerData(data) {
// //   let hammerData = [];
// //   if (fs.existsSync(trueJsonFilePath)) {
// //     try {
// //       const fileContent = fs.readFileSync(trueJsonFilePath, 'utf-8');
// //       hammerData = JSON.parse(fileContent);
// //     } catch (error) {
// //       console.error("Error reading or parsing true.json. Reinitializing...", error.message);
// //     }
// //   }
// //   Object.entries(data).forEach(([symbol, symbolData]) => {
// //     if (symbolData.isHammer) {
// //       hammerData.push({ symbol, data: symbolData });
// //     }
// //   });
// //   if (hammerData.length > 0) {
// //     try {
// //       fs.writeFileSync(trueJsonFilePath, JSON.stringify(hammerData, null, 2));
// //       console.log("Hammer data successfully appended to true.json.");
// //     } catch (error) {
// //       console.error("Error writing hammer data to true.json:", error.message);
// //     }
// //   }
// // }

// async function logAndStoreData() {
//   try {
//     const allData = await getAllSymbolData();
//     console.log("Fetched Data:", allData);
//     // storeDataInJson(allData);
//     // storeHammerData(allData);
//     io.emit('symbolsData', allData);
//   } catch (error) {
//     console.error("Error during data logging and storing:", error.message);
//   }
// }

// app.get('/symbols', async (req, res) => {
//   try {
//     const allData = await getAllSymbolData();
//     res.json(allData);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to retrieve symbol data' });
//   }
// });

// // Socket.IO connection handling
// io.on('connection', (socket) => {
//   console.log('New client connected');
//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// // Start periodic data logging
// (async () => {
//   await testConnection();
//   setIntervalAsync(logAndStoreData, 30000);
// })();

// // Server setup
// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('./Config/database');
// const walletRoutes = require('./Routes/walletRoutes');
// const exchangeRoutes = require('./Routes/exchangeRoutes');
// const transactionRoutes = require('./Routes/transactionRoutes');
// const ccxt = require('ccxt');
// const moment = require('moment');
// const fs = require('fs');
// const { setIntervalAsync } = require('set-interval-async/dynamic');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// const port = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cors({
//   origin: "*",
//   optionsSuccessStatus: 200,
// }));

// // Cryptos to analyze
// const cryptosToAnalyze = [
//   'BTC/USDT', 'TAO/USDT', 'ETH/USDT', 'XRP/USDT', 'SHIB/USDT', 'PEPE/USDT',
//   'SOL/USDT', 'BGB/USDT', 'ADA/USDT', 'SUI/USDT', 'SEI/USDT', 'DOGE/USDT',
//   'FIL/USDT', 'LTC/USDT', 'LINK/USDT', 'FET/USDT', 'PEAQ/USDT', 'TON/USDT',
//   'APE/USDT', 'AVAX/USDT', 'ARB/USDT', 'TIA/USDT', 'NEAR/USDT', 'KAS/USDT',
//   'APT/USDT', 'ATOM/USDT', 'RENDER/USDT', 'STX/USDT', 'INJ/USDT', 'FTM/USDT',
//   'JASMY/USDT', 'BNB/USDT', '1INCH/USDT', 'BONK/USDT', 'SUSHI/USDT',
//   'ROSE/USDT', 'AERO/USDT'
// ];

// // Timeframe for candlesticks
// const timeframe = '1m';

// // Socket.IO connection handling
// io.on('connection', (socket) => {
//   console.log('New client connected');
//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// // Function to fetch candles and process them
// async function fetchCandles(exchange, symbol, timeframe, limit = 100) {
//   try {
//     const candles = await exchange.fetchOHLCV(symbol, timeframe, undefined, limit);
//     return candles.map(([timestamp, open, high, low, close, volume]) => {
//       const realBody = Math.abs(close - open);
//       const lowerShadow = Math.min(open, close) - low;
//       const upperShadow = high - Math.max(open, close);

//       const isHammer =
//         lowerShadow > 2 * realBody &&
//         upperShadow <= 0.1 * realBody &&
//         close > open;

//       return {
//         timestamp: moment(timestamp).format('YYYY-MM-DD HH:mm:ss'),
//         open,
//         high,
//         low,
//         close,
//         volume,
//         isHammer,
//       };
//     });
//   } catch (error) {
//     console.error(`Error fetching candles for ${symbol}:`, error.message);
//     return [];
//   }
// }

// // Function to fetch data for all symbols
// async function getAllSymbolData(exchange) {
//   const allData = {};
//   for (const symbol of cryptosToAnalyze) {
//     const candles = await fetchCandles(exchange, symbol, timeframe);
//     const lastCandle = candles[candles.length - 1];
//     allData[symbol] = lastCandle || {};
//   }
//   return allData;
// }

// // Function to log and emit data
// async function logAndEmitData(exchange) {
//   try {
//     const allData = await getAllSymbolData(exchange);
//     console.log("Fetched Data:", allData);
//     io.emit('symbolsData', allData); // Emit data to all connected clients
//   } catch (error) {
//     console.error("Error during data logging and emitting:", error.message);
//   }
// }

// // API endpoint to set up the exchange and start the interval
// app.get('/symbols', async (req, res) => {
//   const { apiKey, secretKey, passphrase } = req.query;

//   console.log("Received API Key:", apiKey);
//   console.log("Received Secret Key:", secretKey);
//   console.log("Received Passphrase:", passphrase);

//   if (!apiKey || !secretKey || !passphrase) {
//     return res.status(400).json({ error: 'API credentials are required' });
//   }

//   try {
//     const exchange = new ccxt.bitget({
//       apiKey: apiKey,
//       secret: secretKey,
//       password: passphrase,
//       timeout: 20000,
//     });

//     // Test connection
//     await exchange.fetchBalance();
//     console.log('Connection to Bitget successful!');

//     // Fetch data immediately and send it in the response
//     const allData = await getAllSymbolData(exchange);
//     res.json(allData);

//     // Set up periodic fetching and processing
//     setIntervalAsync(async () => {
//       try {
//         const periodicData = await getAllSymbolData(exchange);
//         console.log("Fetched periodic data:", periodicData);
//         // Perform additional actions with periodicData if needed
//       } catch (error) {
//         console.error("Error during periodic fetching:", error.message);
//       }
//     }, 30000); // Fetch data every 30 seconds

//   } catch (error) {
//     console.error("Error initializing exchange:", error.message);
//     res.status(500).json({ error: 'Failed to connect to Bitget' });
//   }
// });


// // // Routes
// app.use('/', walletRoutes);
// app.use('/', exchangeRoutes);
// app.use('/', transactionRoutes);

// // // API Routes
// app.get("/", (req, res) => res.send("GNO BACKEND RUN..."));

// // Start the server
// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('./Config/database');
// const walletRoutes = require('./Routes/walletRoutes');
// const exchangeRoutes = require('./Routes/exchangeRoutes');
// const transactionRoutes = require('./Routes/transactionRoutes');
// const ccxt = require('ccxt');
// const moment = require('moment');
// const { setIntervalAsync } = require('set-interval-async/dynamic');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// const port = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cors({
//   origin: "*",
//   optionsSuccessStatus: 200,
// }));

// const cryptosToAnalyze = [
//   'BTC/USDT', 'TAO/USDT', 'ETH/USDT', 'XRP/USDT', 'SHIB/USDT', 'PEPE/USDT',
//   'SOL/USDT', 'BGB/USDT', 'ADA/USDT', 'SUI/USDT', 'SEI/USDT', 'DOGE/USDT',
//   'FIL/USDT', 'LTC/USDT', 'LINK/USDT', 'FET/USDT', 'PEAQ/USDT', 'TON/USDT',
//   'APE/USDT', 'AVAX/USDT', 'ARB/USDT', 'TIA/USDT', 'NEAR/USDT', 'KAS/USDT',
//   'APT/USDT', 'ATOM/USDT', 'RENDER/USDT', 'STX/USDT', 'INJ/USDT', 'FTM/USDT',
//   'JASMY/USDT', 'BNB/USDT', '1INCH/USDT', 'BONK/USDT', 'SUSHI/USDT',
//   'ROSE/USDT', 'AERO/USDT'
// ];

// const timeframe = '1m';

// io.on('connection', (socket) => {
//   console.log('New client connected');
//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// async function fetchCandles(exchange, symbol, timeframe, limit = 100) {
//   try {
//     const candles = await exchange.fetchOHLCV(symbol, timeframe, undefined, limit);
//     return candles.map(([timestamp, open, high, low, close, volume]) => {
//       const realBody = Math.abs(close - open);
//       const lowerShadow = Math.min(open, close) - low;
//       const upperShadow = high - Math.max(open, close);

//       const isHammer =
//         lowerShadow > 2 * realBody &&
//         upperShadow <= 0.1 * realBody &&
//         close > open;

//       return {
//         timestamp: moment(timestamp).format('YYYY-MM-DD HH:mm:ss'),
//         open,
//         high,
//         low,
//         close,
//         volume,
//         isHammer,
//       };
//     });
//   } catch (error) {
//     console.error(`Error fetching candles for ${symbol}:`, error.message);
//     return [];
//   }
// }

// async function getAllSymbolData(exchange) {
//   const allData = {};
//   for (const symbol of cryptosToAnalyze) {
//     const candles = await fetchCandles(exchange, symbol, timeframe);
//     const lastCandle = candles[candles.length - 1];
//     allData[symbol] = lastCandle || {};
//   }
//   return allData;
// }

// async function logAndEmitData(exchange) {
//   try {
//     const allData = await getAllSymbolData(exchange);
//     console.log("Fetched Data:", allData);
//     io.emit('symbolsData', allData); // Emit data to all connected clients
//   } catch (error) {
//     console.error("Error during data logging and emitting:", error.message);
//   }
// }

// app.get('/symbols', async (req, res) => {
//   const { apiKey, secretKey, passphrase } = req.query;

//   if (!apiKey || !secretKey || !passphrase) {
//     return res.status(400).json({ error: 'API credentials are required' });
//   }

//   try {
//     const exchange = new ccxt.bitget({
//       apiKey: apiKey,
//       secret: secretKey,
//       password: passphrase,
//       timeout: 20000,
//     });

//     await exchange.fetchBalance();
//     console.log('Connection to Bitget successful!');

//     const allData = await getAllSymbolData(exchange);
//     res.json(allData);

//     // Set up periodic fetching every 30 seconds
//     setIntervalAsync(async () => {
//       await logAndEmitData(exchange); // Fetch data and emit to clients
//     }, 30000); // Fetch data every 30 seconds

//   } catch (error) {
//     console.error("Error initializing exchange:", error.message);
//     res.status(500).json({ error: 'Failed to connect to Bitget' });
//   }
// });

// app.use('/', walletRoutes);
// app.use('/', exchangeRoutes);
// app.use('/', transactionRoutes);

// app.get("/", (req, res) => res.send("GNO BACKEND RUN..."));

// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('./Config/database');
const walletRoutes = require('./Routes/walletRoutes');
const exchangeRoutes = require('./Routes/exchangeRoutes');
const transactionRoutes = require('./Routes/transactionRoutes');
const ccxt = require('ccxt');
const moment = require('moment');
const { setIntervalAsync } = require('set-interval-async/dynamic');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: "*",
  optionsSuccessStatus: 200,
}));

const cryptosToAnalyze = [
  'BTC/USDT', 'TAO/USDT', 'ETH/USDT', 'XRP/USDT', 'SHIB/USDT', 'PEPE/USDT',
  'SOL/USDT', 'BGB/USDT', 'ADA/USDT', 'SUI/USDT', 'SEI/USDT', 'DOGE/USDT',
  'FIL/USDT', 'LTC/USDT', 'LINK/USDT', 'FET/USDT', 'PEAQ/USDT', 'TON/USDT',
  'APE/USDT', 'AVAX/USDT', 'ARB/USDT', 'TIA/USDT', 'NEAR/USDT', 'KAS/USDT',
  'APT/USDT', 'ATOM/USDT', 'RENDER/USDT', 'STX/USDT', 'INJ/USDT', 'FTM/USDT',
  'JASMY/USDT', 'BNB/USDT', '1INCH/USDT', 'BONK/USDT', 'SUSHI/USDT',
  'ROSE/USDT', 'AERO/USDT'
];

const timeframe = '1m';

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

async function fetchCandles(exchange, symbol, timeframe, limit = 100) {
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

async function getAllSymbolData(exchange) {
  const allData = {};
  for (const symbol of cryptosToAnalyze) {
    const candles = await fetchCandles(exchange, symbol, timeframe);
    const lastCandle = candles[candles.length - 1];
    allData[symbol] = lastCandle || {};
  }
  return allData;
}

async function logAndEmitData(exchange) {
  try {
    const allData = await getAllSymbolData(exchange);
    console.log("Fetched Data:", allData);
    io.emit('symbolsData', allData); // Emit data to all connected clients
  } catch (error) {
    console.error("Error during data logging and emitting:", error.message);
  }
}

app.get('/symbols', async (req, res) => {
  const { apiKey, secretKey, passphrase } = req.query;

  if (!apiKey || !secretKey || !passphrase) {
    return res.status(400).json({ error: 'API credentials are required' });
  }

  try {
    const exchange = new ccxt.bitget({
      apiKey: apiKey,
      secret: secretKey,
      password: passphrase,
      timeout: 20000,
    });

    await exchange.fetchBalance();
    console.log('Connection to Bitget successful!');

    const allData = await getAllSymbolData(exchange);
    res.json(allData);

    // Set up periodic fetching every 30 seconds
    setIntervalAsync(async () => {
      await logAndEmitData(exchange); // Fetch data and emit to clients
    }, 60000); // Fetch data every 30 seconds

  } catch (error) {
    console.error("Error initializing exchange:", error.message);
    res.status(500).json({ error: 'Failed to connect to Bitget' });
  }
});

app.use('/', walletRoutes);
app.use('/', exchangeRoutes);
app.use('/', transactionRoutes);

app.get("/", (req, res) => res.send("GNO BACKEND RUN..."));

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

