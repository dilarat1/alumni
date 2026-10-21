const express = require('express');
const cors = require('cors');
const path = require('path');

const pageRoutes = require('./routes/pages');
const userRoutes = require('./routes/userRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const jobPostingRoutes = require('./routes/jobPostingRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup View Engine (EJS - MVC View Layer)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Web Page Routes (View Layer)
app.use('/', pageRoutes);
app.use('/users', userRoutes);
app.use('/announcements', announcementRoutes);
app.use('/job-postings', jobPostingRoutes);
app.use('/applications', applicationRoutes);

// API Endpoints (JSON / Swagger Layer)
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`🎓 Alumni API & MVC App running at http://localhost:${PORT}`);
});
