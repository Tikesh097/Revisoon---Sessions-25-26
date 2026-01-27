## 1. What is database scaling? Explain vertical vs horizontal scaling.

Database scaling is increasing the capacity of a database to handle more load.

**Vertical scaling** means adding more resources like CPU, RAM, or storage to a single server. It's simple but limited by hardware.

**Horizontal scaling** means adding more servers and distributing the data or load. It can scale more, but is more complex.

## 2. What is database replication? Explain master-slave replication.

Replication is copying data from one database to another to improve availability or performance.

In master-slave replication, the master handles writes and sends updates to the slave. The slave handles reads. This way, the master doesn't get overloaded, and data is available if one server fails.

## 3. What is database sharding? How does it work?

Sharding is splitting a large database into smaller pieces called shards, each on a different server. Each shard has part of the data, often based on a key like user ID. Queries are sent to the right shard. This improves performance and scalability.

## 4. What are the challenges of sharding?

- Queries across multiple shards are more complicated.
- Transactions that involve multiple shards are hard.
- Data might not be evenly distributed, causing hotspots.
- Backups and restores become more complex.

## 5. What is database partitioning? How does it differ from sharding?

Partitioning is dividing a table into smaller parts within the same server. Sharding is dividing data across multiple servers. Partitioning helps performance and management, sharding helps scalability across machines.

## 6. What is a connection pool? Why is it important?

A connection pool is a set of database connections that can be reused. It's important because creating a new connection for every query is slow. Reusing connections improves performance and prevents too many simultaneous connections.

## 7. What are N+1 queries? How do you solve this problem?

N+1 queries happen when you fetch a parent record and then fetch child records separately for each parent.

For example, fetching 10 users and then querying posts for each user. That's 1 query + 10 queries = N+1.

It can be solved by using joins or batch queries to fetch all the data in fewer queries.

## 8. What is caching? Explain different caching strategies.

Caching is storing frequently used data in memory to avoid fetching it from the database every time.

**Cache-aside:** Check cache first, if not found, get from DB and store in cache.

**Write-through:** Write to cache and DB at the same time.

**Write-back:** Write to cache first and update DB later asynchronously.

## 9. What is the CAP theorem?

CAP theorem says a distributed system can only guarantee two of three things:

- **Consistency:** All nodes see the same data.
- **Availability:** Every request gets a response.
- **Partition tolerance:** The system keeps working even if there is a network split.

## 10. What are database transactions? What is MVCC?

Transactions are a set of database operations that are atomic, consistent, isolated, and durable (ACID).

MVCC, or Multi-Version Concurrency Control, allows multiple versions of data so that readers and writers don't block each other. This improves performance and concurrency.
