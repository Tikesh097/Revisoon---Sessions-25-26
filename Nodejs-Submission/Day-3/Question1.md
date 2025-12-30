## 1. What is JWT (JSON Web Token)? Explain its structure (header, payload, signature).

**JSON Web Token (JWT)** is an open standard (RFC 7519) that provides a compact and self-contained method for securely transmitting information between parties as a JSON object. The information can be verified and trusted because it is digitally signed using either a secret (HMAC) or a public/private key pair (RSA or ECDSA).

### Structure of JWT

A JWT consists of three parts separated by dots (`.`):

```
header.payload.signature
```

**Example:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### a) Header

The header typically consists of two parts:
- **typ**: The type of token (JWT)
- **alg**: The signing algorithm being used (e.g., HMAC SHA256 or RSA)

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```
This JSON is then **Base64Url encoded** to form the first part of the JWT.

### b) Payload

The payload contains the claims, which are statements about an entity (typically the user) and additional data. There are three types of claims:

- **Registered claims**: Predefined claims like `iss` (issuer), `exp` (expiration), `sub` (subject), `aud` (audience)
- **Public claims**: Custom claims defined by those using JWTs
- **Private claims**: Custom claims created to share information between parties

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "role": "admin",
  "iat": 1516239022,
  "exp": 1516242622
}
```


### c) Signature

The signature is created by taking:
- The encoded header
- The encoded payload
- A secret key
- The algorithm specified in the header

```javascript
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

---

## 2. How does JWT authentication work? Explain the flow?

JWT authentication is **stateless**, meaning the server doesn't need to store session data. Here's the complete flow:

### Step-by-Step Authentication Flow

**Step 1: User Login**
- User sends credentials (username and password) to the server via a POST request to `/login`

**Step 2: Credential Verification**
- Server validates credentials against the database
- If credentials are incorrect, server returns `401 Unauthorized`

**Step 3: Token Generation**
- If credentials are valid, server creates a JWT using:
  - User information (user_id, role, email)
  - Expiration time
  - Secret key stored on the server

```javascript
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }
);
```

**Step 4: Token Delivery**
- Server sends the JWT back to the client in the response

**Step 5: Client Storage**
- Client stores the token (in localStorage, cookies, or memory)

**Step 6: Authenticated Requests**
- For every subsequent request to protected resources, client includes the JWT in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Step 7: Server Validation**
- Server extracts the token from the Authorization header
- Verifies the signature using the secret key
- Checks if the token has expired
- If valid, extracts user information from the payload
- Processes the request with the authenticated user context

**Step 8: Response**
- If token is valid: Server returns the requested resource
- If token is invalid/expired: Server returns `401 Unauthorized`

---

## 3. What are the advantages and disadvantages of JWT over sessions?

### Advantages of JWT

**1. Stateless & Scalable**
- Server doesn't need to store session data
- Easy to scale horizontally across multiple servers
- No need for shared session storage like Redis

**2. Cross-Domain/CORS**
- Works seamlessly across different domains
- Perfect for microservices architecture
- Can be used across multiple applications

**3. Mobile-Friendly**
- Ideal for mobile apps where cookies might not work well
- Easy to implement in native mobile applications

**4. Performance**
- Reduces database lookups (user info is in the token)
- No server-side session storage overhead

**5. Decoupled Architecture**
- Frontend and backend can be completely separate
- API can serve multiple clients (web, mobile, desktop)

### Disadvantages of JWT

**1. Token Revocation is Hard**
- Once issued, tokens are valid until expiration
- Cannot instantly invalidate a token (need blacklisting mechanism)
- Compromised tokens remain valid until expiry

**2. Token Size**
- JWTs are larger than session IDs (can be 100+ bytes)
- Sent with every request, increasing bandwidth usage
- Especially problematic with many claims in payload

**3. Security Concerns**
- Payload is only encoded, not encrypted (visible to anyone)
- XSS attacks can steal tokens if stored in localStorage
- Requires careful implementation of storage and transmission

**4. No Built-in Session Management**
- Can't track active users easily
- Difficult to implement "logout from all devices"
- No centralized control over user sessions

---

## 4. Where should you store JWTs in the client? (localStorage vs cookies vs memory)

### Storage Options Comparison

#### 1. localStorage

**Pros:**
- Easy to implement
- Persists across browser sessions and page refreshes
- Accessible from JavaScript
- Works well for SPAs

**Cons:**
- **⚠️ Vulnerable to XSS attacks** - any JavaScript on the page can access it
- Accessible by any script running on the same domain
- No automatic expiration

```javascript
// Storing
localStorage.setItem('token', token);

