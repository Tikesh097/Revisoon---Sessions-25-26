### 1. What are the types of errors in Node.js?

Node.js errors can be categorized into several types:

**Standard JavaScript Errors:**
- **SyntaxError**: Code contains invalid JavaScript syntax
- **ReferenceError**: Referencing a variable that doesn't exist
- **TypeError**: Operation performed on wrong data type
- **RangeError**: Value is outside the allowed range

**System Errors**: Errors from the operating system, typically occurring during I/O operations (file system, network). Examples include ENOENT (file not found), EADDRINUSE (port already in use), ECONNREFUSED (connection refused).

**User-specified Errors**: Custom errors created by developers using Error constructor or custom error classes to handle application-specific scenarios.

**Assertion Errors**: Thrown by the assert module when assertions fail during testing or validation.

Understanding error types helps in implementing appropriate error handling strategies and providing meaningful error messages.

---

### 2. How do you handle errors in synchronous vs asynchronous code?

**Synchronous Error Handling:**
Synchronous code uses try-catch blocks to capture errors. When an error occurs within a try block, execution immediately jumps to the catch block. This approach works for blocking operations and code that executes sequentially.

**Asynchronous Error Handling:**
Asynchronous code requires different approaches based on the pattern used:

- **Callbacks**: Use error-first callback pattern where the first parameter is an error object (null if no error), and subsequent parameters contain results
- **Promises**: Use .catch() method to handle rejected promises or chain .then() with two arguments (success and error handlers)
- **Async/Await**: Use try-catch blocks around await statements, combining synchronous-style error handling with asynchronous operations

The key difference is that try-catch doesn't work with traditional callbacks because the error occurs outside the try block's scope after the callback is invoked asynchronously.

---

### 3. What is the try-catch block? When should you use it?

A try-catch block is a control structure that allows you to test code for errors in the try block and handle those errors in the catch block. If an error occurs in the try block, execution immediately transfers to the catch block, preventing the application from crashing.

**Structure:**
The try block contains code that might throw errors. The catch block receives the error object and contains error handling logic. An optional finally block executes regardless of success or failure, useful for cleanup operations.

**When to use:**
- Wrapping synchronous code that might throw errors
- Around await statements in async functions
- When parsing JSON or performing operations that might fail
- When you want to recover from errors gracefully
- For operations where you need cleanup code regardless of success or failure

**When NOT to use:**
- With callback-based asynchronous code (use error callbacks instead)
- Around every single line of code (over-defensive coding)
- To suppress errors without proper handling
- In cases where the error should propagate up to be handled centrally

---

### 4. How do you handle unhandled promise rejections?

Unhandled promise rejections occur when a Promise is rejected but no .catch() handler or try-catch block (with async/await) is present to handle the rejection.

**Prevention strategies:**
- Always attach .catch() handlers to promises
- Use try-catch blocks with async/await
- Return promises from functions to allow caller to handle errors
- Use Promise.allSettled() instead of Promise.all() when you need all results regardless of rejections

**Global handlers:**
Node.js provides process-level event listeners to catch unhandled rejections:
- The 'unhandledRejection' event fires when a Promise is rejected without a handler
- The 'rejectionHandled' event fires when a handler is added after rejection

**Best practices:**
- Log unhandled rejections for debugging
- Gracefully shut down the application after logging
- Never silently ignore unhandled rejections
- In production, use monitoring tools to track these errors
- Consider them critical bugs that need immediate fixing

Starting from Node.js v15, unhandled promise rejections terminate the process by default, emphasizing the importance of proper error handling.

---

### 5. What are operational errors vs programmer errors?

**Operational Errors:**
These are runtime problems experienced by correctly-written programs. They represent expected failure scenarios in normal operation and should be handled gracefully.

Examples include:
- Network connection failures
- Database connection timeouts
- Invalid user input
- File not found errors
- System out of memory
- External service unavailability

Characteristics: Predictable, recoverable, should be anticipated and handled in code, part of normal application flow.

**Programmer Errors:**
These are bugs in the code itself, representing mistakes made by developers that should be fixed rather than handled at runtime.

Examples include:
- Calling undefined functions
- Reading properties of null/undefined
- Passing wrong argument types
- Logic errors in code
- Syntax errors
- Incorrect async handling

Characteristics: Unpredictable, indicate code defects, should crash the application immediately (fail-fast), should be caught during development and testing.

**Key principle:** Handle operational errors gracefully but allow programmer errors to crash the application quickly to reveal bugs during development. Never catch and hide programmer errors in production.

---

### 6. How would you implement centralized error handling in Express?

Centralized error handling consolidates all error handling logic into one or more middleware functions, ensuring consistent error responses and reducing code duplication.

**Implementation approach:**

**Error-handling middleware**: Define middleware with four parameters (err, req, res, next) at the end of the middleware stack. Express recognizes this signature as error-handling middleware. All errors passed to next(err) or thrown in async routes flow to these handlers.

**Error classification**: Create custom error classes extending the Error class with additional properties like statusCode and isOperational to distinguish between different error types.

**Async error wrapper**: Create a wrapper function for async route handlers that catches errors and forwards them to error middleware, eliminating repetitive try-catch blocks.

**Structured error responses**: Format all error responses consistently with appropriate status codes, messages, and optional stack traces in development mode.

