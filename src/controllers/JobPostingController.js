const JobPostingModel = require('../models/JobPosting');
const ApplicationModel = require('../models/Application');

/**
 * JobPostingController (Web View Layer)
 * Renders job postings, posting forms, and detail views with applicant submissions.
 */
class JobPostingController {
  // GET /job-postings (Listings + create form)
  static async list(req, res) {
    try {
      const postings = await JobPostingModel.getAll();
      res.render('job-postings/index', { postings, success: req.query.success || null });
    } catch (err) {
      res.status(500).send('Error loading job postings: ' + err.message);
    }
  }

  // GET /job-postings/:id (Detail view + applications for this job)
  static async detail(req, res) {
    try {
      const job = await JobPostingModel.getWithApplications(req.params.id);
      if (!job) return res.status(404).send('Job posting not found');
      res.render('job-postings/detail', { job, success: req.query.success || null });
    } catch (err) {
      res.status(500).send('Error loading job details: ' + err.message);
    }
  }

  // POST /job-postings (Create job posting)
  static async create(req, res) {
    try {
      const { title, company, location, type, description, requirements, salary, contact_email } = req.body;
      await JobPostingModel.create({
        title,
        company,
        location,
        type,
        description,
        requirements,
        salary,
        contact_email
      });
      res.redirect('/job-postings?success=Job+posting+created+successfully');
    } catch (err) {
      res.status(500).send('Error creating job posting: ' + err.message);
    }
  }

  // POST /job-postings/:id/apply (Candidate applies to this job)
  static async apply(req, res) {
    try {
      const { applicant_name, applicant_email, resume_url, cover_letter } = req.body;
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
      res.status(500).send('Error submitting application: ' + err.message);
    }
  }

  // POST /job-postings/:id/delete (Delete job posting)
  static async delete(req, res) {
    try {
      await JobPostingModel.delete(req.params.id);
      res.redirect('/job-postings?success=Job+posting+deleted');
    } catch (err) {
      res.status(500).send('Error deleting job posting: ' + err.message);
    }
  }
}

module.exports = JobPostingController;
