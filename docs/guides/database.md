# **Database Design & Query Optimization**

## **Database Design (PostgreSQL)**

The Candidate Hub API uses **PostgreSQL** as the primary relational database, with **Prisma** **ORM** for schema management and query building with features like **caching**

### **Schema Design**

1. **Candidate**
    - Stores candidate **information**.
    - Uses **indexes** on `email` for fast lookup and uniqueness.
    - In Prisma schema, it looks like:**:**
        
        ```
        model Candidate {
            id            String   @id @default(uuid())
            firstName     String
            lastName      String
            email         String   @unique
            phoneNumber   String
            preferredTime String
            linkedinUrl   String
            githubUrl     String?
            comment       String?
            createdAt     DateTime @default(now())
            updatedAt     DateTime @updatedAt
        
            @@map("candidates")
        }
        
        ```
        

### Database Optimization Techniques

**Caching with Redis**

- Frequently accessed queries are **cached** in **Redis**.

**Write-Optimized Indexing**

- Avoid **excessive indexes**, balancing **read & write performance**.

---

## **Redis Caching & Performance Optimization**

### **Implemented Optimizations**

**API Caching with Redis**

- Example: Cache `GET /candidates` for **1h**:

**Cache Invalidation**

- When a candidate is updated  **remove the cache**:

**Background Job Processing with BullMQ**

- Sends async sends emails after receiving applications from candidates. :

```
await mailQueue.add("CandidateEvent", {
        type: "Receive_Application",
        firstName: candidate.firstName,
        email: candidate.email,
    });

```

---