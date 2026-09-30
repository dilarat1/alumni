const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /users → styled HTML page showing all users + add form
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, username, email, phone, created_at FROM users ORDER BY id');

    let tableRows = rows.map(u => `
      <tr>
        <td><span class="badge">#${u.id}</span></td>
        <td><strong>${u.username}</strong></td>
        <td>${u.email}</td>
        <td>${u.phone || '<span class="muted">-</span>'}</td>
        <td><span class="date">${new Date(u.created_at).toLocaleDateString('tr-TR')}</span></td>
      </tr>
    `).join('');

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Users | Alumni System</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f0f2f5;
            color: #1a1a2e;
            padding: 40px 20px;
          }
          .container { max-width: 900px; margin: 0 auto; }
          .tag {
            display: inline-block;
            background: #e8f5e9;
            color: #2e7d32;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 12px;
          }
          h1 { font-size: 28px; margin-bottom: 8px; }
          .subtitle { color: #666; margin-bottom: 30px; line-height: 1.6; }
          .subtitle strong { color: #1a1a2e; }
          .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            padding: 24px;
            margin-bottom: 30px;
          }
          table { width: 100%; border-collapse: collapse; }
          th {
            text-align: left;
            padding: 12px 16px;
            font-size: 13px;
            color: #888;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #f0f0f0;
          }
          td {
            padding: 14px 16px;
            border-bottom: 1px solid #f5f5f5;
          }
          tr:hover { background: #fafafa; }
          .badge {
            background: #e3f2fd;
            color: #1565c0;
            padding: 2px 10px;
            border-radius: 12px;
            font-size: 13px;
            font-weight: 600;
          }
          .date {
            background: #f3e5f5;
            color: #7b1fa2;
            padding: 2px 10px;
            border-radius: 12px;
            font-size: 13px;
          }
          .muted { color: #ccc; }
          h2 { font-size: 20px; margin-bottom: 6px; }
          .form-hint { color: #888; font-size: 14px; margin-bottom: 20px; }
          .form-hint code { background: #f5f5f5; padding: 2px 6px; border-radius: 4px; font-size: 13px; }
          .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          label { display: block; font-size: 14px; font-weight: 600; margin-bottom: 6px; }
          input {
            width: 100%;
            padding: 10px 14px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 15px;
            transition: border-color 0.2s;
          }
          input:focus { outline: none; border-color: #1565c0; }
          .btn {
            grid-column: 1 / -1;
            background: #1565c0;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
          }
          .btn:hover { background: #0d47a1; }
          .success {
            background: #e8f5e9;
            color: #2e7d32;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 16px;
            display: none;
          }
          nav { margin-top: 20px; text-align: center; }
          nav a { color: #1565c0; text-decoration: none; margin: 0 8px; }
          nav a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <span class="tag">🌐 Web Arayüzü (URL/users)</span>
          <h1>👤 Registered Users</h1>
          <p class="subtitle">
            As the professor wrote on the board: <strong>URL/users</strong> is the web interface;
            <strong>URL/api/users</strong> is the JSON API for Postman.
            Users you add from Postman will instantly appear in this table!
          </p>

          <div class="card">
            <table>
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
          </div>

          <div class="card">
            <h2>+ Add New User</h2>
            <p class="form-hint">You can also use Postman to POST to <code>/api/users</code></p>
            <div id="success" class="success">✅ User added successfully! Refreshing...</div>
            <form id="addForm" class="form-grid">
              <div>
                <label>Username</label>
                <input type="text" name="username" placeholder="e.g. emre" required>
              </div>
              <div>
                <label>Email</label>
                <input type="email" name="email" placeholder="e.g. emre@alumni.com" required>
              </div>
              <div>
                <label>Password</label>
                <input type="password" name="password" placeholder="••••••" required>
              </div>
              <div>
                <label>Phone</label>
                <input type="text" name="phone" placeholder="e.g. 555-0003">
              </div>
              <button type="submit" class="btn">Add User</button>
            </form>
          </div>

          <nav>
            <a href="/">← Home</a>
            <a href="/about">About</a>
            <a href="/api/users">API (JSON)</a>
            <a href="/api/health">Health</a>
          </nav>
        </div>

        <script>
          document.getElementById('addForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const form = e.target;
            const data = {
              username: form.username.value,
              email: form.email.value,
              password: form.password.value,
              phone: form.phone.value
            };
            try {
              const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });
              if (res.ok) {
                document.getElementById('success').style.display = 'block';
                setTimeout(() => location.reload(), 1000);
              }
            } catch (err) {
              alert('Error: ' + err.message);
            }
          });
        </script>
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

module.exports = router;
