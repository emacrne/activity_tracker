# Activity Log

Simple activity tracking app (React + Vite frontend, Spring Boot backend, H2 database).

**Tech stack**
- Backend: Java 17, Spring Boot 4, Spring Data JPA, H2, Maven
- Frontend: React, Vite, Redux Toolkit, axios, date-fns

## Quickstart

Requirements:
- Java 17 and Maven
- Node 16+ and npm

1. Start backend:

```bash
cd backend
mvn spring-boot:run
```

- Backend runs on `http://localhost:8080` by default.
- H2 is configured in file mode; DB files are stored in `backend/data/`
  
2. Start frontend:

```bash
cd frontend
npm install
npm start
```

- Frontend dev server (Vite) runs on `http://localhost:5173`
- Frontend proxies API calls to `/api/activities` 

## API
Base: `/api/activities`

- GET `/api/activities` — list activities
- GET `/api/activities/{id}` — get single activity
- POST `/api/activities` — create activity 
- PUT `/api/activities/{id}` — update activity 
- DELETE `/api/activities/{id}` — delete activity