// Retrieving
const token = localStorage.getItem('token');
```

#### 2. HttpOnly Cookies

**Pros:**
- **✅ Protected from XSS** - JavaScript cannot access HttpOnly cookies
- Automatically sent with requests to the same domain
- Can set Secure flag (HTTPS only) and SameSite attribute

**Cons:**
- **⚠️ Vulnerable to CSRF attacks** - requires CSRF protection
- Limited to same-domain unless properly configured
- Size limitations (~4KB)

```javascript
// Server-side (Node.js/Express)
res.cookie('token', token, {
  httpOnly: true,      // Cannot be accessed by JavaScript
  secure: true,        // Only sent over HTTPS
  sameSite: 'strict',  // CSRF protection
  maxAge: 900000       // 15 minutes
});
```

#### 3. In-Memory (JavaScript Variables)

**Pros:**
- **✅ Most secure** - cannot be accessed by XSS or CSRF
- Automatically cleared when page/tab closes
- No persistence risk

**Cons:**
- Lost on page refresh
- Requires refresh token strategy for session persistence
- More complex to implement

```javascript
// In a closure or React state
let token = null;

function setToken(newToken) {
  token = newToken;
}
```

---

## 5. What is the difference between access tokens and refresh tokens?

### Access Token

**Purpose:** Used to authenticate and authorize requests to protected resources

**Characteristics:**
- **Short-lived** (typically 5-15 minutes)
- Contains user identity and permissions
- Sent with every API request
- Expires quickly for security

**Example:**
```json
{
  "userId": "12345",
  "role": "admin",
  "email": "user@example.com",
  "iat": 1516239022,
  "exp": 1516239922
}
```

### Refresh Token

**Purpose:** Used solely to obtain a new access token when the current one expires

**Characteristics:**
- **Long-lived** (7-30 days or more)
- Stored securely (usually in database)
- Not sent with regular API requests
- Used only at a specific `/refresh` endpoint
- Can be revoked from server-side

**Example:**
```json
{
  "userId": "12345",
  "tokenId": "abc123",
  "type": "refresh",
  "iat": 1516239022,
  "exp": 1516843822
}
```

### Why Use Both?

**Security Benefits:**

1. **Limited Exposure**: Short-lived access tokens reduce the window of vulnerability if stolen
2. **Revocability**: Long-lived refresh tokens can be stored and revoked on the server
3. **Better User Experience**: Users stay logged in without re-entering credentials constantly
4. **Compromise Mitigation**: If an access token is stolen, it expires quickly

### Token Usage Flow

```
1. User logs in → Receives both tokens
2. Use access token for API calls (15 min)
3. Access token expires → API returns 401
4. Client sends refresh token to /refresh endpoint
5. Server validates refresh token in database
6. Server issues new access token
7. Client retries original request with new token
```

### Comparison Table

| Feature | Access Token | Refresh Token |
|---------|-------------|---------------|
| **Lifespan** | Short (5-15 minutes) | Long (7-30 days) |
| **Usage** | Every API request | Only at /refresh endpoint |
| **Storage** | Client (memory/cookie) | Database + Client cookie |
| **Revocability** | No (expires naturally) | Yes (stored in database) |
| **Contains** | User info, permissions | User ID, token ID |

---

## 6. How do you handle JWT expiration and refresh?

### Complete Flow for Handling Expiration

#### Step 1: Detection

Client makes a request with an expired access token, and the server responds with `401 Unauthorized`.

```javascript
// Server-side validation
app.use((req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
});
```

#### Step 2: Interceptor Catches Error

Client-side interceptor detects the 401 error and initiates refresh process.

```javascript
// Axios interceptor (React/JavaScript)
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Check if error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Request new access token using refresh token
        const { data } = await axios.post('/api/auth/refresh', {
          refreshToken: getRefreshToken()
        });
        
        // Save new access token
        setAccessToken(data.accessToken);
        
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Refresh failed - redirect to login
        redirectToLogin();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
