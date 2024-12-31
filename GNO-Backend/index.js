require('dotenv').config();
const express = require('express');
const cors = require('cors');
const https = require('https');
const socketIo = require('socket.io');

// Database connection
const mongoose = require('./Config/database');

// Routes
const walletRoutes = require('./Routes/walletRoutes');
const exchangeRoutes = require('./Routes/exchangeRoutes');
const transactionRoutes = require('./Routes/transactionRoutes');
const botRoutes = require('./Routes/botRoutes');

const app = express();
const port = process.env.PORT || 5000;

// CORS Configuration
const corsOptions = {
  origin: process.env.REACT_APP_FRONTEND || "*",
  optionsSuccessStatus: 200,
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));


//Check Endpoint
app.get("/", (req, res) => res.send("GNO BACKEND RUN..."));

// Routes Middleware
app.use('/', walletRoutes);
app.use('/', exchangeRoutes);
app.use('/', transactionRoutes);
app.use('/', botRoutes);


// Setting up Socket.IO
const server = https.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: corsOptions.origin,
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server running at https://reivun-gkdi.vercel.app:${port}`);
});

module.exports = server;
