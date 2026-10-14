const AnnouncementModel = require('../models/Announcement');

/**
 * ApiAnnouncementController (JSON REST API Layer - Homework)
 * Returns JSON for all CRUD operations on announcements backed by MySQL.
 */
class ApiAnnouncementController {
  // GET /api/announcements
  static async getAll(req, res) {
    try {
      const list = await AnnouncementModel.getAll();
      res.json(list);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // GET /api/announcements/:id
  static async getById(req, res) {
    try {
      const item = await AnnouncementModel.getById(req.params.id);
      if (!item) return res.status(404).json({ error: 'Announcement not found' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // POST /api/announcements
  static async create(req, res) {
    try {
      const { title, content, category, author } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }
      const created = await AnnouncementModel.create({ title, content, category, author });
      res.status(201).json(created);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // PUT /api/announcements/:id
  static async update(req, res) {
    try {
      const { title, content, category, author } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }
      const updated = await AnnouncementModel.update(req.params.id, { title, content, category, author });
      if (!updated) return res.status(404).json({ error: 'Announcement not found' });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // PATCH /api/announcements/:id
  static async patch(req, res) {
    try {
      const updated = await AnnouncementModel.patch(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Announcement not found' });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // DELETE /api/announcements/:id
  static async delete(req, res) {
    try {
      const deleted = await AnnouncementModel.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Announcement not found' });
      res.json({ message: 'Announcement deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = ApiAnnouncementController;
