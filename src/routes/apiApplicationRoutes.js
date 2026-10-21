const express = require('express');
const router = express.Router();
const ApiApplicationController = require('../controllers/ApiApplicationController');

// DIRECT ROUTES: /api/applications
router.get('/', ApiApplicationController.getAll);
router.get('/:id', ApiApplicationController.getById);
router.post('/', ApiApplicationController.create);
router.put('/:id', ApiApplicationController.update);
router.patch('/:id', ApiApplicationController.patch);
router.delete('/:id', ApiApplicationController.delete);

module.exports = router;
