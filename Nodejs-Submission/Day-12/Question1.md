### 1. What is the aggregation framework in MongoDB?

The aggregation framework is a powerful data processing pipeline in MongoDB that allows you to perform complex data transformations and computations on documents. It processes data through multiple stages in a pipeline, where each stage transforms the documents and passes results to the next stage. It's used for operations like filtering, grouping, sorting, reshaping, and computing aggregate values (sum, average, count, etc.).

---

### 2. Explain the stages in aggregation pipeline ($match, $group, $project, $sort, $limit)

**$match**: Filters documents based on specified conditions, similar to find() queries. Should be placed early in the pipeline to reduce documents processed in subsequent stages.

**$group**: Groups documents by a specified identifier expression and performs aggregate calculations on grouped data (sum, average, count, max, min, etc.).

**$project**: Reshapes documents by including, excluding, or computing new fields. Controls the structure of output documents and can create calculated fields.

**$sort**: Orders documents by specified fields in ascending or descending order. Can sort by multiple fields with different sort directions.

**$limit**: Restricts the number of documents passed to the next stage in the pipeline. Useful for getting top N results after sorting.

---

### 3. What is $lookup? How do you perform joins in MongoDB?

$lookup is an aggregation stage that performs a left outer join between two collections. It combines documents from different collections based on matching field values, similar to SQL JOIN operations. The stage adds an array field to input documents containing matching documents from the joined collection. You can use basic equality matching or more complex pipeline-based lookups for advanced join conditions.

---

### 4. What is $unwind? When would you use it?

$unwind deconstructs an array field from documents and creates a separate output document for each array element. It essentially "flattens" arrays, converting one document with an array into multiple documents.

**When to use:**
- When you need to perform operations on individual array elements
- Before grouping by array values
- When joining collections where the local field is an array
- To calculate statistics or aggregations on array elements
- When you need to normalize nested array structures for analysis

---

### 5. What are aggregation expressions and operators?

Aggregation expressions are formulas used within aggregation stages to perform calculations, transformations, and comparisons on document fields. Operators are the building blocks of these expressions.

**Main categories include:**
- **Arithmetic operators**: Mathematical operations (add, subtract, multiply, divide)
- **String operators**: Text manipulation (concatenation, substring, case conversion)
- **Array operators**: Array manipulation (size, slice, filter, map)
- **Comparison operators**: Value comparisons (equal, greater than, less than)
- **Conditional operators**: If-then logic and conditional expressions
- **Date operators**: Date manipulation and extraction
- **Accumulator operators**: Aggregate calculations (sum, average, max, min) used primarily in $group

---

### 6. How do you handle one-to-many relationships in MongoDB?

One-to-many relationships can be handled using two approaches:

**Embedding**: Store the "many" side as an embedded array within the "one" document. Best when the related data is always accessed together, has limited size, and represents a true part-of relationship.

**Referencing**: Store references using ObjectIds where the "many" documents contain a reference to the "one" document's ID. Best when the related data grows unbounded, needs independent access, or is shared across multiple parent documents.

The choice depends on data size, access patterns, update frequency, and whether the data needs to be accessed independently.

---

### 7. How do you handle many-to-many relationships in MongoDB?

Many-to-many relationships can be handled through several approaches:

**Two-way embedding**: Store arrays of references on both sides of the relationship. Suitable for small datasets where you query from both directions frequently.

**Intermediate/junction collection**: Create a separate collection that stores pairs of related IDs, similar to SQL junction tables. Best for complex relationships that need additional attributes (like enrollment dates) or when the relationship data is large.

**One-way embedding**: Store references as an array on one side only and use $lookup to retrieve related data when needed. Simplifies updates but requires aggregation for certain queries.

The choice depends on query patterns, relationship complexity, data size, and whether the relationship itself has attributes.

---

### 8. What is data modeling in MongoDB? Explain the 6 rules of thumb.

Data modeling in MongoDB is designing the structure and organization of data to optimize for application access patterns, performance requirements, and data relationships. Unlike relational databases, MongoDB modeling prioritizes how data is used over perfect normalization.

**The 6 Rules of Thumb:**

1. **Favor embedding unless there's a compelling reason not to**: Embedding provides better read performance and atomicity
2. **Needing to access an object on its own is a compelling reason not to embed**: Independent access requirements suggest referencing
3. **Arrays should not grow without bound**: Unbounded growth causes performance issues; use referencing instead
4. **Don't be afraid of application-level joins**: $lookup enables joins when needed, though they're more expensive than embedded data
5. **Consider the read-to-write ratio**: High read frequency with low writes favors duplication and denormalization
6. **Design based on how data will be used**: Model according to query patterns, not theoretical relationships

---

### 9. What are atomic operations in MongoDB?

Atomic operations are operations that complete entirely or not at all, ensuring data consistency without partial updates. In MongoDB, all operations on a single document are atomic by default. This means when you modify a document, either all changes succeed together or none are applied, preventing inconsistent intermediate states.

