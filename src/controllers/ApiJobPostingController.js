const JobPostingModel = require('../models/JobPosting');
const ApplicationModel = require('../models/Application');

/**
 * ApiJobPostingController (JSON REST API Layer)
 * Manages direct job posting operations and nested application operations.
 */
class ApiJobPostingController {
  // GET /api/job-postings
  static async getAll(req, res) {
    try {
      const postings = await JobPostingModel.getAll();
      res.json(postings);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // GET /api/job-postings/:id
  static async getById(req, res) {
    try {
      const posting = await JobPostingModel.getById(req.params.id);
      if (!posting) return res.status(404).json({ error: 'Job posting not found' });
      res.json(posting);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // POST /api/job-postings
  static async create(req, res) {
    try {
      const { title, company, location, type, description, requirements, salary, contact_email } = req.body;
      if (!title || !company || !location || !description) {
        return res.status(400).json({ error: 'Title, company, location, and description are required' });
      }
      const created = await JobPostingModel.create({
        title,
        company,
        location,
        type,
        description,
        requirements,
        salary,
        contact_email
      });
      res.status(201).json(created);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // PUT /api/job-postings/:id
  static async update(req, res) {
    try {
      const { title, company, location, type, description, requirements, salary, contact_email } = req.body;
      if (!title || !company || !location || !description) {
        return res.status(400).json({ error: 'Title, company, location, and description are required' });
      }
      const updated = await JobPostingModel.update(req.params.id, {
        title,
        company,
        location,
        type,
        description,
        requirements,
        salary,
        contact_email
      });
      if (!updated) return res.status(404).json({ error: 'Job posting not found' });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // PATCH /api/job-postings/:id
  static async patch(req, res) {
    try {
      const updated = await JobPostingModel.patch(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Job posting not found' });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // DELETE /api/job-postings/:id
  static async delete(req, res) {
    try {
      const deleted = await JobPostingModel.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Job posting not found' });
      res.json({ message: 'Job posting deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // NESTED ROUTE: GET /api/job-postings/:jobPostingId/applications
  static async getApplications(req, res) {
    try {
      const jobPostingId = req.params.jobPostingId || req.params.id;
      const job = await JobPostingModel.getById(jobPostingId);
      if (!job) return res.status(404).json({ error: 'Job posting not found' });

      const applications = await JobPostingModel.getApplications(jobPostingId);
      res.json(applications);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // NESTED ROUTE: POST /api/job-postings/:jobPostingId/applications
  static async createApplication(req, res) {
    try {
      const jobPostingId = req.params.jobPostingId || req.params.id;
      const job = await JobPostingModel.getById(jobPostingId);
      if (!job) return res.status(404).json({ error: 'Job posting not found' });

      const { applicant_name, applicant_email, resume_url, cover_letter } = req.body;
      if (!applicant_name || !applicant_email) {
        return res.status(400).json({ error: 'applicant_name and applicant_email are required' });
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
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = ApiJobPostingController;
