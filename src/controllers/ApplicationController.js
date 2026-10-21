const ApplicationModel = require('../models/Application');

/**
 * ApplicationController (Web View Layer)
 * Renders applicant dashboard, review states, and status transitions.
 */
class ApplicationController {
  // GET /applications (List all applications)
  static async list(req, res) {
    try {
      const applications = await ApplicationModel.getAllWithJob();
      res.render('applications/index', { applications, success: req.query.success || null });
    } catch (err) {
      res.status(500).send('Error loading applications: ' + err.message);
    }
  }

  // POST /applications/:id/status (Update review status: Pending/Reviewing/Accepted/Rejected)
  static async updateStatus(req, res) {
    try {
      const { status, redirect_to } = req.body;
      await ApplicationModel.patch(req.params.id, { status });
      res.redirect(redirect_to || '/applications?success=Status+updated');
    } catch (err) {
      res.status(500).send('Error updating application status: ' + err.message);
    }
  }

  // POST /applications/:id/delete (Delete application)
  static async delete(req, res) {
    try {
      const { redirect_to } = req.body;
      await ApplicationModel.delete(req.params.id);
      res.redirect(redirect_to || '/applications?success=Application+deleted');
    } catch (err) {
      res.status(500).send('Error deleting application: ' + err.message);
    }
  }
}

module.exports = ApplicationController;
