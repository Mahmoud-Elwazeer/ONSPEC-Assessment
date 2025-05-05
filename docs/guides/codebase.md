# Codebase Documentation

This document explains the structure and purpose of each folder and file in the repository.

---

## 📁 Project Structure

```
pgsql
CopyEdit
/Express/src
├── app.ts
├── server.ts
├── controllers/
├── daoLayer/
├── emailTemplates/
├── middlewares/
├── prisma/
├── queues/
├── routes/
├── services/
├── utils/
└── validations/

```

---

## 📄 Core Files

- **app.ts** → Sets up Express app, applies middlewares, routes, and error handling.
- **server.ts** → Starts the server and listens on the configured port.

---

## 📂 Folder Overview

### ✅ **controllers/**

Handles incoming requests, calls service layer, and sends responses.

- `candidate.ts` → Controller for candidate-related endpoints (create, update, get, delete).

---

### ✅ **daoLayer/**

Data Access Layer — abstracts database calls and separates DB logic from business logic.

- `candidate.ts` → Contains Prisma queries for candidate operations.

---

### ✅ **emailTemplates/**

Holds email template files.

- `candidateApplication.ejs` → EJS template for candidate application email.

---

### ✅ **middlewares/**

Custom Express middlewares.

- `errorMiddleware.ts` → Central error handler.
- `log.ts` → Logs incoming requests.
- `rateLimiter.ts` → Implements rate limiting to protect from DDoS attacks.

---

### ✅ **prisma/**

Database schema and migrations.

- `migrations/` → Database migration scripts.
- `schema/` → Prisma schema files (`candidate.prisma`, `schema.prisma`).

---

### ✅ **queues/**

Background job queues.

- `mail.ts` → BullMQ queue for sending emails asynchronously.

---

### ✅ **routes/**

Express route definitions.

- `candidate.ts` → Defines candidate-related API routes.
- `index.ts` → Entry point for all routes.

---

### ✅ **services/**

Business logic and orchestration between layers.

- `candidate.ts` → Core candidate services.
- `mail.ts` → Email sending service.
- `template.ts` → Manages email template rendering.

---

### ✅ **utils/**

Helper utilities.

- `apiError.ts` → Custom API error class.
- `prismaClient.ts` → Singleton Prisma client.
- `redis.ts` → Redis client for caching.

---

### ✅ **validations/**

Request input validation.

- `candidate.ts` → Zod schemas for candidate input validation.

---

## 💥 Flow Summary

1. **Request → Route → Controller → Service → DAO Layer → Prisma → DB**
2. **After DB save → Queue mail job → Send email asynchronously**

---

## ⚡ Best Practices Followed

- Separation of concerns across layers (Controller, Service, DAO).
- Async background jobs (BullMQ) for heavy tasks.
- Input validation using **Zod**.
- Centralized error handling.
- Environment-based configuration for scalable deployment.

---