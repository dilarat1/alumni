const express = require('express');
const cors = require('cors');
const path = require('path');

const loggerMiddleware = require('./middlewares/logger');
const notFoundGuardian = require('./middlewares/notFoundGuardian');
const errorGuardian = require('./middlewares/errorGuardian');

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

// Step 3: Logger Middleware (runs first on every request)
app.use(loggerMiddleware);

// Core Middlewares
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

// Step 4 & Step 7: 404 Guardian Middleware (Unmatched routes -> 404 JSON with reason or redirect to /404)
app.use(notFoundGuardian);

// Step 5 & Step 6: 5xx Guardian Middleware (Global error handler -> logs/error.logs)
app.use(errorGuardian);

app.listen(PORT, () => {
  console.log(`🎓 Alumni API & MVC App running at http://localhost:${PORT}`);
});
