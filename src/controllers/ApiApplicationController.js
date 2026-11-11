const ApplicationModel = require('../models/Application');
const JobPostingModel = require('../models/JobPosting');

/**
 * ApiApplicationController (JSON REST API Layer)
 * Manages direct application CRUD operations and relations.
 */
class ApiApplicationController {
  // GET /api/applications (Direct: optional query ?job_posting_id=...)
  static async getAll(req, res, next) {
    try {
      const { job_posting_id } = req.query;
      let applications;
      if (job_posting_id) {
        applications = await ApplicationModel.getByJobPostingId(job_posting_id);
      } else {
        applications = await ApplicationModel.getAllWithJob();
      }
      res.json(applications);
    } catch (err) {
      next(err);
    }
  }

  // GET /api/applications/:id
  static async getById(req, res, next) {
    try {
      const application = await ApplicationModel.getByIdWithJob(req.params.id);
      if (!application) {
        return res.status(404).json({
          error: 'Application not found',
          status: 404,
          reason: `No application exists with ID ${req.params.id}`
        });
      }
      res.json(application);
    } catch (err) {
      next(err);
    }
  }

  // POST /api/applications (Direct)
  static async create(req, res, next) {
    try {
      const { job_posting_id, applicant_name, applicant_email, resume_url, cover_letter, status } = req.body || {};
      if (!job_posting_id || !applicant_name || !applicant_email) {
        return res.status(400).json({
          error: 'Validation failed',
          reason: 'job_posting_id, applicant_name, and applicant_email are required'
        });
      }

      // Check if parent job posting exists
      const job = await JobPostingModel.getById(job_posting_id);
      if (!job) {
        return res.status(404).json({
          error: 'Job posting not found',
          status: 404,
          reason: `Referenced job_posting_id (${job_posting_id}) does not exist`
        });
      }

      const created = await ApplicationModel.create({
        job_posting_id: parseInt(job_posting_id),
        applicant_name,
        applicant_email,
        resume_url,
        cover_letter,
        status: status || 'Pending'
      });
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  }

  // PUT /api/applications/:id
  static async update(req, res, next) {
    try {
      const { job_posting_id, applicant_name, applicant_email, resume_url, cover_letter, status } = req.body || {};
      if (!job_posting_id || !applicant_name || !applicant_email) {
        return res.status(400).json({
          error: 'Validation failed',
          reason: 'job_posting_id, applicant_name, and applicant_email are required'
        });
      }

      const updated = await ApplicationModel.update(req.params.id, {
        job_posting_id: parseInt(job_posting_id),
        applicant_name,
        applicant_email,
        resume_url,
        cover_letter,
        status: status || 'Pending'
      });
      if (!updated) {
        return res.status(404).json({
          error: 'Application not found',
          status: 404,
          reason: `Cannot update: no application exists with ID ${req.params.id}`
        });
      }
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  // PATCH /api/applications/:id (e.g. status transition)
  static async patch(req, res, next) {
    try {
      const updated = await ApplicationModel.patch(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({
          error: 'Application not found',
          status: 404,
          reason: `Cannot patch: no application exists with ID ${req.params.id}`
        });
      }
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /api/applications/:id
  static async delete(req, res, next) {
    try {
      const deleted = await ApplicationModel.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({
          error: 'Application not found',
          status: 404,
          reason: `Cannot delete: no application exists with ID ${req.params.id}`
        });
      }
      res.json({ message: 'Application deleted' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ApiApplicationController;
