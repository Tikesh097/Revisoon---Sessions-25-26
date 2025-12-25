### 1. What is HTTP and how does it work? Explain the request–response cycle.

HTTP (HyperText Transfer Protocol)** is an application-layer protocol used for communication between a client (browser, mobile app) and a server over the web.

**Request–Response Cycle:**

1. The client sends an HTTP request to the server (URL, method, headers, optional body)
2. The server processes the request (business logic, database access)
3. The server sends back an HTTP response containing:
   - Status code (e.g., 200, 404)
   - Headers
   - Response body (JSON, HTML, etc.)
4. The client reads the response and renders or processes the data

---


### 2. What are the different HTTP methods and when should each be used?

| Method | Purpose | Example |
|--------|---------|---------|
| `GET` | Retrieve data | Get user details |
| `POST` | Create new resource | Create a user |
| `PUT` | Replace entire resource | Update full user |
| `PATCH` | Partially update resource | Update email only |
| `DELETE` | Remove resource | Delete a user |

**Key Points:**
- `GET` should not modify data
- `POST` is non-idempotent
- `PUT` & `PATCH` update data

---

### 3. Explain HTTP status codes. Difference between 2xx, 3xx, 4xx, 5xx?

HTTP status codes indicate the result of a request.

**2xx – Success**
- Example: `200 OK`, `201 Created`

**3xx – Redirection**
- Example: `301 Moved Permanently`, `302 Found`

**4xx – Client Error**
- Example: `400 Bad Request`, `401 Unauthorized`, `404 Not Found`

**5xx – Server Error**
- Example: `500 Internal Server Error`, `502 Bad Gateway`

---

### 4. What are HTTP headers? Important request and response headers.

HTTP headers are key-value pairs that provide metadata about the request or response.

**Common Request Headers:**
- `Authorization` – Authentication token
- `Content-Type` – Format of request body
- `Accept` – Expected response format
- `User-Agent` – Client information

**Common Response Headers:**
- `Content-Type`
- `Content-Length`
- `Set-Cookie`
- `Cache-Control`

---


### 5. Difference between stateless and stateful protocols? Is HTTP stateless?

**Stateless Protocol:** Server does not store client state between requests

**Stateful Protocol:** Server remembers client session

**HTTP is stateless**, meaning:
- Each request is independent
- Session data is managed using cookies, tokens, or headers

---

### 6. Explain idempotency in REST APIs. Which methods are idempotent?

A request is **idempotent** if making it multiple times produces the same result.

**Idempotent Methods:**
- `GET`
- `PUT`
- `PATCH` (usually)
- `DELETE`

**Non-idempotent Method:**
- `POST`

**Example:** Deleting the same resource multiple times still results in the resource being deleted.

---

### 7. What is REST? Principles of RESTful API design.

**REST (Representational State Transfer)** is an architectural style for designing web APIs.

**Key Principles:**
1. Client–Server separation
2. Stateless communication
3. Resource-based URLs
4. Use of standard HTTP methods
5. Uniform interface
6. Support for caching

**Example:**
```http
GET /api/users/123
```

---
### 8. How would you version a REST API? Different approaches.

API versioning helps manage breaking changes.

**Common Approaches:**

1. **URI Versioning** (Most common)
   ```
   /api/v1/users
   ```

2. **Header Versioning**
   ```
   Accept: application/vnd.myapi.v1+json
   ```

3. **Query Parameter Versioning**
   ```
   /api/users?version=1
   ```



---

