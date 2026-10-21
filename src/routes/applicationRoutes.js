const express = require('express');
const router = express.Router();
const ApplicationController = require('../controllers/ApplicationController');

// Web UI Routes for Applications
router.get('/', ApplicationController.list);
router.post('/:id/status', ApplicationController.updateStatus);
router.post('/:id/delete', ApplicationController.delete);

module.exports = router;
