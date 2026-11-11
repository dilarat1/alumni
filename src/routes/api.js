const express = require('express');
const router = express.Router();
const pool = require('../db');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// GET /api/swagger.json → Swagger JSON spec
router.get('/swagger.json', (req, res) => {
  res.json(swaggerDocument);
});

// GET /api/swagger → Interactive Swagger UI documentation
router.use('/swagger', swaggerUi.serve);
router.get('/swagger', swaggerUi.setup(swaggerDocument));

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
router.get('/alumni', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM alumni ORDER BY id');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// GET /api/alumni/:id → Get single alumni
router.get('/alumni/:id', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM alumni WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({
        error: 'Alumni not found',
        status: 404,
        reason: `No alumni record exists with ID ${req.params.id}`
      });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// POST /api/alumni → Create new alumni
router.post('/alumni', async (req, res, next) => {
  try {
    const { first_name, last_name, email, department, graduation_year } = req.body || {};
    if (!first_name || !last_name) {
      return res.status(400).json({
        error: 'Validation failed',
        reason: 'first_name and last_name are required'
      });
    }
    const [result] = await pool.query(
      'INSERT INTO alumni (first_name, last_name, email, department, graduation_year) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name, email, department, graduation_year]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    next(err);
  }
});

// PUT /api/alumni/:id → Update alumni
router.put('/alumni/:id', async (req, res, next) => {
  try {
    const { first_name, last_name, email, department, graduation_year } = req.body || {};
    if (!first_name || !last_name) {
      return res.status(400).json({
        error: 'Validation failed',
        reason: 'first_name and last_name are required'
      });
    }
    const [result] = await pool.query(
      'UPDATE alumni SET first_name = ?, last_name = ?, email = ?, department = ?, graduation_year = ? WHERE id = ?',
      [first_name, last_name, email, department, graduation_year, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Alumni not found',
        status: 404,
        reason: `Cannot update: no alumni record exists with ID ${req.params.id}`
      });
    }
    res.json({ id: parseInt(req.params.id), ...req.body });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/alumni/:id → Delete alumni
router.delete('/alumni/:id', async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM alumni WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Alumni not found',
        status: 404,
        reason: `Cannot delete: no alumni record exists with ID ${req.params.id}`
      });
    }
    res.json({ message: 'Alumni deleted' });
  } catch (err) {
    next(err);
  }
});

// GET /api/error-test → Simulated 500 error for testing 5xx Guardian Middleware
router.get('/error-test', (req, res, next) => {
  const err = new Error('Simulated unexpected 500 server crash caught by 5xx Guardian');
  err.status = 500;
  next(err);
});

// Delegate /users to ApiUserController routes
const apiUserRoutes = require('./apiUserRoutes');
router.use('/users', apiUserRoutes);

// Delegate /announcements to ApiAnnouncementController routes (Homework)
const apiAnnouncementRoutes = require('./apiAnnouncementRoutes');
router.use('/announcements', apiAnnouncementRoutes);

// Delegate /job-postings to ApiJobPostingController routes (Direct & Nested)
const apiJobPostingRoutes = require('./apiJobPostingRoutes');
router.use('/job-postings', apiJobPostingRoutes);
router.use('/jobs', apiJobPostingRoutes); // Alias for /api/jobs

// Delegate /applications to ApiApplicationController routes (Direct)
const apiApplicationRoutes = require('./apiApplicationRoutes');
router.use('/applications', apiApplicationRoutes);

module.exports = router;
