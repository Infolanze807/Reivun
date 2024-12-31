const express = require('express');
const router = express.Router();
const { setIntervalAsync } = require('set-interval-async/dynamic');
const { getAllSymbolData, logAndStoreData } = require('../Controllers/botController');

// Endpoint to get all symbol data
router.get('/symbols', async (req, res) => {
  try {
    const allData = await getAllSymbolData();
    res.json(allData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve symbol data' });
  }
});

// Start periodic data logging (use in app.js)
setIntervalAsync(logAndStoreData, 30000);

module.exports = router;