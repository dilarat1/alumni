const pool = require('../db');

/**
 * User Model
 * Connected to MySQL Database (via db connection pool).
 * Implements full asynchronous CRUD operations.
 */
class UserModel {
  // READ (All)
  async getAll() {
    const [rows] = await pool.query('SELECT id, username, email, phone, created_at FROM users ORDER BY id');
    return rows;
  }

  // READ (One by ID)
  async getById(id) {
    const [rows] = await pool.query('SELECT id, username, email, phone, created_at FROM users WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  // CREATE
  async create(userData) {
    const { username, email, password, phone } = userData;
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password, phone) VALUES (?, ?, ?, ?)',
      [username, email, password || 'password123', phone || null]
    );
    return this.getById(result.insertId);
  }

  // UPDATE (Full - PUT)
  async update(id, userData) {
    const { username, email, password, phone } = userData;
    const [result] = await pool.query(
      'UPDATE users SET username = ?, email = ?, password = ?, phone = ? WHERE id = ?',
      [username, email, password || 'password123', phone || null, id]
    );
    if (result.affectedRows === 0) return null;
    return this.getById(id);
  }

  // PATCH (Partial update)
  async patch(id, partialData) {
    const allowed = ['username', 'email', 'password', 'phone'];
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
    const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    const [result] = await pool.query(sql, values);
    if (result.affectedRows === 0) return null;
    return this.getById(id);
  }

  // DELETE
  async delete(id) {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new UserModel();
