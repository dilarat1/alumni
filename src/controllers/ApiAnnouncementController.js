const AnnouncementModel = require('../models/Announcement');

/**
 * ApiAnnouncementController (JSON REST API Layer - Homework)
 * Returns JSON for all CRUD operations on announcements.
 */
class ApiAnnouncementController {
  // GET /api/announcements
  static getAll(req, res) {
    const list = AnnouncementModel.getAll();
    res.json(list);
  }

  // GET /api/announcements/:id
  static getById(req, res) {
    const item = AnnouncementModel.getById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Announcement not found' });
    res.json(item);
  }

  // POST /api/announcements
  static create(req, res) {
    const { title, content, category, author } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    const created = AnnouncementModel.create({ title, content, category, author });
    res.status(201).json(created);
  }

  // PUT /api/announcements/:id
  static update(req, res) {
    const { title, content, category, author } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    const updated = AnnouncementModel.update(req.params.id, { title, content, category, author });
    if (!updated) return res.status(404).json({ error: 'Announcement not found' });
    res.json(updated);
  }

  // PATCH /api/announcements/:id
  static patch(req, res) {
    const updated = AnnouncementModel.patch(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Announcement not found' });
    res.json(updated);
  }

  // DELETE /api/announcements/:id
  static delete(req, res) {
    const deleted = AnnouncementModel.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Announcement not found' });
    res.json({ message: 'Announcement deleted' });
  }
}

module.exports = ApiAnnouncementController;
