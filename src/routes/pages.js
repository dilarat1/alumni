const express = require('express');
const router = express.Router();

// GET / → main page (Designed on temporary branch - Step 1)
router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Alumni Portal - Homepage (Temporary Branch Design)</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8fafc; color: #1e293b; }
          header { background: linear-gradient(135deg, #1e3a8a, #3b82f6); color: white; padding: 48px 24px; text-align: center; }
          header h1 { font-size: 36px; margin-bottom: 12px; }
          header p { font-size: 18px; opacity: 0.9; }
          nav { background: white; padding: 16px; display: flex; justify-content: center; gap: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); flex-wrap: wrap; }
          nav a { text-decoration: none; color: #1e3a8a; font-weight: 600; padding: 8px 14px; border-radius: 6px; }
          nav a:hover { background: #eff6ff; }
          .container { max-width: 960px; margin: 40px auto; padding: 0 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
          .card { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .card h3 { margin-bottom: 8px; color: #1e3a8a; }
          .card p { font-size: 14px; color: #64748b; margin-bottom: 16px; }
          .card a { color: #2563eb; text-decoration: none; font-weight: 600; font-size: 14px; }
        </style>
      </head>
      <body>
        <header>
          <h1>🎓 University Alumni System</h1>
          <p>Connect with graduates, explore career opportunities, and stay updated with campus announcements.</p>
        </header>
        <nav>
          <a href="/users">Users</a>
          <a href="/announcements">Announcements</a>
          <a href="/job-postings">Job Postings</a>
          <a href="/applications">Applications</a>
          <a href="/api/swagger">Swagger Docs</a>
          <a href="/about">About</a>
          <a href="/api/health">API Health</a>
        </nav>
        <div class="container">
          <div class="card">
            <h3>👥 Users Directory</h3>
            <p>Manage registered alumni and user accounts.</p>
            <a href="/users">Open Users →</a>
          </div>
          <div class="card">
            <h3>📢 Announcements</h3>
            <p>Read and publish institutional announcements and events.</p>
            <a href="/announcements">Open Announcements →</a>
          </div>
          <div class="card">
            <h3>💼 Job Postings</h3>
            <p>Browse open roles shared by alumni and partner companies.</p>
            <a href="/job-postings">Open Job Postings →</a>
          </div>
          <div class="card">
            <h3>📋 Applications</h3>
            <p>Track candidate job applications and review statuses.</p>
            <a href="/applications">Open Applications →</a>
          </div>
        </div>
      </body>
    </html>
  `);
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

// GET /about → about page
router.get('/about', (req, res) => {
  res.send(`
    <html>
      <head><title>About - Alumni</title></head>
      <body>
        <h1>About</h1>
        <p>Alumni tracking system built with Node.js (Express) and MySQL.</p>
        <a href="/">← Back to Home</a>
      </body>
    </html>
  `);
});

// GET /404 → Generic 404 page (Step 7)
router.get('/404', (req, res) => {
  const from = req.query.from || null;
  const reason = req.query.reason || 'The requested page or resource does not exist.';
  res.status(404).render('404', { from, reason });
});

module.exports = router;
