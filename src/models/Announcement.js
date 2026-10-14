const pool = require('../db');

/**
 * Announcement Model (Homework)
 * Connected to MySQL Database (via db connection pool).
 * Implements full asynchronous CRUD operations.
 */
class AnnouncementModel {
  // READ (All)
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM announcements ORDER BY created_at DESC');
    return rows;
  }

  // READ (One by ID)
  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM announcements WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  // CREATE
  async create(data) {
    const { title, content, category, author } = data;
    const [result] = await pool.query(
      'INSERT INTO announcements (title, content, category, author) VALUES (?, ?, ?, ?)',
      [title, content, category || 'General', author || 'Admin']
    );
    return this.getById(result.insertId);
  }

  // UPDATE (Full - PUT)
  async update(id, data) {
    const { title, content, category, author } = data;
    const [result] = await pool.query(
      'UPDATE announcements SET title = ?, content = ?, category = ?, author = ? WHERE id = ?',
      [title, content, category || 'General', author || 'Admin', id]
    );
    if (result.affectedRows === 0) return null;
    return this.getById(id);
  }

  // PATCH (Partial)
  async patch(id, partialData) {
    const allowed = ['title', 'content', 'category', 'author'];
    const updates = [];
    const values = [];

    for (const field of allowed) {
      if (partialData[field] !== undefined) {
        updates.push(`${field} = ?`);
        values.push(partialData[field]);
      }
    }

    if (updates.length === 0) return this.getById(id);

    values.push(id);
    const sql = `UPDATE announcements SET ${updates.join(', ')} WHERE id = ?`;
    const [result] = await pool.query(sql, values);
    if (result.affectedRows === 0) return null;
    return this.getById(id);
  }

  // DELETE
  async delete(id) {
    const [result] = await pool.query('DELETE FROM announcements WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new AnnouncementModel();