**Logging**: Integrate logging within error middleware to track all errors centrally for monitoring and debugging.

**Environment-specific handling**: Show detailed error information in development but sanitized messages in production to avoid exposing sensitive information.

Benefits include consistent error responses, easier maintenance, separation of concerns, and centralized logging and monitoring.

---

### 7. What is input validation? Why is it important?

Input validation is the process of verifying that data received from users or external sources meets expected criteria before processing. It checks data type, format, length, range, and business rules.

**Why it's important:**

**Security**: Prevents injection attacks (SQL injection, XSS, command injection), protects against malicious input, reduces attack surface, prevents data corruption.

**Data Integrity**: Ensures only valid data enters the database, maintains data quality and consistency, prevents cascading errors from invalid data, supports business rule enforcement.

**User Experience**: Provides immediate feedback on invalid input, prevents confusing error messages later in the process, guides users to correct input format, reduces support requests.

**Application Stability**: Prevents unexpected behavior from malformed data, reduces crashes and exceptions, makes debugging easier, improves application reliability.

**Compliance**: Helps meet regulatory requirements (GDPR, HIPAA), supports audit trails, ensures data privacy standards.

Validation should occur on both client and server side, with server-side validation being mandatory since client-side validation can be bypassed.

---

### 8. What libraries can you use for validation (Joi, express-validator, etc.)?

**Joi**: Schema-based validation library with rich validation rules and clear error messages. Excellent for validating complex nested objects and API payloads. Works with any Node.js application, not just Express. Highly customizable with custom validation functions and supports type coercion.

**express-validator**: Built on top of validator.js, specifically designed for Express applications. Provides middleware-based validation integrated into Express route handling. Offers chain-able validation methods and built-in sanitization functions. Simple to use for basic validations with familiar Express middleware patterns.

**Yup**: Similar to Joi but smaller bundle size, popular in React applications but also works in Node.js. Schema-based with intuitive API, supports cross-field validation and asynchronous validation rules.

**Ajv (Another JSON Schema Validator)**: Fast JSON schema validator with excellent performance. Standards-based using JSON Schema specification. Ideal for validating against formal API specifications.

**Validator.js**: String validation and sanitization library. Provides individual validator functions rather than schema-based approach. Lightweight and focused on specific validation needs like email, URL, credit cards.

**Zod**: TypeScript-first schema validation with static type inference. Combines runtime validation with compile-time type safety. Growing popularity in TypeScript projects.

Selection depends on project requirements, TypeScript usage, performance needs, and integration requirements with existing frameworks.

---

### 9. How do you sanitize user input?

Sanitization is the process of cleaning user input to remove or escape potentially dangerous characters and content before processing or storing data.

**Common sanitization techniques:**

**Trimming**: Remove leading and trailing whitespace from strings to prevent storage of unnecessary spaces and ensure consistent formatting.

**Escaping HTML**: Convert HTML special characters to their entity equivalents to prevent XSS attacks. Characters like angle brackets, quotes, and ampersands are escaped.

**Removing HTML tags**: Strip all HTML tags from input when HTML content is not expected or allowed, preventing script injection.

**Normalizing data**: Convert data to consistent formats like lowercase for emails, remove special characters from phone numbers, standardize date formats.

**Limiting length**: Truncate or reject input exceeding maximum length requirements to prevent buffer overflow and database issues.

**Encoding**: Properly encode data based on context (URL encoding, SQL escaping, JavaScript encoding) before use in different contexts.

**Blacklist/Whitelist**: Remove known dangerous patterns or allow only specific characters based on input requirements.

**Libraries for sanitization**: validator.js provides sanitization functions, express-validator includes sanitization middleware, DOMPurify for HTML sanitization, and specialized libraries for SQL escaping and URL encoding.

**Important principle**: Sanitize at the entry point of your application and before output to different contexts. Sanitization complements but doesn't replace validation.

---

### 10. What is the difference between client-side and server-side validation?

**Client-Side Validation:**

**Purpose**: Provides immediate feedback to users, improves user experience, reduces unnecessary server requests.

**Execution**: Runs in the user's browser using JavaScript before data is submitted to the server.

**Advantages**: Instant feedback without network latency, reduced server load, better user experience with real-time error messages, can validate as user types.

**Limitations**: Can be bypassed by disabling JavaScript, attackers can manipulate browser validation, not secure for security-critical validations, inconsistent across different browsers.

**Use cases**: Format checking (email, phone), field length restrictions, required fields, password strength meters, date range validations.

**Server-Side Validation:**

**Purpose**: Ensures data integrity and security, serves as the authoritative validation layer, protects against malicious input.

**Execution**: Runs on the server after data is received from the client, before processing or storing data.

**Advantages**: Cannot be bypassed by users, secure and reliable, consistent validation logic, protects backend systems and databases, enforces business rules authoritatively.

**Limitations**: Requires network round-trip, slightly slower user feedback, increases server load, can impact user experience if too slow.

**Use cases**: All critical validations, database constraint checks, business logic validation, authentication and authorization, duplicate checking.

**Best Practice**: Always implement server-side validation (mandatory for security). Add client-side validation as enhancement for better user experience. Never trust client-side validation alone. Keep validation logic consistent between client and server when possible.

