const UserModel = require('../models/User');
const JobPostingModel = require('../models/JobPosting');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * ApiUserController (JSON REST API Layer)
 * Handles API requests and returns JSON responses backed by MySQL.
 */
class ApiUserController {
  // GET /api/users
  static async getAll(req, res, next) {
    try {
      const users = await UserModel.getAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  // GET /api/users/:id
  static async getById(req, res, next) {
    try {
      const user = await UserModel.getById(req.params.id);
      if (!user) {
        return res.status(404).json({
          error: 'User not found',
          status: 404,
          reason: `No user exists with ID ${req.params.id}`
        });
      }
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  // POST /api/users
  static async create(req, res, next) {
    try {
      const { username, email, password, phone } = req.body || {};
      if (!username || typeof username !== 'string' || username.trim() === '') {
        return res.status(400).json({
          error: 'username required',
          reason: 'username is required'
        });
      }
      if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
        return res.status(400).json({
          error: 'bad email',
          reason: 'A valid email address is required'
        });
      }
      const newUser = await UserModel.create({
        username: username.trim(),
        email: email.trim(),
        password,
        phone
      });
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  // PUT /api/users/:id (Full update)
  static async update(req, res, next) {
    try {
      const { username, email, password, phone } = req.body || {};
      if (!username || typeof username !== 'string' || username.trim() === '') {
        return res.status(400).json({
          error: 'username required',
          reason: 'PUT requires a valid username'
        });
      }
      if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
        return res.status(400).json({
          error: 'bad email',
          reason: 'PUT requires a valid email address'
        });
      }
      const updated = await UserModel.update(req.params.id, {
        username: username.trim(),
        email: email.trim(),
        password,
        phone
      });
      if (!updated) {
        return res.status(404).json({
          error: 'User not found',
          status: 404,
          reason: `Cannot update: no user exists with ID ${req.params.id}`
        });
      }
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  // PATCH /api/users/:id (Partial update)
  static async patch(req, res, next) {
    try {
      const { email } = req.body || {};
      if (email !== undefined && (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim()))) {
        return res.status(400).json({
          error: 'bad email',
          reason: 'Provided email address is not valid'
        });
      }
      const updated = await UserModel.patch(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({
          error: 'User not found',
          status: 404,
          reason: `Cannot patch: no user exists with ID ${req.params.id}`
        });
      }
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /api/users/:id
  static async delete(req, res, next) {
    try {
      const deleted = await UserModel.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({
          error: 'User not found',
          status: 404,
          reason: `Cannot delete: no user exists with ID ${req.params.id}`
        });
      }
      res.json({ message: 'User deleted' });
    } catch (err) {
      next(err);
    }
  }

  // NESTED ROUTE: GET /api/users/:id/jobs (Bir kullanıcının ilanlarını veren rota)
  static async getUserJobs(req, res, next) {
    try {
      const user = await UserModel.getById(req.params.id);
      if (!user) {
        return res.status(404).json({
          error: 'User not found',
          status: 404,
          reason: `No user exists with ID ${req.params.id}`
        });
      }

      const jobs = await UserModel.getJobs(req.params.id);
      res.json(jobs);
    } catch (err) {
      next(err);
    }
  }

  // NESTED ROUTE: POST /api/users/:id/jobs (Bir kullanıcı adına yeni ilan oluşturan rota)
  static async createUserJob(req, res, next) {
    try {
      const user = await UserModel.getById(req.params.id);
      if (!user) {
        return res.status(404).json({
          error: 'User not found',
          status: 404,
          reason: `Cannot create job posting: no user exists with ID ${req.params.id}`
        });
      }

      const { title, company, city, location, type, description, requirements, salary, contact_email } = req.body || {};

      // Step 2 Domain Rules:
      // -> title required, max 120 characters
      // -> company required
      // -> city, description are optional
      if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({
          error: 'title required',
          reason: 'title is required'
        });
      }
      if (title.trim().length > 120) {
        return res.status(400).json({
          error: 'Validation failed',
          reason: 'title must be at most 120 characters'
        });
      }
      if (!company || typeof company !== 'string' || company.trim() === '') {
        return res.status(400).json({
          error: 'company required',
          reason: 'company is required'
        });
      }

      const newJob = await JobPostingModel.create({
        user_id: parseInt(req.params.id),
        title: title.trim(),
        company: company.trim(),
        city: city !== undefined ? city : location,
        location: location !== undefined ? location : city,
        type,
        description,
        requirements,
        salary,
        contact_email: contact_email || user.email
      });
      res.status(201).json(newJob);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ApiUserController;
