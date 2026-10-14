# Alumni Management System

A web application for university alumni, users, and announcements tracking built with **Express.js**, **EJS**, **MySQL**, and **Docker**.

> 📄 **Data Design Documentation:** See the full [Data Design Documentation (DDD.md)](./DDD.md) for detailed schema specifications, ERD, and data dictionary.
> 🔑 **Environment Configuration:** See [.example.env](./.example.env) for required environment variables.

---

## 🏛️ MVC Architecture Documentation

The project strictly follows the **Model-View-Controller (MVC)** architectural design pattern to ensure clean separation of concerns between business logic, presentation, and routing.

```
alumni/
├── docker-compose.yml             # Container orchestration (App & MySQL)
├── Dockerfile                     # Node.js Alpine runtime image
├── package.json                   # Dependencies (express, ejs, swagger-ui-express, mysql2, cors)
├── init.sql                       # Database initial schema & seeds
├── src/
│   ├── index.js                   # Application entry point, view engine setup, middleware & routing
│   ├── db.js                      # MySQL connection pool
│   ├── swagger.json               # OpenAPI 3.0 specification for API & Views
│   │
│   ├── models/                    # 📦 MODEL LAYER (Business Logic & Data Storage)
│   │   ├── User.js                # User model (In-memory CRUD without database connection)
│   │   └── Announcement.js        # Announcement model (In-memory CRUD without database connection - Homework)
│   │
│   ├── views/                     # 👁️ VIEW LAYER (User Interface Templates)
│   │   ├── users/
│   │   │   └── index.ejs          # EJS template for Users listings, create form, edit & delete
│   │   └── announcements/
│   │       └── index.ejs          # EJS template for Announcements management interface (Homework)
│   │
│   ├── controllers/               # ⚙️ CONTROLLER LAYER (Request Handling & Coordination)
│   │   ├── UserController.js              # Web view controller for /users
│   │   ├── ApiUserController.js          # REST API controller for /api/users
│   │   ├── AnnouncementController.js      # Web view controller for /announcements (Homework)
│   │   └── ApiAnnouncementController.js  # REST API controller for /api/announcements (Homework)
│   │
│   └── routes/                    # 🛣️ ROUTE LAYER (URL mapping to Controllers)
│       ├── userRoutes.js          # Web routes for /users (View layer)
│       ├── apiUserRoutes.js      # REST API routes for /api/users (JSON)
│       ├── announcementRoutes.js  # Web routes for /announcements (View layer - Homework)
│       ├── apiAnnouncementRoutes.js # REST API routes for /api/announcements (JSON - Homework)
│       ├── pages.js               # General web routes (/, /about, /hello, /sum)
│       └── api.js                 # API mounting & Swagger documentation router
```

### Detailed Layer Descriptions

#### 1. Model Layer (`src/models/`)
- **`User.js`**: Implements complete in-memory CRUD operations (`getAll`, `getById`, `create`, `update`, `patch`, `delete`) without database dependency.
- **`Announcement.js`** *(Homework)*: Implements complete in-memory CRUD operations (`getAll`, `getById`, `create`, `update`, `patch`, `delete`) for campus & alumni announcements.

#### 2. Controller Layer (`src/controllers/`)
- **`UserController.js`**: Handles user web views; fetches data from `UserModel` and renders `views/users/index.ejs`.
- **`ApiUserController.js`**: Handles JSON API endpoints for user management; interacts with `UserModel` and returns standard HTTP responses (`200 OK`, `201 Created`, `404 Not Found`).
- **`AnnouncementController.js`** *(Homework)*: Handles announcement web views and form submissions, rendering `views/announcements/index.ejs`.
- **`ApiAnnouncementController.js`** *(Homework)*: Handles JSON API CRUD operations on announcements.

#### 3. View Layer (`src/views/`)
- **`users/index.ejs`**: Server-side rendered interface displaying users in a table, an "Add User" form (Create), an edit modal (Update), and delete action (Delete).
- **`announcements/index.ejs`** *(Homework)*: Management interface displaying categorized announcements, a "Post Announcement" form (Create), an inline update modal (Update), and delete action (Delete).

#### 4. Route Layer (`src/routes/`)
- Maps incoming HTTP requests to their corresponding controller methods. Each domain has separate view routes and API routes.

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
| GET | `/announcements` | **Announcements Management Interface (Homework)** |
| POST | `/announcements` | Create announcement from HTML form |
| POST | `/announcements/:id/update` | Update announcement from HTML form |
| POST | `/announcements/:id/delete` | Delete announcement from HTML form |
| GET | `/hello` | Hello, World! greeting |
| GET | `/hello/:name` | Dynamic greeting (e.g. `/hello/emre`) |
| GET | `/sum/:n1/:n2` | Sum calculator (e.g. `/sum/10/20` → 30) |
| GET | `/about` | About system page |

### 2. Swagger Documentation
| Method | Route | Description |
|---|---|---|
| GET | `/api/swagger` | **Interactive Swagger UI (OpenAPI 3.0)** |
| GET | `/api/swagger.json` | OpenAPI JSON schema |

### 3. REST API Endpoints (JSON / Postman / Swagger)

#### Users API (`/api/users`)
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Full update (all fields required)
- `PATCH /api/users/:id` - Partial update (only sent fields)
- `DELETE /api/users/:id` - Delete user

#### Announcements API (`/api/announcements` - Homework)
- `GET /api/announcements` - List all announcements
- `GET /api/announcements/:id` - Get announcement by ID
- `POST /api/announcements` - Create announcement
- `PUT /api/announcements/:id` - Full update announcement
- `PATCH /api/announcements/:id` - Partial update announcement
- `DELETE /api/announcements/:id` - Delete announcement

#### System & Alumni
- `GET /api/health` - Server uptime & database health check
- `GET /api/alumni` - Alumni listings