```

#### Step 3: Refresh Token Endpoint

Server validates refresh token and issues new access token.

```javascript
// Server-side refresh endpoint
app.post('/api/auth/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }
  
  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    
    // Check if refresh token exists in database
    const storedToken = await RefreshToken.findOne({
      token: refreshToken,
      userId: decoded.userId
    });
    
    if (!storedToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }
    
    // Generate new access token
    const accessToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    
    res.json({ accessToken });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
});
```

#### Step 4: Automatic Retry

The interceptor automatically retries the original failed request with the new access token.

### Additional Strategies

#### 1. Proactive Refresh

Refresh the token before it expires:

```javascript
// Check token expiration and refresh proactively
const checkTokenExpiration = () => {
  const token = getAccessToken();
  const decoded = jwtDecode(token);
  const expirationTime = decoded.exp * 1000;
  const currentTime = Date.now();
  const timeUntilExpiry = expirationTime - currentTime;
  
  // Refresh if token expires in less than 5 minutes
  if (timeUntilExpiry < 5 * 60 * 1000) {
    refreshAccessToken();
  }
};
```

#### 2. Silent Refresh

Automatically refresh in the background:

```javascript
// Set up interval to check and refresh
setInterval(checkTokenExpiration, 60000); // Check every minute
```

#### 3. Refresh Token Rotation

Issue a new refresh token with each refresh to enhance security:

```javascript
app.post('/api/auth/refresh', async (req, res) => {
  // ... validation code ...
  
  // Generate new access token AND new refresh token
  const newAccessToken = jwt.sign(/*...*/);
  const newRefreshToken = jwt.sign(/*...*/);
  
  // Invalidate old refresh token
  await RefreshToken.deleteOne({ token: refreshToken });
  
  // Store new refresh token
  await RefreshToken.create({
    token: newRefreshToken,
    userId: decoded.userId
  });
  
  res.json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  });
});
```

---

## 7. What is Role-Based Access Control (RBAC)?

**Role-Based Access Control (RBAC)** is a method of regulating access to computer or network resources based on the roles of individual users within an organization. Instead of assigning permissions directly to users, permissions are assigned to roles, and roles are assigned to users.

### Core Concepts

#### 1. Users
Individuals who need access to the system.

#### 2. Roles
Job functions or titles that define authority levels (e.g., Admin, Editor, Viewer, Manager).

#### 3. Permissions
Specific operations or actions that can be performed (e.g., `read:posts`, `write:posts`, `delete:users`).

#### 4. Resources
Protected entities that permissions control access to (e.g., posts, users, comments, settings).

### RBAC Structure

```
Users → Roles → Permissions → Resources

User: John Doe
  └─ Role: Editor
      ├─ Permission: read:posts
      ├─ Permission: write:posts
      ├─ Permission: edit:posts
      └─ Permission: delete:own_posts

User: Jane Smith
  └─ Role: Admin
      ├─ Permission: read:posts
      ├─ Permission: write:posts
      ├─ Permission: edit:posts
      ├─ Permission: delete:any_posts
      ├─ Permission: manage:users
      └─ Permission: configure:system
```

### Example Database Schema

```javascript
// User Model
{
  id: "user_123",
  username: "johndoe",
  email: "john@example.com",
  roleId: "role_editor"
}

// Role Model
{
  id: "role_editor",
  name: "Editor",
  permissions: [
    "read:posts",
    "write:posts",
    "edit:posts",
    "delete:own_posts"
  ]
}

// Or with separate Permissions table
{
  id: "perm_1",
  action: "delete",
  resource: "posts",
  scope: "own"
}
```

---

## 8. How would you implement authorization in an API?

### Complete Implementation Guide

#### Step 1: Include Role in JWT

```javascript
// During login - include role in token
const token = jwt.sign(
  {
    userId: user.id,
    email: user.email,
    role: user.role  // Include role
  },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }
);
```

#### Step 2: Create Authentication Middleware

```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user info to request object
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
```

#### Step 3: Create Authorization Middleware

```javascript
// middleware/authorize.js

