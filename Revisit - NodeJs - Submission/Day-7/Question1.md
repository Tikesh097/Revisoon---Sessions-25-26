## What is Express.js? Why use it over plain Node.js?

*Express.js is a web framework built on top of Node.js.*
Node.js gives basic tools like HTTP server, but Express makes web development easier.

### We use Express because:

* Writing routes is simpler
* Middleware support is built-in
* Code is cleaner and faster to write
* Good for APIs and backend services

---

## What is middleware in Express? Explain the middleware chain.

*Middleware is a function that runs between request and response.*

### Middleware can:

* Read request
* Modify request or response
* End request
* Pass control to next middleware

Middleware chain means:

```
Request → Middleware 1 → Middleware 2 → Route → Response
```

Each middleware uses `next()` to move forward.

---

## What are the different types of middleware?

### 1. Application-level middleware

* Used for the whole app using `app.use()`

### 2. Router-level middleware

* Used for specific routes using `router.use()`

### 3. Error-handling middleware

* Used to handle errors
* Has 4 parameters: `err, req, res, next`

---

## How does error handling work in Express?

* If an error happens, we call `next(error)`
* Express skips normal middleware
* Error-handling middleware runs
* Error middleware catches the error and sends proper response

---

## What is the difference between app.use() and app.all()?

**app.use():**

* Runs for all HTTP methods
* Mostly used for middleware

**app.all():**

* Runs for all HTTP methods
* Mostly used for route handling

---

## Explain routing in Express. How do route parameters work?

Routing decides how server responds to different URLs and methods.

**Example:**

```
GET /users → fetch users
```

Route parameters are dynamic values in URL.

**Example:**

```
/users/:id
```

Access using `req.params.id`

---

## What are route handlers vs middleware?

**Middleware:**

* Runs before route
* Used for logic like auth, logging

**Route handler:**

* Final function
* Sends response to client

Middleware prepares request. Route handler sends response.

---

## How do you handle file uploads in Express?

We use a package like `multer`.

**Steps:**

* Install multer
* Configure storage
* Use it as middleware
* Access file using `req.file` or `req.files`

---

## What is morgan? What logging strategies would you implement?

Morgan is a logging middleware.

**It logs:**

* HTTP method
* URL
* Status code
* Response time

**Logging strategies:**

* Request logs
* Error logs
* Save logs to file
* Use different log levels

---

## How would you structure a large Express application?

Separate code into folders:

* routes
* controllers
* middlewares
* services
* utils
* config
