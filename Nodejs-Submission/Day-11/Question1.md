
## 1. What are the different types of queries in MongoDB?

MongoDB supports different types of queries based on the operation being performed:

* **Find Queries**: Used to retrieve documents from a collection using `find()` or `findOne()`.
* **Insert Queries**: Used to add new documents using `insertOne()` or `insertMany()`.
* **Update Queries**: Used to modify existing documents using `updateOne()`, `updateMany()`, or `findOneAndUpdate()`.
* **Delete Queries**: Used to remove documents using `deleteOne()` or `deleteMany()`.
* **Aggregation Queries**: Used for advanced data processing and transformation using the aggregation pipeline.

---

## 2. Explain projection in MongoDB queries

Projection is used to **control which fields are included or excluded** in the query result.

* It helps reduce data transfer and improve performance.
* Projection is specified as the second argument in a `find()` query.

Example:

* `{ name: 1, price: 1 }` → Includes only name and price
* `{ description: 0 }` → Excludes description field

---

## 3. What are comparison operators in MongoDB?

Comparison operators are used to compare field values in documents.

Common comparison operators include:

* `$eq` – Equal to
* `$ne` – Not equal to
* `$gt` – Greater than
* `$gte` – Greater than or equal to
* `$lt` – Less than
* `$lte` – Less than or equal to
* `$in` – Matches any value in an array
* `$nin` – Does not match values in an array

These operators are widely used in filtering conditions.

---

## 4. What are logical operators in MongoDB?

Logical operators are used to combine multiple query conditions.

* `$and` – Matches documents that satisfy all conditions
* `$or` – Matches documents that satisfy at least one condition
* `$not` – Negates a condition
* `$nor` – Matches documents that fail all conditions

They help build complex queries in MongoDB.

---

## 5. Explain update operators in MongoDB

Update operators modify specific fields in a document without replacing the entire document.

Common update operators:

* `$set` – Updates or adds a field value
* `$unset` – Removes a field
* `$inc` – Increments or decrements a numeric value
* `$push` – Adds an element to an array
* `$pull` – Removes elements from an array

These operators are efficient and prevent overwriting full documents.

---

## 6. What are indexes in MongoDB? What types of indexes exist?

Indexes are **special data structures** that improve query performance by allowing MongoDB to find documents faster.

Types of indexes:

* **Single Field Index** – Index on one field
* **Compound Index** – Index on multiple fields
* **Multikey Index** – Index on array fields
* **Text Index** – Supports text search
* **Geospatial Index** – Used for location-based queries
* **TTL Index** – Automatically deletes documents after a certain time

---

## 7. How do you create a compound index? What is index order?

A compound index is created on **multiple fields** in a specific order.

* The order of fields in a compound index matters.
* MongoDB can efficiently use the index only if queries follow the same order or prefix of the index.

Example:

* Index on `{ category: 1, price: -1 }`
* Efficient for queries filtering by category first, then price

---

## 8. What is a covered query in MongoDB?

A covered query is a query where:

* All fields in the query and projection are part of an index
* MongoDB does **not need to read the actual documents**

Covered queries are very fast and highly optimized.

---

## 9. How do you analyze query performance? What is explain()?

MongoDB provides the `explain()` method to analyze query performance.

* It shows how a query is executed
* Helps identify whether indexes are used

Common execution stats include:

* Execution time
* Index used
* Number of documents examined

This helps in optimizing queries and indexes.

---

## 10. What are TTL indexes?

TTL (Time-To-Live) indexes are used to **automatically delete documents after a specified time**.

* Useful for logs, sessions, and temporary data
* MongoDB removes expired documents automatically

TTL indexes help manage storage efficiently without manual cleanup.

---

