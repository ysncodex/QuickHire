# QuickHire – MERN Job Portal

QuickHire is a modern, production-ready job portal built with the MERN stack. It connects employers and job seekers through a dynamic frontend and a secure, validated backend API.

### 👨‍💼 For Candidates

- Browse job listings instantly
- Real-time filtering (category, keyword, location)
- Apply seamlessly without page reloads
- Fully responsive across devices

### 🛠️ For Administrators

- Full CRUD operations for job listings
- Instant UI updates with asynchronous feedback
- Clean and intuitive management interface

## Tech Stack

| Frontend                                               | Backend                          |
| ------------------------------------------------------ | -------------------------------- |
| React, Vite, Tailwind, Zustand, React Hook Form, Axios | Node, Express, MongoDB, Mongoose |

## Structure

```
quick-hire/
├── frontend/   → React app (src/components, pages, services, store)
├── backend/    → Express API (config, controllers, models, routes)
└── README.md
```

## Setup

**Prerequisites:** Node 18+, MongoDB (local or [Atlas](https://www.mongodb.com/cloud/atlas)).

**Backend**

```bash
cd backend && npm install
cp .env.example .env   # set PORT, MONGO_URI
npm run dev
```

**Frontend** (new terminal)

```bash
cd frontend && npm install
cp .env.example .env   # set VITE_API_URL=http://localhost:5000/api
npm run dev
```

App: **http://localhost:5173** · API: **http://localhost:5000**

## API

| Service      | Method | Endpoint            | Description        |
| ------------ | ------ | ------------------- | ------------------ |
| Jobs         | GET    | `/api/jobs`         | List jobs          |
| Jobs         | GET    | `/api/jobs/:id`     | Get job            |
| Jobs         | POST   | `/api/jobs`         | Create job         |
| Jobs         | DELETE | `/api/jobs/:id`     | Delete job         |
| Applications | POST   | `/api/applications` | Submit application |

Details: [backend/README.md](backend/README.md)

---

**Md Yeasin** · Full-Stack (React | Node | MongoDB)
