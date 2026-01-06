## 1. What is a Database? What are the Types of Databases?

A **database** is an organized collection of structured information or data stored electronically in a computer system. Databases allow easy storage, retrieval, management, and manipulation of data.

### Types of Databases:

**Relational Databases (SQL)**
- Store data in tables with rows and columns.
- Examples: MySQL, PostgreSQL, Oracle, SQL Server.

**Non-Relational Databases (NoSQL)**
- Store data in flexible formats: key-value, document, column-family, or graph.
- Examples: MongoDB (document), Redis (key-value), Cassandra (column), Neo4j (graph).

**In-Memory Databases**
- Data is stored in RAM for extremely fast access.
- Examples: Redis, Memcached.

**Distributed Databases**
- Data is stored across multiple physical locations.
- Examples: Apache Cassandra, Google Spanner.

**Cloud Databases**
- Hosted on cloud services for scalability.
- Examples: Amazon RDS, Azure SQL Database, Firebase Realtime Database.

---

## 2. What is the difference between SQL and NoSQL databases?

| Feature | SQL Databases | NoSQL Databases |
|---------|---------------|-----------------|
| **Structure** | Tables with rows and columns | Document, key-value, column-family, graph |
| **Schema** | Fixed schema | Dynamic/flexible schema |
| **Query Language** | SQL (Structured Query Language) | Varies (MongoDB uses BSON, Redis uses key-value commands) |
| **Scalability** | Vertical (scale-up) | Horizontal (scale-out) |
| **ACID Compliance** | Yes | Often eventual consistency (BASE) |
| **Use Cases** | Transactions, banking, ERP | Real-time apps, big data, caching |

---

## 3. When would you choose SQL over NoSQL and vice versa?

### Choose SQL when:
- Data is structured and consistent.
- ACID transactions are critical (e.g., banking systems).
- Relationships between entities are complex.

### Choose NoSQL when:
- Data is semi-structured or unstructured.
- You need horizontal scalability (large volumes of data).
- Flexible schema is required.
- Real-time performance is critical (e.g., social media feeds, caching).

---

## 4. What is ACID in databases? Explain each property.

**ACID** ensures reliable database transactions.

### Atomicity
A transaction is all-or-nothing. Either all operations succeed, or none do.

*Example:* Transferring money between accounts.

### Consistency
Database moves from one valid state to another.

*Example:* Total balance in accounts remains constant after transactions.

### Isolation
Concurrent transactions do not interfere with each other.

*Example:* Two users updating the same account simultaneously won't cause incorrect balances.

### Durability
Once a transaction is committed, it persists even in case of system failure.

*Example:* Money transfer remains recorded even if the server crashes after confirmation.

---

## 5. What is BASE in NoSQL databases?

**BASE** is used in NoSQL systems as an alternative to strict ACID:

- **B**asically **A**vailable – The system guarantees availability of data.
- **S**oft State – Data may change over time due to eventual consistency.
- **E**ventual Consistency – Updates will propagate to all nodes eventually, but not immediately.

NoSQL favors availability and scalability over strict consistency.

---

## 6. What is database normalization? Explain 1NF, 2NF, 3NF.

Normalization organizes data to reduce redundancy and improve integrity.

### 1NF (First Normal Form)
- Each column contains atomic (indivisible) values.
- No repeating groups.

*Example:* Separate phone numbers into multiple rows instead of storing comma-separated values.

### 2NF (Second Normal Form)
- Meets 1NF.
- Every non-key column is fully dependent on the primary key.
- Eliminates partial dependencies.

### 3NF (Third Normal Form)
- Meets 2NF.
- No transitive dependencies (non-key columns depending on other non-key columns).
- Ensures that non-key columns only depend on the primary key.

---

## 7. What is denormalization? When would you denormalize data?

**Denormalization** is the process of combining tables to reduce joins for performance optimization.

- Used when read performance is more critical than storage efficiency.

*Example:* Storing customer and order data together to reduce join queries in reporting.

---

## 8. What are database indexes? How do they improve performance?

An **index** is a data structure that improves query performance by allowing faster lookups.

- Works like a book index: allows you to quickly find data without scanning every row.
- Common types: B-Tree, Hash Index, Full-Text Index.

**Example:**
```sql
CREATE INDEX idx_user_email ON users(email);
```

---

## 9. What are the trade-offs of using indexes?

### Advantages:
- Faster SELECT queries.
- Efficient sorting and filtering.

### Disadvantages:
- Slower INSERT, UPDATE, DELETE (indexes must be updated).
- Increased storage space.
- Too many indexes can degrade performance.

---

## 10. What is a primary key? What is a foreign key?

### Primary Key (PK)
- Uniquely identifies each record in a table.
- Cannot be null.

*Example:* `userId` in Users table.

### Foreign Key (FK)
- Establishes a relationship between tables.
- References the primary key in another table.

*Example:* `userId` in Posts table references `Users.userId`.
