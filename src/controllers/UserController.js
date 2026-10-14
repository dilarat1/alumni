const UserModel = require('../models/User');

/**
 * UserController (Web View Layer)
 * Handles requests from browser views and interacts asynchronously with UserModel.
 */
class UserController {
  // READ (List with view) - GET /users
  static async list(req, res) {
    try {
      const users = await UserModel.getAll();
      res.render('users/index', { users });
    } catch (err) {
      res.status(500).send('Error loading users: ' + err.message);
    }
  }

  // CREATE (From view form) - POST /users
  static async create(req, res) {
    try {
      const { username, email, password, phone } = req.body;
      await UserModel.create({ username, email, password, phone });
      res.redirect('/users');
    } catch (err) {
      res.status(500).send('Error creating user: ' + err.message);
    }
  }

  // UPDATE (From view form) - POST /users/:id/update
  static async update(req, res) {
    try {
      const { username, email, password, phone } = req.body;
      await UserModel.update(req.params.id, { username, email, password, phone });
      res.redirect('/users');
    } catch (err) {
      res.status(500).send('Error updating user: ' + err.message);
    }
  }

  // DELETE (From view form) - POST /users/:id/delete
  static async delete(req, res) {
    try {
      await UserModel.delete(req.params.id);
      res.redirect('/users');
    } catch (err) {
      res.status(500).send('Error deleting user: ' + err.message);
    }
  }
}

module.exports = UserController;
