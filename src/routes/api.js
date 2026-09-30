const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/health → JSON health check
router.get('/health', async (req, res) => {
  let dbStatus = 'disconnected';
  try {
    await pool.query('SELECT 1');
    dbStatus = 'connected';
  } catch (err) {
    dbStatus = 'error: ' + err.message;
  }

  res.json({
    status: dbStatus === 'connected' ? 'ok' : 'error',
    uptime: process.uptime(),
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// GET /api/alumni → List all alumni
router.get('/alumni', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM alumni ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/alumni/:id → Get single alumni
router.get('/alumni/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM alumni WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Alumni not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/alumni → Create new alumni
router.post('/alumni', async (req, res) => {
  try {
    const { first_name, last_name, email, department, graduation_year } = req.body;
    const [result] = await pool.query(
      'INSERT INTO alumni (first_name, last_name, email, department, graduation_year) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name, email, department, graduation_year]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/alumni/:id → Update alumni
router.put('/alumni/:id', async (req, res) => {
  try {
    const { first_name, last_name, email, department, graduation_year } = req.body;
    const [result] = await pool.query(
      'UPDATE alumni SET first_name = ?, last_name = ?, email = ?, department = ?, graduation_year = ? WHERE id = ?',
      [first_name, last_name, email, department, graduation_year, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Alumni not found' });
    res.json({ id: parseInt(req.params.id), ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/alumni/:id → Delete alumni
router.delete('/alumni/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM alumni WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Alumni not found' });
    res.json({ message: 'Alumni deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users → List all users (JSON)
router.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, username, email, phone, created_at FROM users ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users/:id → Get single user
router.get('/users/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, username, email, phone, created_at FROM users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/users → Create new user
router.post('/users', async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password, phone) VALUES (?, ?, ?, ?)',
      [username, email, password, phone]
    );
    res.status(201).json({ id: result.insertId, username, email, phone });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/users/:id → Update user
router.put('/users/:id', async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    const [result] = await pool.query(
      'UPDATE users SET username = ?, email = ?, password = ?, phone = ? WHERE id = ?',
      [username, email, password, phone, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ id: parseInt(req.params.id), username, email, phone });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/users/:id → Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
