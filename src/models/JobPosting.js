const pool = require('../db');

/**
 * JobPosting Model
 * Connected to MySQL Database (via db connection pool).
 * Implements full asynchronous CRUD operations and 1:N relations with Applications.
 */
class JobPostingModel {
  // READ (All job postings)
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM job_postings ORDER BY created_at DESC');
    return rows;
  }

  // READ (One by ID)
  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM job_postings WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  // RELATION: 1-to-Many (JobPosting hasMany Applications)
  async getApplications(jobPostingId) {
    const [rows] = await pool.query(
      'SELECT * FROM applications WHERE job_posting_id = ? ORDER BY created_at DESC',
      [jobPostingId]
    );
    return rows;
  }

  // RELATION: Get all job postings for a specific user
  async getByUserId(userId) {
    const [rows] = await pool.query(
      'SELECT * FROM job_postings WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  // RELATION: Get author user for a job posting
  async getUser(jobPostingId) {
    const [rows] = await pool.query(`
      SELECT u.id, u.username, u.email, u.phone
      FROM users u
      JOIN job_postings j ON j.user_id = u.id
      WHERE j.id = ?
    `, [jobPostingId]);
    return rows.length > 0 ? rows[0] : null;
  }

  // RELATION: Get job posting along with its nested applications array
  async getWithApplications(id) {
    const job = await this.getById(id);
    if (!job) return null;
    job.applications = await this.getApplications(id);
    return job;
  }

  // CREATE
  async create(data) {
    const { user_id, title, company, location, type, description, requirements, salary, contact_email } = data;
    const [result] = await pool.query(
      'INSERT INTO job_postings (user_id, title, company, location, type, description, requirements, salary, contact_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        user_id || null,
        title,
        company,
        location,
        type || 'Full-time',
        description,
        requirements || null,
        salary || null,
        contact_email || null
      ]
    );
    return this.getById(result.insertId);
  }

  // UPDATE (Full - PUT)
  async update(id, data) {
    const { user_id, title, company, location, type, description, requirements, salary, contact_email } = data;
    const [result] = await pool.query(
      'UPDATE job_postings SET user_id = ?, title = ?, company = ?, location = ?, type = ?, description = ?, requirements = ?, salary = ?, contact_email = ? WHERE id = ?',
      [
        user_id || null,
        title,
        company,
        location,
        type || 'Full-time',
        description,
        requirements || null,
        salary || null,
        contact_email || null,
        id
      ]
    );
    if (result.affectedRows === 0) return null;
    return this.getById(id);
  }

  // PATCH (Partial update)
  async patch(id, partialData) {
    const allowed = ['user_id', 'title', 'company', 'location', 'type', 'description', 'requirements', 'salary', 'contact_email'];
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
    const sql = `UPDATE job_postings SET ${updates.join(', ')} WHERE id = ?`;
    const [result] = await pool.query(sql, values);
    if (result.affectedRows === 0) return null;
    return this.getById(id);
  }

  // DELETE (Cascades to child applications due to FOREIGN KEY ON DELETE CASCADE)
  async delete(id) {
    const [result] = await pool.query('DELETE FROM job_postings WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new JobPostingModel();
