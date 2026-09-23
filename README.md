# Alumni

A web application for tracking university graduates. Manages alumni contact information, graduation years, and career details.

## What Does the System Do?

- Create, list, update, and delete alumni records (CRUD)
- Filter alumni by department, graduation year, and other criteria
- Serve data through a RESTful API

## Technology Choices

| Technology | Choice | Why? |
|------------|--------|------|
| **Back-end Language** | Node.js (Express) | Large JavaScript ecosystem, enables rapid prototyping, rich package support via npm |
| **Database** | MySQL | Suitable for relational data structures (alumni ↔ department relationships), widely used and easy to learn |
| **Container** | Docker Compose | Brings the entire system up with a single command |

## How to Run

One command is all you need:

```bash
docker compose up
```

The application will start running at `http://localhost:3000`.

## Project Structure

```
alumni/
├── docker-compose.yml    # Defines services (app + db)
├── Dockerfile            # Node.js application image
├── package.json          # Dependencies
├── .env.example          # Environment variables example
├── src/
│   ├── index.js          # Express server & API routes
│   └── db.js             # MySQL connection settings
└── init.sql              # Database initial schema
```

## API Endpoints

| Method | Path              | Description         |
|--------|-------------------|---------------------|
| GET    | `/api/alumni`     | List all alumni     |
| GET    | `/api/alumni/:id` | Get a single alumni |
| POST   | `/api/alumni`     | Add a new alumni    |
| PUT    | `/api/alumni/:id` | Update an alumni    |
| DELETE | `/api/alumni/:id` | Delete an alumni    |