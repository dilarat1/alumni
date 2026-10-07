const express = require('express');
const router = express.Router();
const ApiAnnouncementController = require('../controllers/ApiAnnouncementController');

// REST API Routes (CRUD operations with JSON for Announcements)
// GET /api/announcements → list all announcements
router.get('/', ApiAnnouncementController.getAll);

// GET /api/announcements/:id → get single announcement
router.get('/:id', ApiAnnouncementController.getById);

// POST /api/announcements → create announcement
router.post('/', ApiAnnouncementController.create);

// PUT /api/announcements/:id → full update
router.put('/:id', ApiAnnouncementController.update);

// PATCH /api/announcements/:id → partial update
router.patch('/:id', ApiAnnouncementController.patch);

// DELETE /api/announcements/:id → delete announcement
router.delete('/:id', ApiAnnouncementController.delete);

module.exports = router;
