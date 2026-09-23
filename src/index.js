const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ana sayfa
app.get('/', (req, res) => {
  res.json({ message: 'Alumni API çalışıyor 🎓' });
});

// Tüm mezunları listele
app.get('/api/alumni', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM alumni ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Tek mezun getir
app.get('/api/alumni/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM alumni WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Mezun bulunamadı' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Yeni mezun ekle
app.post('/api/alumni', async (req, res) => {
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

// Mezun güncelle
app.put('/api/alumni/:id', async (req, res) => {
  try {
    const { first_name, last_name, email, department, graduation_year } = req.body;
    const [result] = await pool.query(
      'UPDATE alumni SET first_name = ?, last_name = ?, email = ?, department = ?, graduation_year = ? WHERE id = ?',
      [first_name, last_name, email, department, graduation_year, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Mezun bulunamadı' });
    res.json({ id: parseInt(req.params.id), ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mezun sil
app.delete('/api/alumni/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM alumni WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Mezun bulunamadı' });
    res.json({ message: 'Mezun silindi' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🎓 Alumni API http://localhost:${PORT} adresinde çalışıyor`);
});
