const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /users → HTML page showing all users
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, username, email, phone, created_at FROM users ORDER BY id');

    let tableRows = rows.map(u => `
      <tr>
        <td>${u.id}</td>
        <td>${u.username}</td>
        <td>${u.email}</td>
        <td>${u.phone || '-'}</td>
        <td>${new Date(u.created_at).toLocaleDateString()}</td>
      </tr>
    `).join('');

    res.send(`
      <html>
        <head><title>Users - Alumni</title></head>
        <body>
          <h1>Users</h1>
          <table border="1" cellpadding="8" cellspacing="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
          <br>
          <a href="/">← Back to Home</a>
        </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

module.exports = router;