// Check if user has required role
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Access forbidden: Insufficient permissions'
      });
    }
    
    next();
  };
};

// Check if user has specific permission
const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Fetch user's permissions from database
    const user = await User.findById(req.user.userId).populate('role');
    
    if (!user.role.permissions.includes(requiredPermission)) {
      return res.status(403).json({
        message: `Permission denied: ${requiredPermission} required`
      });
    }
    
    next();
  };
};

module.exports = { checkRole, checkPermission };
```

#### Step 4: Apply Middleware to Routes

```javascript
// routes/posts.js
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { checkRole, checkPermission } = require('../middleware/authorize');

// Public route - no authentication needed
router.get('/posts', (req, res) => {
  // Anyone can view posts
});

// Protected route - authentication required
router.get('/posts/:id', authenticate, (req, res) => {
  // Only authenticated users can view post details
});

// Role-based authorization - only editors and admins
router.post('/posts', 
  authenticate, 
  checkRole(['editor', 'admin']), 
  (req, res) => {
    // Create new post
});

// Permission-based authorization
router.delete('/posts/:id', 
  authenticate, 
  checkPermission('delete:posts'), 
  (req, res) => {
    // Delete post
});

// Admin-only route
router.get('/admin/dashboard', 
  authenticate, 
  checkRole(['admin']), 
  (req, res) => {
    // Admin dashboard
});

// Multiple roles
router.put('/posts/:id', 
  authenticate, 
  checkRole(['editor', 'admin', 'moderator']), 
  (req, res) => {
    // Edit post
});
```

#### Step 5: Advanced - Resource-Based Authorization

```javascript
// Check if user owns the resource
const checkOwnership = (resourceModel) => {
  return async (req, res, next) => {
    try {
      const resource = await resourceModel.findById(req.params.id);
      
      if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      
      // Check if user is owner or admin
      if (resource.userId.toString() !== req.user.userId && 
          req.user.role !== 'admin') {
        return res.status(403).json({
          message: 'Access forbidden: Not the owner'
        });
      }
      
      req.resource = resource;
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Server error' });
    }
  };
};

// Usage
router.delete('/posts/:id', 
  authenticate, 
  checkOwnership(Post), 
  (req, res) => {
    // User can only delete their own posts
});
```

#### Step 6: Complete Example Application

```javascript
// app.js
const express = require('express');
const app = express();
const authenticate = require('./middleware/auth');
const { checkRole } = require('./middleware/authorize');

app.use(express.json());

// Public routes
app.post('/auth/login', loginController);
app.post('/auth/register', registerController);

// Protected routes
app.get('/profile', authenticate, getProfile);

// Role-based routes
app.get('/admin', authenticate, checkRole(['admin']), adminDashboard);
app.get('/editor', authenticate, checkRole(['editor', 'admin']), editorPanel);

// Resource routes with multiple checks
app.delete('/posts/:id', 
  authenticate,
  checkRole(['admin', 'editor']),
  checkOwnership(Post),
  deletePost
);

app.listen(3000, () => console.log('Server running on port 3000'));
```

### HTTP Response Status Codes

| Status Code | Meaning | When to Use |
|------------|---------|-------------|
| **200 OK** | Request successful | Successful GET, PUT, PATCH |
| **201 Created** | Resource created | Successful POST |
| **204 No Content** | Success, no content to return | Successful DELETE |
| **401 Unauthorized** | Authentication failed | No/invalid token |
| **403 Forbidden** | Authorization failed | Valid token, insufficient permissions |
| **404 Not Found** | Resource doesn't exist | Invalid resource ID |
| **500 Internal Server Error** | Server error | Unexpected server errors |

### Authorization Flow Diagram

```
Request → Extract Token → Verify Signature → Check Expiration
                                                     ↓
                                              Token Valid?
                                                     ↓
                                    Yes ←────────────┴────────→ No
                                     ↓                           ↓
                              Extract User Info           Return 401
                                     ↓
                              Check Role/Permission
                                     ↓
                              Has Permission?
                                     ↓
                    Yes ←────────────┴────────→ No
                     ↓                           ↓
              Process Request              Return 403
                     ↓
              Return Response
```

---

---
