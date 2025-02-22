const express = require('express');
const router = express.Router();
const janitorController = require('../controllers/janitorController');

// GET all janitors
router.get('/', janitorController.getAllJanitors);

// GET a single janitor
router.get('/:id', janitorController.getJanitorById);

// POST a new janitor
router.post('/', janitorController.createJanitor);

// UPDATE a janitor
router.patch('/:id', janitorController.updateJanitor);

// UPDATE janitor schedule status
router.put('/:id/schedule/status', janitorController.updateScheduleStatus);

// DELETE a janitor
router.delete('/:id', janitorController.deleteJanitor);

module.exports = router;