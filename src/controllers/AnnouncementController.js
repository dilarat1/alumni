const AnnouncementModel = require('../models/Announcement');

/**
 * AnnouncementController (Web View Layer - Homework)
 * Manages announcements on the web interface asynchronously backed by MySQL.
 */
class AnnouncementController {
  // GET /announcements (View listings)
  static async list(req, res) {
    try {
      const announcements = await AnnouncementModel.getAll();
      res.render('announcements/index', { announcements });
    } catch (err) {
      res.status(500).send('Error loading announcements: ' + err.message);
    }
  }

  // POST /announcements (Create from view)
  static async create(req, res) {
    try {
      const { title, content, category, author } = req.body;
      await AnnouncementModel.create({ title, content, category, author });
      res.redirect('/announcements');
    } catch (err) {
      res.status(500).send('Error creating announcement: ' + err.message);
    }
  }

  // POST /announcements/:id/update (Update from view)
  static async update(req, res) {
    try {
      const { title, content, category, author } = req.body;
      await AnnouncementModel.update(req.params.id, { title, content, category, author });
      res.redirect('/announcements');
    } catch (err) {
      res.status(500).send('Error updating announcement: ' + err.message);
    }
  }

  // POST /announcements/:id/delete (Delete from view)
  static async delete(req, res) {
    try {
      await AnnouncementModel.delete(req.params.id);
      res.redirect('/announcements');
    } catch (err) {
      res.status(500).send('Error deleting announcement: ' + err.message);
    }
  }
}

module.exports = AnnouncementController;
