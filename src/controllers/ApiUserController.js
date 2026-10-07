const UserModel = require('../models/User');

/**
 * ApiUserController (JSON REST API Layer)
 * Handles API requests and returns JSON responses (for Postman / Swagger).
 */
class ApiUserController {
  // GET /api/users
  static getAll(req, res) {
    const users = UserModel.getAll();
    res.json(users);
  }

  // GET /api/users/:id
  static getById(req, res) {
    const user = UserModel.getById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  }

  // POST /api/users
  static create(req, res) {
    const { username, email, password, phone } = req.body;
    if (!username || !email) {
      return res.status(400).json({ error: 'Username and email are required' });
    }
    const newUser = UserModel.create({ username, email, password, phone });
    res.status(201).json(newUser);
  }

  // PUT /api/users/:id (Full update)
  static update(req, res) {
    const { username, email, password, phone } = req.body;
    if (!username || !email) {
      return res.status(400).json({ error: 'PUT requires username and email' });
    }
    const updated = UserModel.update(req.params.id, { username, email, password, phone });
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json(updated);
  }

  // PATCH /api/users/:id (Partial update)
  static patch(req, res) {
    const updated = UserModel.patch(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json(updated);
  }

  // DELETE /api/users/:id
  static delete(req, res) {
    const deleted = UserModel.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  }
}

module.exports = ApiUserController;
