const AnnouncementModel = require('../models/Announcement');

/**
 * ApiAnnouncementController (JSON REST API Layer - Homework)
 * Returns JSON for all CRUD operations on announcements backed by MySQL.
 */
class ApiAnnouncementController {
  // GET /api/announcements
  static async getAll(req, res, next) {
    try {
      const list = await AnnouncementModel.getAll();
      res.json(list);
    } catch (err) {
      next(err);
    }
  }

  // GET /api/announcements/:id
  static async getById(req, res, next) {
    try {
      const item = await AnnouncementModel.getById(req.params.id);
      if (!item) {
        return res.status(404).json({
          error: 'Announcement not found',
          status: 404,
          reason: `No announcement exists with ID ${req.params.id}`
        });
      }
      res.json(item);
    } catch (err) {
      next(err);
    }
  }

  // POST /api/announcements
  static async create(req, res, next) {
    try {
      const { title, content, category, author } = req.body || {};
      if (!title || !content) {
        return res.status(400).json({
          error: 'Validation failed',
          reason: 'Title and content are required'
        });
      }
      const created = await AnnouncementModel.create({ title, content, category, author });
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  }

  // PUT /api/announcements/:id
  static async update(req, res, next) {
    try {
      const { title, content, category, author } = req.body || {};
      if (!title || !content) {
        return res.status(400).json({
          error: 'Validation failed',
          reason: 'Title and content are required'
        });
      }
      const updated = await AnnouncementModel.update(req.params.id, { title, content, category, author });
      if (!updated) {
        return res.status(404).json({
          error: 'Announcement not found',
          status: 404,
          reason: `Cannot update: no announcement exists with ID ${req.params.id}`
        });
      }
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  // PATCH /api/announcements/:id
  static async patch(req, res, next) {
    try {
      const updated = await AnnouncementModel.patch(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({
          error: 'Announcement not found',
          status: 404,
          reason: `Cannot patch: no announcement exists with ID ${req.params.id}`
        });
      }
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }

  // DELETE /api/announcements/:id
  static async delete(req, res, next) {
    try {
      const deleted = await AnnouncementModel.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({
          error: 'Announcement not found',
          status: 404,
          reason: `Cannot delete: no announcement exists with ID ${req.params.id}`
        });
      }
      res.json({ message: 'Announcement deleted' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ApiAnnouncementController;
