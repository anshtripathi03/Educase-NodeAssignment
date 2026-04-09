# 🏫 School Management API

A production-ready REST API for managing schools and retrieving them sorted by proximity using the **Haversine formula**.

Built with **Node.js · Express · MySQL · Joi** using clean MVC architecture.

---

## 📁 Project Structure

```
school-management-api/
├── src/
│   ├── config/
│   │   └── database.js        # MySQL connection pool
│   ├── controllers/
│   │   └── school.controller.js
│   ├── middlewares/
│   │   ├── errorHandler.js    # Centralised error handling
│   │   └── validate.js        # Joi validation middleware
│   ├── models/
│   │   └── school.model.js    # Data-access layer
│   ├── routes/
│   │   ├── index.js
│   │   └── school.routes.js
│   ├── services/
│   │   └── school.service.js  # Business logic
│   ├── utils/
│   │   ├── haversine.js       # Distance calculation
│   │   ├── logger.js          # Structured console logger
│   │   ├── response.js        # Standardised API responses
│   │   └── validators.js      # Joi schemas
│   ├── app.js                 # Express app factory
│   └── server.js              # Entry point
├── schema.sql                 # MySQL DDL + optional seed data
├── postman_collection.json    # Ready-to-import Postman collection
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Prerequisites

| Tool    | Minimum version |
|---------|-----------------|
| Node.js | 18.x            |
| npm     | 9.x             |
| MySQL   | 8.x             |

---

## 🚀 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/school-management-api.git
cd school-management-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` with your MySQL credentials:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_management

DB_POOL_MAX=10
DB_POOL_MIN=2
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000
```

### 4. Create the database & run schema

```bash
mysql -u root -p < schema.sql
```

Or manually in MySQL:

```sql
CREATE DATABASE school_management;
USE school_management;
-- then paste contents of schema.sql
```

### 5. Start the server

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

Server starts at: `http://localhost:3000`

---

## 📖 API Documentation

### Base URL
```
http://localhost:3000
```

---

### `GET /health`

Health check endpoint used by load balancers and deployment platforms.

**Response `200`**
```json
{
  "success": true,
  "message": "Server is healthy",
  "timestamp": "2024-06-01T12:00:00.000Z",
  "uptime": 42.5
}
```

---

### `POST /addSchool`

Add a new school to the database.

**Request Body** (`application/json`)

| Field      | Type   | Required | Constraints            |
|------------|--------|----------|------------------------|
| name       | string | ✅        | 2–255 characters       |
| address    | string | ✅        | 5–500 characters       |
| latitude   | number | ✅        | −90 to 90              |
| longitude  | number | ✅        | −180 to 180            |

**Example Request**
```json
{
  "name": "Springfield Elementary School",
  "address": "123 Main Street, Springfield, IL 62701",
  "latitude": 39.7817,
  "longitude": -89.6501
}
```

**Response `201 Created`**
```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 9
  }
}
```

