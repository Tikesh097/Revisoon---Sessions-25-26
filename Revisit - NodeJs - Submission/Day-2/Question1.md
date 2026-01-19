## 1. What is HTTPS?
**HTTP** is a protocol to send data between a browser and a server.  
**HTTPS** is the secure version of HTTP. It encrypts data so nobody can read it while it travels on the internet.

---

## 2. Explain SSL/TLS. What is the SSL handshake process?
**SSL/TLS** are protocols that secure data transfer between browser and server.  
The **SSL handshake** is the process where the browser and server agree on encryption keys before sending data.

---

## 3. What is encryption? Explain symmetric vs asymmetric encryption
**Encryption** is scrambling data so only authorized people can read it.

| Type | How it works | Pros/Cons |
| :--- | :--- | :--- |
| **Symmetric** | Same key to lock & unlock. | Fast, but key sharing is risky. |
| **Asymmetric** | Public key to encrypt, Private key to decrypt. | Very secure, no need to share private key. |

---

## 4. What are certificates? What is a Certificate Authority (CA)?
* **Certificate:** A digital ID for a website that proves it is legitimate.
* **Certificate Authority (CA):** A trusted company that issues certificates. Browser trusts CA → trusts website.

---

## 5. What is the difference between authentication and authorization?
* **Authentication:** “Who are you?” → Verifies your identity (e.g., username/password).
* **Authorization:** “What can you do?” → Checks your permissions (e.g., admin vs. user).

---

## 6. Explain session-based authentication. How do sessions work?
1.  After login, server creates a session and stores it in memory or database.
2.  Server sends session ID to browser (usually as a cookie).
3. Browser sends session ID with every request → server knows who the user is.


## 7. What are cookies? What are the security attributes of cookies (HttpOnly, Secure, SameSite)?
**Cookies** are small data files stored in the browser. To keep them safe, use these attributes:

* **HttpOnly:** Prevents browser JS from reading the cookie (stops XSS).
* **Secure:** Cookie is only sent over HTTPS.
* **SameSite:** Controls if cookies are sent in cross-site requests (stops CSRF).


---

## 8. What is token-based authentication? How does it differ from session-based auth?
After login, the server gives a **token** (like a JWT). The browser sends this token in the header of each request.

### Difference from Sessions:
* **Stateless:** No server memory needed (the token holds the info).
* **Scalable:** Works perfectly with mobile apps and APIs.
* **Session-based:** Stores info on the server (stateful).