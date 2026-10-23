const express = require('express');
const router = express.Router();
const ApiUserController = require('../controllers/ApiUserController');

// REST API Routes (CRUD operations with JSON)
// GET /api/users → list all users
router.get('/', ApiUserController.getAll);

// GET /api/users/:id → get single user
router.get('/:id', ApiUserController.getById);

// POST /api/users → create new user
router.post('/', ApiUserController.create);

// PUT /api/users/:id → full update
router.put('/:id', ApiUserController.update);

// PATCH /api/users/:id → partial update
router.patch('/:id', ApiUserController.patch);

// DELETE /api/users/:id → delete user
router.delete('/:id', ApiUserController.delete);

// NESTED ROUTES: User's Job Postings (Fourth task nested route)
// GET /api/users/:id/jobs → get all jobs posted by specific user
router.get('/:id/jobs', ApiUserController.getUserJobs);

// POST /api/users/:id/jobs → create a new job posting for user
router.post('/:id/jobs', ApiUserController.createUserJob);

// Aliases for /job-postings
router.get('/:id/job-postings', ApiUserController.getUserJobs);
router.post('/:id/job-postings', ApiUserController.createUserJob);

module.exports = router;