**Response `400 Bad Request`**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "name",      "message": "School name is required" },
    { "field": "latitude",  "message": "Latitude must be between -90 and 90" }
  ]
}
```

---

### `GET /listSchools`

Fetch all schools sorted by distance from a given coordinate.

**Query Parameters**

| Parameter | Type   | Required | Default | Constraints       |
|-----------|--------|----------|---------|-------------------|
| latitude  | number | ✅        | —       | −90 to 90         |
| longitude | number | ✅        | —       | −180 to 180       |
| page      | number | ❌        | 1       | ≥ 1               |
| limit     | number | ❌        | 10      | 1 – 100           |

**Example Request**
```
GET /listSchools?latitude=28.6139&longitude=77.2090&page=1&limit=5
```

**Response `200 OK`**
```json
{
  "success": true,
  "message": "Schools fetched successfully",
  "data": [
    {
      "id": 1,
      "name": "Delhi Public School",
      "address": "Mathura Road, New Delhi, Delhi 110003",
      "latitude": 28.5494,
      "longitude": 77.2001,
      "distance_km": 8.07
    },
    {
      "id": 8,
      "name": "Ahmedabad Public School",
      "address": "Navrangpura, Ahmedabad, Gujarat 380009",
      "latitude": 23.0305,
      "longitude": 72.5595,
      "distance_km": 775.31
    }
  ],
  "meta": {
    "total": 8,
    "page": 1,
    "limit": 5,
    "totalPages": 2,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

**Response `400 Bad Request`**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "latitude",  "message": "Latitude query parameter is required" },
    { "field": "longitude", "message": "Longitude query parameter is required" }
  ]
}
```

---

## 📐 Haversine Formula

Distance between two points on Earth is calculated as:

```
a = sin²(Δlat/2) + cos(lat1) × cos(lat2) × sin²(Δlon/2)
c = 2 × atan2(√a, √(1−a))
d = R × c          (R = 6371 km)
```

Result is rounded to 2 decimal places and returned in kilometres.

---

## ✅ Bonus Features

| Feature | Implementation |
|---------|---------------|
| **Pagination** | `page` & `limit` query params with full `meta` object |
| **DB Indexes** | `idx_latitude`, `idx_longitude`, `idx_lat_lon` on the `schools` table |
| **Connection Pooling** | `mysql2` pool with configurable size via env vars |
| **Graceful Shutdown** | `SIGTERM` / `SIGINT` handlers close pool before exit |
| **Input Sanitisation** | `stripUnknown: true` in Joi strips extra fields |

---

## ☁️ Deployment

### Deploy to Render

1. Push code to a GitHub repository.
2. Go to [render.com](https://render.com) → **New Web Service**.
3. Connect your GitHub repo.
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables under **Environment**:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` *(Render sets this automatically)* |
| `DB_HOST` | Your MySQL host |
| `DB_USER` | Your MySQL user |
| `DB_PASSWORD` | Your MySQL password |
| `DB_NAME` | `school_management` |

7. Click **Deploy**. Render will detect `process.env.PORT` automatically.

> **Tip:** Use [PlanetScale](https://planetscale.com) or [Railway MySQL](https://railway.app) for a managed MySQL instance on Render.

---

### Deploy to Railway

1. Install the Railway CLI:
   ```bash
   npm install -g @railway/cli
   railway login
   ```

2. Initialise and deploy:
   ```bash
   railway init
   railway up
   ```

3. Add a MySQL plugin inside Railway dashboard → **New Plugin → MySQL**.

4. Set environment variables in the Railway dashboard (same keys as above).
   Railway injects `DATABASE_URL` automatically; adapt `database.js` if you prefer that format.

5. Railway automatically uses `process.env.PORT`.

---

## 🧪 Testing with Postman

1. Open Postman → **Import** → select `postman_collection.json`.
2. Set the `baseUrl` collection variable to your server URL.
3. Run requests in order: **Health Check → Add School → List Schools**.

---

## 🛠 Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | ❌ | `3000` | HTTP port |
| `NODE_ENV` | ❌ | `development` | Environment |
| `DB_HOST` | ✅ | — | MySQL host |
| `DB_PORT` | ❌ | `3306` | MySQL port |
| `DB_USER` | ✅ | — | MySQL username |
| `DB_PASSWORD` | ✅ | — | MySQL password |
| `DB_NAME` | ✅ | — | MySQL database name |
| `DB_POOL_MAX` | ❌ | `10` | Max pool connections |
| `DB_POOL_MIN` | ❌ | `2` | Min pool connections |
| `LOG_LEVEL` | ❌ | `debug`/`info` | Log verbosity |

---

## 🔒 Security Notes

- JSON body size limited to **10 KB** to prevent payload flooding.
- `X-Content-Type-Options`, `X-Frame-Options`, and `X-XSS-Protection` headers set on every response.
- Unknown request fields are stripped by Joi before reaching the database.
- Stack traces are **hidden in production** (`NODE_ENV=production`).

---

## 📄 License

MIT
