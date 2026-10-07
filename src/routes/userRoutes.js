const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// View Layer Routes (CRUD operations with View)
// GET /users → listings (R)
router.get('/', UserController.list);

// POST /users → creating (C)
router.post('/', UserController.create);

// POST /users/:id/update → updating (U)
router.post('/:id/update', UserController.update);

// POST /users/:id/delete → deleting (D)
router.post('/:id/delete', UserController.delete);

module.exports = router;
