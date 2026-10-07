const express = require('express');
const router = express.Router();
const AnnouncementController = require('../controllers/AnnouncementController');

// View Layer Routes (CRUD operations with View for Announcements)
// GET /announcements → list announcements
router.get('/', AnnouncementController.list);

// POST /announcements → create announcement
router.post('/', AnnouncementController.create);

// POST /announcements/:id/update → update announcement
router.post('/:id/update', AnnouncementController.update);

// POST /announcements/:id/delete → delete announcement
router.post('/:id/delete', AnnouncementController.delete);

module.exports = router;
