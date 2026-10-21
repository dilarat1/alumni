const pool = require('../db');

/**
 * Application Model
 * Connected to MySQL Database (via db connection pool).
 * Implements full asynchronous CRUD operations and N:1 relations with JobPostings.
 */
class ApplicationModel {
  // READ (All applications)
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM applications ORDER BY created_at DESC');
    return rows;
  }

  // READ with joined JobPosting details (Relation: belongsTo JobPosting)
  async getAllWithJob() {
    const [rows] = await pool.query(`
      SELECT 
        a.*,
        j.title AS job_title,
        j.company AS job_company,
        j.location AS job_location,
        j.type AS job_type
      FROM applications a
      JOIN job_postings j ON a.job_posting_id = j.id
      ORDER BY a.created_at DESC
    `);
    return rows;
  }

  // READ (One by ID)
  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM applications WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  // READ (One by ID with associated Job details)
  async getByIdWithJob(id) {
    const [rows] = await pool.query(`
      SELECT 
        a.*,
        j.title AS job_title,
        j.company AS job_company,
        j.location AS job_location,
        j.type AS job_type
      FROM applications a
      JOIN job_postings j ON a.job_posting_id = j.id
      WHERE a.id = ?
    `, [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  // RELATION: Filter applications by specific parent JobPosting ID
  async getByJobPostingId(jobPostingId) {
    const [rows] = await pool.query(
      'SELECT * FROM applications WHERE job_posting_id = ? ORDER BY created_at DESC',
      [jobPostingId]
    );
    return rows;
  }

  // RELATION: Fetch parent JobPosting for a specific application
  async getJobPosting(applicationId) {
    const [rows] = await pool.query(`
      SELECT j.*
      FROM job_postings j
      JOIN applications a ON a.job_posting_id = j.id
      WHERE a.id = ?
    `, [applicationId]);
    return rows.length > 0 ? rows[0] : null;
  }

  // CREATE
  async create(data) {
    const { job_posting_id, applicant_name, applicant_email, resume_url, cover_letter, status } = data;
    const [result] = await pool.query(
      'INSERT INTO applications (job_posting_id, applicant_name, applicant_email, resume_url, cover_letter, status) VALUES (?, ?, ?, ?, ?, ?)',
      [
        job_posting_id,
        applicant_name,
        applicant_email,
        resume_url || null,
        cover_letter || null,
        status || 'Pending'
      ]
    );
    return this.getById(result.insertId);
  }

  // UPDATE (Full - PUT)
  async update(id, data) {
    const { job_posting_id, applicant_name, applicant_email, resume_url, cover_letter, status } = data;
    const [result] = await pool.query(
      'UPDATE applications SET job_posting_id = ?, applicant_name = ?, applicant_email = ?, resume_url = ?, cover_letter = ?, status = ? WHERE id = ?',
      [
        job_posting_id,
        applicant_name,
        applicant_email,
        resume_url || null,
        cover_letter || null,
        status || 'Pending',
        id
      ]
    );
    if (result.affectedRows === 0) return null;
    return this.getById(id);
  }

  // PATCH (Partial update / e.g. status transition)
  async patch(id, partialData) {
    const allowed = ['job_posting_id', 'applicant_name', 'applicant_email', 'resume_url', 'cover_letter', 'status'];
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
    const sql = `UPDATE applications SET ${updates.join(', ')} WHERE id = ?`;
    const [result] = await pool.query(sql, values);
    if (result.affectedRows === 0) return null;
    return this.getById(id);
  }

  // DELETE
  async delete(id) {
    const [result] = await pool.query('DELETE FROM applications WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = new ApplicationModel();
