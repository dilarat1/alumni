# Alumni

A web application for tracking university graduates and system users. Manages alumni contact information, graduation years, and user accounts.

## What Does the System Do?

- **Web Interface:** Interactive and styled web pages for viewing users and testing navigation.
- **Users Management:** Full CRUD operations (GET, POST, PUT, PATCH, DELETE) with MySQL storage.
- **Alumni Management:** Track alumni records, departments, and graduation years.
- **Health Check:** Live monitoring of API and database status.
- **RESTful API:** Clean separation between web pages (`/users`, `/about`) and JSON API endpoints (`/api/...`).

## Technology Choices

| Technology | Choice | Why? |
|------------|--------|------|
| **Back-end Language** | Node.js (Express) | Large JavaScript ecosystem, enables rapid prototyping, modular routing |
| **Database** | MySQL | Robust relational database, ideal for users and alumni relationships |
| **Container** | Docker Compose | Single-command deployment (`docker compose up`) with health checks |

## How to Run

One command brings up both the Express app and the MySQL database:

```bash
docker compose up
```

The application will start running at `http://localhost:3000`.

## Project Structure

```
alumni/
├── docker-compose.yml    # Orchestrates Express app & MySQL services
├── Dockerfile            # Container configuration for Node.js
├── package.json          # Node dependencies
├── init.sql              # Database schema & sample seed data
├── src/
│   ├── index.js          # App entry point & router mounting
│   ├── db.js             # MySQL connection pool
│   └── routes/
│       ├── pages.js      # Web pages (/, /about, /hello, /sum)
│       ├── users.js      # Styled web interface for /users
│       └── api.js        # JSON API routes (/api/health, /api/users, /api/alumni)
```

---

## Endpoints

### 🌐 Web Pages (Browser)

| Method | Path | Description |
|---|---|---|
| GET | `/` | Home page |
| GET | `/users` | Styled web interface displaying registered users + quick add form |
| GET | `/about` | About page |
| GET | `/hello` | Returns "Hello, World!" |
| GET | `/hello/:name` | Dynamic greeting (e.g. `/hello/emre` → "Hello, Emre!") |
| GET | `/sum/:n1/:n2` | Calculates sum of two numbers (e.g. `/sum/10/25` → 35) |

### 📮 API Endpoints (Postman / JSON)

#### API Documentation (Swagger)
| Method | Path | Description |
|---|---|---|
| GET | `/api/swagger` | Interactive Swagger UI API documentation |
| GET | `/api/swagger.json` | OpenAPI 3.0 JSON specification |

#### Health Check
| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Returns server uptime & database connection status |

#### Users API (`/api/users`)
| Method | Path | Description | Sample Body |
|---|---|---|---|
| GET | `/api/users` | List all users | - |
| GET | `/api/users/:id` | Get single user by ID | - |
| POST | `/api/users` | Create new user | `{"username":"emre","email":"emre@alumni.com","password":"123","phone":"555-0001"}` |
| PUT | `/api/users/:id` | Full update (requires all fields) | `{"username":"emre_new","email":"emre@alumni.com","password":"123","phone":"555-9999"}` |
| PATCH | `/api/users/:id` | Partial update (updates only provided fields) | `{"phone":"555-8888"}` |
| DELETE | `/api/users/:id` | Delete user by ID | - |

#### Alumni API (`/api/alumni`)
| Method | Path | Description |
|---|---|---|
| GET | `/api/alumni` | List all alumni records |
| GET | `/api/alumni/:id` | Get single alumni by ID |
| POST | `/api/alumni` | Add new alumni record |
| PUT | `/api/alumni/:id` | Update alumni record |
| DELETE | `/api/alumni/:id` | Delete alumni record |