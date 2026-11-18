const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET / → Homepage (Redesigned with DESIGN.md & brand.md)
router.get('/', async (req, res, next) => {
  try {
    const [[{ users }]] = await pool.query('SELECT COUNT(*) AS users FROM users');
    const [[{ jobs }]] = await pool.query('SELECT COUNT(*) AS jobs FROM job_postings');
    const [[{ applications }]] = await pool.query('SELECT COUNT(*) AS applications FROM applications');
    const [[{ announcements }]] = await pool.query('SELECT COUNT(*) AS announcements FROM announcements');

    res.render('index', {
      stats: { users, jobs, applications, announcements }
    });
  } catch (err) {
    // Fallback if DB is still initializing
    res.render('index', {
      stats: { users: 0, jobs: 0, applications: 0, announcements: 0 }
    });
  }
});

// GET /hello → "Hello, World!"
router.get('/hello', (req, res) => {
  res.send('Hello, World!');
});

// GET /hello/:name → "Hello, Emre!"
router.get('/hello/:name', (req, res) => {
  const name = req.params.name.charAt(0).toUpperCase() + req.params.name.slice(1);
  res.send(`Hello, ${name}!`);
});

// GET /sum/:number1/:number2 → returns the sum
router.get('/sum/:number1/:number2', (req, res) => {
  const n1 = Number(req.params.number1);
  const n2 = Number(req.params.number2);
  res.send(`${n1 + n2}`);
});

// GET /about → About page (Redesigned with DESIGN.md & brand.md)
router.get('/about', (req, res) => {
  res.render('about');
});

// GET /404 → Generic 404 page (Step 7)
router.get('/404', (req, res) => {
  const from = req.query.from || null;
  const reason = req.query.reason || 'The requested page or resource does not exist.';
  res.status(404).render('404', { from, reason });
});

module.exports = router;
