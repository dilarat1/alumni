# Alumni Management System

A web application for university alumni, users, career opportunities, and announcements tracking built with **Express.js**, **EJS**, **MySQL**, and **Docker**.

> 🏷️ **Brand Identity (`brand.md`):** See [brand.md](./brand.md) ([Section Anchor: #brand-md](#brand-md)) for brand mission, target personas, voice & tone, and visual identity guidelines.
> 🎨 **Design System (`DESIGN.md`):** See [DESIGN.md](./DESIGN.md) / [design.md](./design.md) ([Section Anchor: #design-md](#design-md)) — structured following [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) & [styles.refero.design](https://styles.refero.design) — for color tokens, typography, component styling, and layout principles.
> 📄 **Data Design Documentation (`DDD.md`):** See the full [Data Design Documentation (DDD.md)](./DDD.md) for detailed schema specifications, ERD, and validation rules.
> 🔑 **Environment Configuration:** See [.example.env](./.example.env) for required environment variables.

---

## 🎨 Brand Identity & Design System

<a id="brand-md"></a>
### 1. Brand Guidelines — [brand.md](./brand.md)
Defines the **AlumniConnect** brand identity, mission, vision, graduate & recruiter personas, editorial voice, and brand color signature.
- 👉 **Read full document:** [<a href="./brand.md">brand.md</a>](./brand.md)

<a id="design-md"></a>
### 2. Design System Specification — [DESIGN.md](./DESIGN.md)
Built on the 9-section AI-native design specification from **[github.com/VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)** and visual references from **[styles.refero.design](https://styles.refero.design)**:
1. **Visual Theme & Atmosphere:** Editorial SaaS & Academic Precision (`#F8FAFC` Alabaster canvas, `#FFFFFF` cards, frosted-glass sticky topbar).
2. **Color Palette & Roles:** Bosphorus Obsidian (`#0F172A`), Academic Royal Indigo (`#4F46E5`), Bosphorus Cyan (`#0284C7`), Campus Emerald (`#059669`), Heritage Amber (`#D97706`), Crimson Rose (`#E11D48`).
3. **Typography Rules:** `Plus Jakarta Sans` (Display/Headings), `Inter` (Body/UI), `JetBrains Mono` (IDs, routes, timestamps).
4. **Component Stylings, Layout Principles, Depth & Elevation, Do's/Don'ts, Responsive Behavior & Agent Prompt Guide.**
- 👉 **Read full document:** [<a href="./DESIGN.md">DESIGN.md</a>](./DESIGN.md) | [<a href="./design.md">design.md</a>](./design.md)

---

## 🏛️ MVC Architecture Documentation

The project strictly follows the **Model-View-Controller (MVC)** architectural design pattern to ensure clean separation of concerns between business logic, presentation, and routing.

```
alumni/
├── docker-compose.yml             # Container orchestration (App & MySQL)
├── Dockerfile                     # Node.js Alpine runtime image
├── package.json                   # Dependencies (express, ejs, swagger-ui-express, mysql2, cors)
├── init.sql                       # Database initial schema & seeds
├── brand.md                       # Brand identity, mission, personas & voice guidelines
├── DESIGN.md                      # UI/UX Design System (VoltAgent/awesome-design-md & Refero Design)
├── DDD.md                         # Data Design Documentation, ERD & Domain Validation Rules
├── logs/
│   └── error.logs                 # Persistent 4xx/5xx error log file
├── migrations/                    # Versioned SQL migrations (001 through 007)
├── src/
│   ├── index.js                   # Application entry point, middleware pipeline & routing
│   ├── db.js                      # MySQL connection pool
│   ├── migrate.js                 # Database migration runner
│   ├── seed.js                    # Database factory seeder
│   ├── swagger.json               # OpenAPI 3.0 specification for API & Views
│   │
│   ├── middlewares/               # 🛡️ MIDDLEWARE LAYER (Logging, Validation & Guardians)
│   │   ├── logger.js              # Terminal request logger (time method route restype duration)
│   │   ├── validate.js            # Domain validation rules (JobPosting & User rules)
│   │   ├── notFoundGuardian.js    # 404 Guardian (404 JSON with reason & /404 web redirect)
│   │   ├── errorGuardian.js       # 5xx Guardian (Global error handler & duplicate/JSON handler)
│   │   └── fileLogger.js          # Appends error records & stack traces to logs/error.logs
│   │
│   ├── models/                    # 📦 MODEL LAYER (Business Logic & MySQL Data Storage)
│   │   ├── User.js                # User model + 1:N getJobs relation
│   │   ├── Announcement.js        # Announcement model
│   │   ├── JobPosting.js          # JobPosting model + 1:N getApplications relation
│   │   └── Application.js         # Application model + N:1 JobPosting relation
│   │
│   ├── views/                     # 👁️ VIEW LAYER (User Interface Templates)
│   │   ├── 404.ejs                # Generic 404 Not Found page (target of invalid web redirects)
│   │   ├── users/
│   │   │   └── index.ejs          # EJS template for Users management
│   │   ├── announcements/
│   │   │   └── index.ejs          # EJS template for Announcements management
│   │   ├── job-postings/
│   │   │   ├── index.ejs          # EJS template for Job Postings list & creation
│   │   │   └── detail.ejs         # EJS template for Job detail & nested application form
│   │   └── applications/
│   │       └── index.ejs          # EJS template for Applications review dashboard
│   │
│   ├── controllers/               # ⚙️ CONTROLLER LAYER (Request Handling & Coordination)
│   │   ├── UserController.js              # Web view controller for /users
│   │   ├── ApiUserController.js          # REST API controller for /api/users & /api/users/:id/jobs
│   │   ├── AnnouncementController.js      # Web view controller for /announcements
│   │   ├── ApiAnnouncementController.js  # REST API controller for /api/announcements
│   │   ├── JobPostingController.js        # Web view controller for /job-postings
│   │   ├── ApiJobPostingController.js    # REST API controller for /api/job-postings
│   │   ├── ApplicationController.js       # Web view controller for /applications
│   │   └── ApiApplicationController.js   # REST API controller for /api/applications
│   │
│   └── routes/                    # 🛣️ ROUTE LAYER (URL mapping to Controllers)
│       ├── userRoutes.js          # Web routes for /users
│       ├── apiUserRoutes.js       # REST API routes for /api/users & nested /:id/jobs
│       ├── announcementRoutes.js  # Web routes for /announcements
│       ├── apiAnnouncementRoutes.js # REST API routes for /api/announcements
│       ├── jobPostingRoutes.js    # Web routes for /job-postings
│       ├── apiJobPostingRoutes.js # REST API routes for /api/job-postings & nested applications
│       ├── applicationRoutes.js   # Web routes for /applications
│       ├── apiApplicationRoutes.js# REST API routes for /api/applications
│       ├── pages.js               # General web routes (/, /about, /hello, /sum, /404)
│       └── api.js                 # API mounting & Swagger documentation router
```

### Detailed Layer Descriptions

#### 1. Model Layer (`src/models/`)
- **`User.js`**: Connected directly to MySQL via connection pool. Implements complete asynchronous CRUD operations (`getAll`, `getById`, `create`, `update`, `patch`, `delete`).
- **`Announcement.js`**: Connected directly to MySQL via connection pool. Implements complete asynchronous CRUD operations (`getAll`, `getById`, `create`, `update`, `patch`, `delete`) for campus & alumni bulletins.
- **`JobPosting.js`**: Manages career vacancies, company details, salaries, and 1:N relations with `applications`.
- **`Application.js`**: Manages candidate submissions, status tracking (`Pending`, `Reviewing`, `Accepted`, `Rejected`), and belongsTo relation with `job_postings`.

#### 2. Controller Layer (`src/controllers/`)
- **`UserController.js`**: Asynchronously handles user web views; queries `UserModel` (MySQL) and renders `views/users/index.ejs`.
- **`ApiUserController.js`**: Asynchronously handles JSON API endpoints for user management; queries `UserModel` (MySQL) and returns standard HTTP responses (`200 OK`, `201 Created`, `404 Not Found`).
- **`AnnouncementController.js`**: Asynchronously handles announcement web views and form submissions, rendering `views/announcements/index.ejs` from MySQL.
- **`ApiAnnouncementController.js`**: Asynchronously handles JSON API CRUD operations on announcements backed by MySQL.
- **`JobPostingController.js`**: Handles job postings web views, posting forms, and detail views with applicant submissions.
- **`ApiJobPostingController.js`**: Handles direct JSON API CRUD operations for job postings and nested routes for candidate applications.
- **`ApplicationController.js`**: Handles candidate applications dashboard and status transitions.
- **`ApiApplicationController.js`**: Handles direct JSON API CRUD operations for candidate applications.

#### 3. View Layer (`src/views/`)
- **`users/index.ejs`**: Server-side rendered interface displaying users in a table, an "Add User" form, an edit modal, and delete action.
- **`announcements/index.ejs`**: Management interface displaying categorized announcements, a "Post Announcement" form, and update/delete actions.
- **`job-postings/index.ejs`**: Career opportunities interface displaying active job openings with company and salary badges, plus a "Post a Job" form.
- **`job-postings/detail.ejs`**: Detailed job description, "Submit Application" form, and a table of candidate applications received for that specific job.
- **`applications/index.ejs`**: Master candidate applications dashboard with job references, CV links, cover letters, and live status transition controls.

#### 4. Route Layer (`src/routes/`)
- Maps incoming HTTP requests to their corresponding controller methods. Covers direct routes, nested routes (`/api/users/:id/jobs`, `/api/job-postings/:jobPostingId/applications`), and server-side view routes.

#### 5. Middleware & Guardian Layer (`src/middlewares/`)
- **`logger.js`**: Terminal Logger Middleware writing every request in `time method route restype duration` format (`10:20:30 POST /api/users 201 18ms`).
- **`validate.js`**: Request body validation middleware enforcing domain rules (`JobPosting`: `title` required & max 120 chars, `company` required, `city` and `description` optional; `User`: `username` required, valid `email` format).
- **`notFoundGuardian.js`**: 404 Guardian Middleware returning structured `404` JSON responses with a `reason` for API routes and redirecting invalid browser requests to `/404`.
- **`errorGuardian.js`**: 5xx Guardian Middleware catching runtime/database errors (`500`), duplicate key conflicts (`409`), and malformed JSON payloads (`400`).
- **`fileLogger.js`**: Writes all `4xx` and `5xx` error entries and stack traces to `logs/error.logs`.

---

## 🚀 How to Run

Run the entire application with a single command:

```bash
docker compose up --build
```

The application will be available at: **`http://localhost:3000`**

### 🔄 Database Migrations

Run database migrations at any time to keep the schema up to date:

```bash
# Inside docker container:
docker compose exec app npm run migrate

# Or directly locally:
npm run migrate
```

Migration files located in `migrations/`:
- `001_create_alumni_table.sql`
- `002_create_users_table.sql`
- `003_create_announcements_table.sql`
- `004_create_job_postings_table.sql`
- `005_create_applications_table.sql`
- `006_add_user_id_to_job_postings.sql`
- `007_update_job_postings_rules.sql`

### 🌱 Database Seeding & Factory Pattern

Populate the database with realistic mock data using dedicated **Factory classes**:

```bash
# Inside docker container:
docker compose exec app npm run seed

# Or directly locally:
npm run seed
```

**Factory Classes (`src/factories/`):**
- `UserFactory.js`: Generates random user accounts with usernames, emails, and phone numbers.
- `AlumniFactory.js`: Generates alumni records with departments and graduation years.
- `AnnouncementFactory.js`: Generates campus bulletins with categories and issuing offices.
- `JobPostingFactory.js`: Generates realistic job vacancies with tech employers (Trendyol, Getir, Hepsiburada, Baykar, etc.).
- `ApplicationFactory.js`: Generates candidate job applications with CV links, cover letters, and review statuses.

---

## 🌐 Endpoints & Pages

### 1. View Layer (Web Interfaces in Browser)
| Method | Route | Description |
|---|---|---|
| GET | `/` | Home page with navigation links |
| GET | `/users` | **Users Management Interface (MVC View Layer)** |
| POST | `/users` | Create user from HTML form |
| POST | `/users/:id/update` | Update user from HTML form |
| POST | `/users/:id/delete` | Delete user from HTML form |
| GET | `/announcements` | **Announcements Management Interface** |
| POST | `/announcements` | Create announcement from HTML form |
| POST | `/announcements/:id/update` | Update announcement from HTML form |
| POST | `/announcements/:id/delete` | Delete announcement from HTML form |
| GET | `/job-postings` | **Job Postings & Career Opportunities (List + Form)** |
| GET | `/job-postings/:id` | **Job Detail View + Nested Application Form + Applicants** |
| POST | `/job-postings` | Create job posting from HTML form |
| POST | `/job-postings/:id/apply` | Submit application for this job posting |
| POST | `/job-postings/:id/delete` | Delete job posting |
| GET | `/applications` | **Candidate Applications Dashboard (Review Pipeline)** |
| POST | `/applications/:id/status` | Update candidate application status |
| POST | `/applications/:id/delete` | Delete candidate application |
| GET | `/404` | **Generic 404 Not Found Page (Target of invalid browser route redirects)** |
| GET | `/hello` | Hello, World! greeting |
| GET | `/hello/:name` | Dynamic greeting (e.g. `/hello/emre`) |
| GET | `/sum/:n1/:n2` | Sum calculator (e.g. `/sum/10/20` → 30) |
| GET | `/about` | About system page |

### 2. Swagger Documentation
| Method | Route | Description |
|---|---|---|
| GET | `/api/swagger` | **Interactive Swagger UI (OpenAPI 3.0)** |
| GET | `/api/swagger.json` | OpenAPI JSON schema |

### 3. REST API Endpoints (Direct & Nested)

#### Job Postings API (`/api/job-postings` & `/api/jobs`)
- `GET /api/job-postings` - List all job postings
- `GET /api/job-postings/:id` - Get single job posting
- `POST /api/job-postings` - Create new job posting (`title` required & max 120 chars, `company` required, `city` & `description` optional)
- `PUT /api/job-postings/:id` - Full update job posting
- `PATCH /api/job-postings/:id` - Partial update job posting
- `DELETE /api/job-postings/:id` - Delete job posting

#### Nested Applications API (`/api/job-postings/:jobPostingId/applications`)
- `GET /api/job-postings/:jobPostingId/applications` - **Nested:** List all applications for a specific job posting
- `POST /api/job-postings/:jobPostingId/applications` - **Nested:** Submit application directly for a job posting

#### Direct Applications API (`/api/applications`)
- `GET /api/applications` - List all applications (supports query `?job_posting_id=:id`)
- `GET /api/applications/:id` - Get application by ID with parent job details
- `POST /api/applications` - Submit application (direct)
- `PUT /api/applications/:id` - Update application
- `PATCH /api/applications/:id` - Partial update (e.g. status transition)
- `DELETE /api/applications/:id` - Delete application

#### Users API (`/api/users`)
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Full update (all fields required)
- `PATCH /api/users/:id` - Partial update (only sent fields)
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/:id/jobs` - **Nested:** List all job postings authored by this user
- `POST /api/users/:id/jobs` - **Nested:** Create a new job posting on behalf of this user

#### Announcements API (`/api/announcements`)
- `GET /api/announcements` - List all announcements
- `GET /api/announcements/:id` - Get announcement by ID
- `POST /api/announcements` - Create announcement
- `PUT /api/announcements/:id` - Full update announcement
- `PATCH /api/announcements/:id` - Partial update announcement
- `DELETE /api/announcements/:id` - Delete announcement

#### System & Alumni
- `GET /api/health` - Server uptime & database health check
- `GET /api/alumni` - Alumni listings
- `GET /api/error-test` - Simulated 500 error route for testing the `5xx Guardian` middleware

---

## 🛡️ Validation Rules, Middlewares & Error Logging (`logs/error.logs`)

### 1. Domain Validation Rules (`JobPosting` & `User`)
- **JobPosting:**
  - `title`: **Required**, maximum **120 characters**.
  - `company`: **Required**.
  - `city` (`location`) & `description`: **Optional**.
- **User:**
  - `username`: **Required**, unique.
  - `email`: **Required**, valid email format, unique (`409 Conflict` returned on duplicate).

### 2. Terminal Logger Middleware (`src/middlewares/logger.js`)
Every HTTP request is logged to the terminal upon completion:
```text
time      method  route                         restype  duration
18:02:30  POST    /api/users/1/jobs             400      39ms
18:02:30  POST    /api/users/1/jobs             201      65ms
18:02:30  GET     /api/does-not-exist           404      2ms
18:02:30  GET     /api/error-test               500      2ms
```

### 3. 404 Guardian (`src/middlewares/notFoundGuardian.js`) & Generic `/404` Page
- **API Requests (`/api/*`):** Returns HTTP `404` JSON with an explicit `reason` field:
  ```json
  {
    "error": "Not Found",
    "status": 404,
    "reason": "The requested resource or route 'GET /api/does-not-exist' was not found on this server.",
    "method": "GET",
    "path": "/api/does-not-exist"
  }
  ```
- **Web Browser Requests:** Redirects invalid URLs (e.g. `/invalid-page`) to `/404?from=...&reason=...`, rendering `src/views/404.ejs`.

### 4. 5xx Guardian (`src/middlewares/errorGuardian.js`) & Error Log File (`logs/error.logs`)
- Catches unhandled exceptions (`500`), MySQL duplicate entry errors (`409`), and malformed JSON payloads (`400`).
- Automatically appends error details and stack traces to **`logs/error.logs`**.

### 5. Testing Invalid Requests (Postman / curl)
```bash
# 1. Missing title (400 Bad Request)
curl -X POST http://localhost:3000/api/users/1/jobs -H "Content-Type: application/json" -d '{}'

# 2. Title > 120 characters (400 Bad Request)
curl -X POST http://localhost:3000/api/job-postings -H "Content-Type: application/json" \
  -d '{"title":"This title is intentionally made much longer than one hundred and twenty characters so that the validation rule rejects it immediately with 400","company":"Acme"}'

# 3. Valid JobPosting with optional city & description omitted (201 Created)
curl -X POST http://localhost:3000/api/users/1/jobs -H "Content-Type: application/json" \
  -d '{"title":"Platform Engineer","company":"Insider"}'

# 4. 404 Guardian with reason (404 Not Found)
curl http://localhost:3000/api/does-not-exist

# 5. 5xx Guardian test (500 Internal Server Error -> logged to logs/error.logs)
curl http://localhost:3000/api/error-test
```