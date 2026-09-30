const express = require('express');
const cors = require('cors');

const pageRoutes = require('./routes/pages');
const userRoutes = require('./routes/users');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Web pages
app.use('/', pageRoutes);

// Users HTML page
app.use('/users', userRoutes);

// API endpoints (JSON)
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`🎓 Alumni API http://localhost:${PORT} adresinde çalışıyor`);
});
