const express = require('express');
const router = express.Router();

// GET / → main page
router.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Alumni</title></head>
      <body>
        <h1>Alumni System</h1>
        <p>Welcome to the Alumni tracking system.</p>
        <nav>
          <a href="/users">Users</a> |
          <a href="/hello">Hello</a> |
          <a href="/about">About</a> |
          <a href="/api/health">API Health</a>
        </nav>
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

module.exports = router;
