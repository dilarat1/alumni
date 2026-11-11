const JobPostingModel = require('../models/JobPosting');
const ApplicationModel = require('../models/Application');

/**
 * ApiJobPostingController (JSON REST API Layer)
 * Manages direct job posting operations and nested application operations.
 * Enforces JobPosting domain rules:
 *   - title: required, max 120 characters
 *   - company: required
 *   - city / location, description: optional
 */
class ApiJobPostingController {
  // GET /api/job-postings
  static async getAll(req, res, next) {
    try {
      const postings = await JobPostingModel.getAll();
      res.json(postings);
    } catch (err) {
      next(err);
    }
  }

  // GET /api/job-postings/:id
  static async getById(req, res, next) {
    try {
      const posting = await JobPostingModel.getById(req.params.id);
      if (!posting) {
        return res.status(404).json({
          error: 'Job posting not found',
          status: 404,
          reason: `No job posting exists with ID ${req.params.id}`
        });
      }
      res.json(posting);
    } catch (err) {
      next(err);
    }
  }

  // POST /api/job-postings
  static async create(req, res, next) {
    try {
      const { user_id, title, company, city, location, type, description, requirements, salary, contact_email } = req.body || {};

      if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'title required', reason: 'title is required' });
      }
      if (title.trim().length > 120) {
        return res.status(400).json({ error: 'Validation failed', reason: 'title must be at most 120 characters' });
      }
      if (!company || typeof company !== 'string' || company.trim() === '') {
        return res.status(400).json({ error: 'company required', reason: 'company is required' });
      }

      const created = await JobPostingModel.create({
        user_id,
        title: title.trim(),
        company: company.trim(),
        city: city !== undefined ? city : location,
        location: location !== undefined ? location : city,
        type,
        description,
        requirements,
        salary,
        contact_email
      });
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  }

  // PUT /api/job-postings/:id
  static async update(req, res, next) {
    try {
      const { user_id, title, company, city, location, type, description, requirements, salary, contact_email } = req.body || {};

      if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ error: 'title required', reason: 'title is required' });
      }
      if (title.trim().length > 120) {
        return res.status(400).json({ error: 'Validation failed', reason: 'title must be at most 120 characters' });
      }
      if (!company || typeof company !== 'string' || company.trim() === '') {
        return res.status(400).json({ error: 'company required', reason: 'company is required' });
      }

      const updated = await JobPostingModel.update(req.params.id, {
        user_id,
        title: title.trim(),
        company: company.trim(),
        city: city !== undefined ? city : location,
        location: location !== undefined ? location : city,
        type,
        description,
        requirements,
        salary,
        contact_email
      });
      if (!updated) {
        return res.status(404).json({
          error: 'Job posting not found',
          status: 404,
          reason: `Cannot update: no job posting exists with ID ${req.params.id}`
        });
      }
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  // PATCH /api/job-postings/:id
  static async patch(req, res, next) {
    try {
      const { title, company } = req.body || {};
      if (title !== undefined) {
        if (typeof title !== 'string' || title.trim() === '') {
          return res.status(400).json({ error: 'title required', reason: 'title cannot be empty' });
        }
        if (title.trim().length > 120) {
          return res.status(400).json({ error: 'Validation failed', reason: 'title must be at most 120 characters' });
        }
      }
      if (company !== undefined && (typeof company !== 'string' || company.trim() === '')) {
        return res.status(400).json({ error: 'company required', reason: 'company cannot be empty' });
      }

      const updated = await JobPostingModel.patch(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({
          error: 'Job posting not found',
          status: 404,
          reason: `Cannot patch: no job posting exists with ID ${req.params.id}`
        });
      }
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /api/job-postings/:id
  static async delete(req, res, next) {
    try {
      const deleted = await JobPostingModel.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({
          error: 'Job posting not found',
          status: 404,
          reason: `Cannot delete: no job posting exists with ID ${req.params.id}`
        });
      }
      res.json({ message: 'Job posting deleted' });
    } catch (err) {
      next(err);
    }
  }

  // NESTED ROUTE: GET /api/job-postings/:jobPostingId/applications
  static async getApplications(req, res, next) {
    try {
      const jobPostingId = req.params.jobPostingId || req.params.id;
      const job = await JobPostingModel.getById(jobPostingId);
      if (!job) {
        return res.status(404).json({
          error: 'Job posting not found',
          status: 404,
          reason: `No job posting exists with ID ${jobPostingId}`
        });
      }

      const applications = await JobPostingModel.getApplications(jobPostingId);
      res.json(applications);
    } catch (err) {
      next(err);
    }
  }

  // NESTED ROUTE: POST /api/job-postings/:jobPostingId/applications
  static async createApplication(req, res, next) {
    try {
      const jobPostingId = req.params.jobPostingId || req.params.id;
      const job = await JobPostingModel.getById(jobPostingId);
      if (!job) {
        return res.status(404).json({
          error: 'Job posting not found',
          status: 404,
          reason: `Cannot apply: no job posting exists with ID ${jobPostingId}`
        });
      }

      const { applicant_name, applicant_email, resume_url, cover_letter } = req.body || {};
      if (!applicant_name || !applicant_email) {
        return res.status(400).json({
          error: 'Validation failed',
          reason: 'applicant_name and applicant_email are required'
        });
      }

      const created = await ApplicationModel.create({
        job_posting_id: parseInt(jobPostingId),
        applicant_name,
        applicant_email,
        resume_url,
        cover_letter,
        status: 'Pending'
      });
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ApiJobPostingController;
