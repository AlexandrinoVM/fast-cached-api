# Fast Cache API

A backend API project focused on **performance, caching strategies, and concurrency handling** using Node.js, PostgreSQL, and Redis.

This project was built to study **cache-aside pattern**, **lazy loading**, **cache stampede**, and real-world performance benchmarking.

---

## 🚀 Tech Stack

* **Node.js** + **Express**
* **TypeScript**
* **PostgreSQL** (data persistence)
* **Redis** (cache layer)
* **Docker / Docker Compose**
* **Autocannon** (load testing)

---

## 🏗️ Architecture

The project follows a clean, layered architecture:

```
Controller  →  Service  →  Repository
                 ↓
              Redis Cache
                 ↓
           External API (FakeStore)
```

### Layers

* **Controller**

  * Handles HTTP requests and responses
  * Input validation and status codes

* **Service**

  * Business logic
  * Cache-aside implementation
  * Cache invalidation
  * Concurrency handling

* **Repository**

  * Direct database access (PostgreSQL)
  * SQL queries

* **External API Gateway**

  * Fetches data from FakeStore API when cache and DB miss

---

## 🧠 Caching Strategy

### Cache-Aside Pattern

1. Try to fetch data from Redis
2. If cache miss → query database
3. If DB miss → fetch from external API
4. Persist data in DB
5. Store data in Redis with TTL

```ts
// simplified flow
cache → database → external API
```

### TTL

* Cache TTL: **300 seconds**

---

## ⚠️ Cache Stampede Problem

Under high concurrency, multiple requests can try to populate the cache at the same time, causing:

* Duplicate database inserts
* High latency spikes
* External API overload

### Solution

* Redis-based locking
* Unique constraint in database
* `ON CONFLICT DO NOTHING` on inserts

---

## 📊 Performance Benchmarks

Tests executed using **Autocannon**:

```bash
npx autocannon -c 20 -d 10 http://localhost:3000/api/iten/1
```

### Redis Enabled (Cache Hot)

* **Average latency:** ~4–5 ms
* **p99 latency:** < 10 ms
* **Throughput:** ~4,000 req/s
* **Max latency:** ~30 ms

### Redis Disabled

* **Average latency:** ~7 ms
* **p99 latency:** ~14 ms
* **Throughput:** ~2,600 req/s

### Autocannon Examples

## Redis disabled

<img width="865" height="468" alt="Image" src="https://github.com/user-attachments/assets/22fecc29-b2b2-4bf1-9478-ffc8de689c20" />

## Redis on

<img width="851" height="463" alt="Image" src="https://github.com/user-attachments/assets/161aa617-fb4b-4c6c-896c-dd2b660f4e8c" />

➡️ Redis improves:

* ~40% lower latency
* ~50% higher throughput
* Much better stability under load

---

## 🧪 Cold vs Hot Cache

* **Cold cache:** possible latency spikes due to cache population and concurrency
* **Hot cache:** stable, low-latency responses

This behavior was validated by running sequential load tests.

---

## 🐳 Running the Project

```bash
docker compose up --build
```

API will be available at:

```
http://localhost:3000/api/iten/:id
```

---

## 📌 What This Project Demonstrates

* Practical use of Redis as a cache layer
* Cache-aside and lazy loading patterns
* Performance benchmarking and analysis
* Handling concurrency issues in distributed systems
* Clean architecture and separation of concerns
