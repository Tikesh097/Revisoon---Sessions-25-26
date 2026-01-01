## 1. What is CORS? Why does it exist?

### Answer:
**CORS** stands for **Cross-Origin Resource Sharing**.

It is a browser security rule that controls which website can access APIs of another website.

### Why it exists:
- To protect users from malicious websites
- Without CORS, any website could read data from another website's API, which is unsafe

### Example:
If my frontend is on `localhost:3000` and backend is on `localhost:5000`, CORS decides whether this request is allowed or blocked.

---

## 2. Explain the Same-Origin Policy

### Answer:
**Same-Origin Policy** is a browser security rule.

### It says:
A web page can only access data from the **same origin** (same protocol, domain, and port).

### Example:
```
https://example.com
```
❌ **cannot access**
```
http://example.com
https://api.example.com
```

**Purpose:** This prevents data stealing and attacks.

---

## 3. What are preflight requests? When do they occur?

### Answer:
A **preflight request** is an `OPTIONS` request sent by the browser before the actual API call.

### It happens when:
- Request method is not `GET`/`POST` (like `PUT`, `DELETE`)
- Custom headers are used
- Content-Type is not simple

### Process:
The browser asks the server:
👉 *"Are you okay with this request?"*

If server allows it, then the real request is sent.

---

## 4. How do you configure CORS in Express?

### Answer:
In Express, we use the `cors` middleware.

### Example:
```javascript
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}));
```

This allows only specific origins and methods, which is **more secure**.

---

## 5. What is CSRF? How do you prevent it?

### Answer:
**CSRF** stands for **Cross-Site Request Forgery**.

It happens when a malicious website tricks a logged-in user into making a request without their knowledge.

### Example:
User is logged into a bank website, and another site sends a fake transfer request.

### Prevention:
- ✅ CSRF tokens
- ✅ SameSite cookies
- ✅ Checking request origin
- ✅ Using POST instead of GET for sensitive actions

---

## 6. What is XSS? How do you prevent it?

### Answer:
**XSS** means **Cross-Site Scripting**.

It happens when an attacker injects malicious JavaScript into a website.

### Example:
```html
alert("Hacked")
```

### Prevention:
- ✅ Escape user input
- ✅ Use `helmet` in Express
- ✅ Never trust user input
- ✅ Use Content Security Policy (CSP)

---

## 7. What is SQL Injection? How do you prevent it?

### Answer:
**SQL Injection** happens when an attacker inserts SQL code into input fields to access or delete data.

### Example:
```sql
' OR 1=1 --
```

### Prevention:
- ✅ Use prepared statements
- ✅ Use ORM like Sequelize or Mongoose
- ✅ Validate and sanitize input
- ✅ Never build SQL queries using string concatenation

---

## 8. What are rate limiting and throttling? Why are they important?

### Answer:
- **Rate limiting:** Limits the number of requests a user can make in a time period
- **Throttling:** Slows down requests instead of blocking immediately

### Why they are important:
- ✅ Prevent brute force attacks
- ✅ Avoid server overload
- ✅ Stop API abuse
- ✅ Improve performance and security
