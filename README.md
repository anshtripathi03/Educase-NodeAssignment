# 🏫 School Management API

A production-ready REST API to manage schools and fetch them based on proximity.

---

## 🚀 Tech Stack

Node.js · Express.js · MySQL (Railway) · Joi · MVC Architecture

---

## ✨ Features

* ➕ Add schools
* 📍 List schools sorted by distance (Haversine)
* 📄 Pagination support
* ✅ Input validation
* ⚠️ Centralized error handling
* 🌐 Deployed on Railway

---

## 🔗 Live API

https://educase-nodeassignment-production.up.railway.app

---

## 📬 Endpoints

### Health Check

GET /health

---

### Add School

POST /addSchool

```json
{
  "name": "Delhi Public School",
  "address": "Mathura Road, New Delhi",
  "latitude": 28.61,
  "longitude": 77.23
}
```

---

### List Schools

GET /listSchools?latitude=28.6&longitude=77.2&page=1&limit=10

---

## 📐 Core Logic

Schools are sorted using the **Haversine formula** to calculate distance between coordinates.

---

## ⚙️ Run Locally

```bash
git clone <repo-url>
cd school-management-api
npm install
npm run dev
```

---

## 👨‍💻 Author

Ansh Tripathi
