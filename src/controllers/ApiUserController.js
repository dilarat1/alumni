const UserModel = require('../models/User');

/**
 * ApiUserController (JSON REST API Layer)
 * Handles API requests and returns JSON responses backed by MySQL.
 */
class ApiUserController {
  // GET /api/users
  static async getAll(req, res) {
    try {
      const users = await UserModel.getAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // GET /api/users/:id
  static async getById(req, res) {
    try {
      const user = await UserModel.getById(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // POST /api/users
  static async create(req, res) {
    try {
      const { username, email, password, phone } = req.body;
      if (!username || !email) {
        return res.status(400).json({ error: 'Username and email are required' });
      }
      const newUser = await UserModel.create({ username, email, password, phone });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // PUT /api/users/:id (Full update)
  static async update(req, res) {
    try {
      const { username, email, password, phone } = req.body;
      if (!username || !email) {
        return res.status(400).json({ error: 'PUT requires username and email' });
      }
      const updated = await UserModel.update(req.params.id, { username, email, password, phone });
      if (!updated) return res.status(404).json({ error: 'User not found' });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // PATCH /api/users/:id (Partial update)
  static async patch(req, res) {
    try {
      const updated = await UserModel.patch(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'User not found' });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // DELETE /api/users/:id
  static async delete(req, res) {
    try {
      const deleted = await UserModel.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = ApiUserController;
