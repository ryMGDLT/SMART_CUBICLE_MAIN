const express = require('express');
const router = express.Router();
const Janitor = require('../models/janitor');

// Fetch all janitors
router.get('/janitors', async (req, res) => {
    try {
        const janitors = await Janitor.find({});
        res.status(200).json(janitors);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch janitors', error: error.message });
    }
});

module.exports = router;