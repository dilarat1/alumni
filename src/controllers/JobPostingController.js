const JobPostingModel = require('../models/JobPosting');
const ApplicationModel = require('../models/Application');

/**
 * JobPostingController (Web View Layer)
 * Renders job postings, posting forms, and detail views with applicant submissions.
 */
class JobPostingController {
  // GET /job-postings (Listings + create form)
  static async list(req, res, next) {
    try {
      const postings = await JobPostingModel.getAll();
      res.render('job-postings/index', { postings, success: req.query.success || null });
    } catch (err) {
      next(err);
    }
  }

  // GET /job-postings/:id (Detail view + applications for this job)
  static async detail(req, res, next) {
    try {
      const job = await JobPostingModel.getWithApplications(req.params.id);
      if (!job) {
        return res.redirect(
          `/404?from=${encodeURIComponent(req.originalUrl)}&reason=${encodeURIComponent(`No job posting exists with ID ${req.params.id}`)}`
        );
      }
      res.render('job-postings/detail', { job, success: req.query.success || null });
    } catch (err) {
      next(err);
    }
  }

  // POST /job-postings (Create job posting)
  static async create(req, res, next) {
    try {
      const { title, company, city, location, type, description, requirements, salary, contact_email } = req.body || {};
      if (!title || !title.trim() || title.trim().length > 120 || !company || !company.trim()) {
        return res.redirect(
          `/404?from=/job-postings&reason=${encodeURIComponent('Invalid job posting: title (max 120 chars) and company are required')}`
        );
      }
      await JobPostingModel.create({
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
      res.redirect('/job-postings?success=Job+posting+created+successfully');
    } catch (err) {
      next(err);
    }
  }

  // POST /job-postings/:id/apply (Candidate applies to this job)
  static async apply(req, res, next) {
    try {
      const { applicant_name, applicant_email, resume_url, cover_letter } = req.body || {};
      await ApplicationModel.create({
        job_posting_id: parseInt(req.params.id),
        applicant_name,
        applicant_email,
        resume_url,
        cover_letter,
        status: 'Pending'
      });
      res.redirect(`/job-postings/${req.params.id}?success=Application+submitted+successfully`);
    } catch (err) {
      next(err);
    }
  }

  // POST /job-postings/:id/delete (Delete job posting)
  static async delete(req, res, next) {
    try {
      await JobPostingModel.delete(req.params.id);
      res.redirect('/job-postings?success=Job+posting+deleted');
    } catch (err) {
      next(err);
    }
  }
}

module.exports = JobPostingController;
