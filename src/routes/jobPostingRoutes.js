const express = require('express');
const router = express.Router();
const JobPostingController = require('../controllers/JobPostingController');

// Web UI Routes for Job Postings
router.get('/', JobPostingController.list);
router.post('/', JobPostingController.create);
router.get('/:id', JobPostingController.detail);
router.post('/:id/apply', JobPostingController.apply);
router.post('/:id/delete', JobPostingController.delete);

module.exports = router;
