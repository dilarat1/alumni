const UserModel = require('../models/User');

/**
 * UserController (Web View Layer)
 * Handles requests from browser views and renders EJS templates / HTML responses.
 */
class UserController {
  // READ (List with view) - GET /users
  static list(req, res) {
    const users = UserModel.getAll();
    res.render('users/index', { users });
  }

  // CREATE (From view form) - POST /users
  static create(req, res) {
    const { username, email, password, phone } = req.body;
    UserModel.create({ username, email, password, phone });
    res.redirect('/users');
  }

  // UPDATE (From view form) - POST /users/:id/update or PUT /users/:id
  static update(req, res) {
    const { username, email, password, phone } = req.body;
    UserModel.update(req.params.id, { username, email, password, phone });
    res.redirect('/users');
  }

  // DELETE (From view form) - POST /users/:id/delete or DELETE /users/:id
  static delete(req, res) {
    UserModel.delete(req.params.id);
    res.redirect('/users');
  }
}

module.exports = UserController;
