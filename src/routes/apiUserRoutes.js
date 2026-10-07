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

module.exports = router;
