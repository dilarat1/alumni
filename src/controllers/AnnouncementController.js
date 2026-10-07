const AnnouncementModel = require('../models/Announcement');

/**
 * AnnouncementController (Web View Layer - Homework)
 * Manages announcements on the web interface.
 */
class AnnouncementController {
  // GET /announcements (View listings)
  static list(req, res) {
    const announcements = AnnouncementModel.getAll();
    res.render('announcements/index', { announcements });
  }

  // POST /announcements (Create from view)
  static create(req, res) {
    const { title, content, category, author } = req.body;
    AnnouncementModel.create({ title, content, category, author });
    res.redirect('/announcements');
  }

  // POST /announcements/:id/update (Update from view)
  static update(req, res) {
    const { title, content, category, author } = req.body;
    AnnouncementModel.update(req.params.id, { title, content, category, author });
    res.redirect('/announcements');
  }

  // POST /announcements/:id/delete (Delete from view)
  static delete(req, res) {
    AnnouncementModel.delete(req.params.id);
    res.redirect('/announcements');
  }
}

module.exports = AnnouncementController;
