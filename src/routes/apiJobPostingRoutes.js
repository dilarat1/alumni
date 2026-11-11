const express = require('express');
const router = express.Router();
const ApiJobPostingController = require('../controllers/ApiJobPostingController');
const { validateJobPosting, validateJobPostingPatch } = require('../middlewares/validate');

// DIRECT ROUTES: /api/job-postings
router.get('/', ApiJobPostingController.getAll);
router.get('/:id', ApiJobPostingController.getById);
router.post('/', validateJobPosting, ApiJobPostingController.create);
router.put('/:id', validateJobPosting, ApiJobPostingController.update);
router.patch('/:id', validateJobPostingPatch, ApiJobPostingController.patch);
router.delete('/:id', ApiJobPostingController.delete);

// NESTED ROUTES: /api/job-postings/:jobPostingId/applications
router.get('/:jobPostingId/applications', ApiJobPostingController.getApplications);
router.post('/:jobPostingId/applications', ApiJobPostingController.createApplication);

module.exports = router;
