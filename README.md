#  Auth System — Session-Based Authentication

A full-stack authentication system built with **React (Vite) + Tailwind CSS** on the frontend and **PHP + MySQL** on the backend. It implements **session-based authentication** with **bcrypt password hashing** and **prepared statements** for SQL injection protection.

This project was built to understand authentication end-to-end — from form validation on the client, to secure password storage, session management, and protected routes on both the frontend and backend.

---

##  Features

-  **User Registration** — name, email, password, confirm password with client-side and server-side validation
-  **Show / Hide Password** — toggle visibility with a checkbox
-  **Secure Password Storage** — hashed with `password_hash($pass, PASSWORD_DEFAULT)` (bcrypt)
-  **Login Verification** — `password_verify()` compares plain input against stored hash
-  **PHP Sessions** — session created on successful login, destroyed on logout
-  **Protected Dashboard** — unauthenticated users are redirected to the login page
-  **Route Switching** — links between login and register pages via React Router
-  **Logout** — destroys the session and clears authentication state
-  **CORS with Credentials** — configured to allow cross-origin requests with cookies
-  **SQL Injection Safe** — all queries use `mysqli_prepare()` + `bind_param()` (no raw SQL)

---

##  Tech Stack

| Layer          | Technology                                  |
|----------------|---------------------------------------------|
| Frontend       | React, Vite, Tailwind CSS, React Router DOM |
| Frontend Hooks | `useState`, `useEffect`, `useNavigate`      |
| Backend        | PHP (Apache via XAMPP)                      |
| Database       | MySQL                                       |
| DB Access      | `mysqli` with prepared statements           |
| Auth           | PHP Sessions + bcrypt (`PASSWORD_DEFAULT`)  |

---

## 📁 Project Structure

```
auth_system/
├── backend/
│   ├── api/
│   │   ├── register.php       # Create new user
│   │   ├── login.php          # Authenticate + start session
│   │   ├── logout.php         # Destroy session
│   │   └── dashboard.php      # Session guard / protected endpoint
│   ├── config/
│   │   ├── database.example.php   # Template — copy to database.php
│   │   └── database.php           # (git-ignored) real DB credentials
│   └── database/
│       └── schema.sql         # Database + table creation script
│
└── frontend/
    ├── src/
    │   ├── components/        # Reusable UI pieces
    │   └── pages/             # Home, Register, Login, Dashboard
    ├── package.json
    └── vite.config.js
```

---

##  Application Flow

1. **Home page** — welcome text with two buttons: **Login** and **Register**
2. **Register page** — user enters name, email, password, confirm password
   - Validation runs on the client, then on the server
   - On success, the password is hashed and the user row is inserted
3. **Login page** — user enters email and password
   - Server fetches the user by email using a prepared statement
   - `password_verify()` compares the input against the stored hash
   - On success, a PHP session is created and the user is redirected to the dashboard
4. **Dashboard** — displays a welcome message with the session name, plus a logout button
   - If an unauthenticated user tries to access `/dashboard` directly, they are redirected to `/login`
5. **Logout** — destroys the session and returns the user to the home/login page

---

##  Setup Instructions

### Prerequisites

- [XAMPP](https://www.apachefriends.org/) (Apache + MySQL)
- [Node.js](https://nodejs.org/) and npm

### 1. Clone the repository

```bash
cd C:\xampp\htdocs\
git clone https://github.com/Subashstha769/auth_system.git
cd auth_system
```

>  The project **must** live inside `htdocs` so Apache can serve the PHP files.

### 2. Set up the database

1. Start **Apache** and **MySQL** from the XAMPP Control Panel
2. Open [phpMyAdmin](http://localhost/phpmyadmin)
3. Go to the **Import** tab
4. Import `backend/database/schema.sql`
5. Confirm the `auth_system` database and `users` table were created

Or via CLI:

```bash
mysql -u root -p < backend/database/schema.sql
```

### 3. Configure the backend

```bash
cd backend/config
copy database.example.php database.php    # Windows
# cp database.example.php database.php    # macOS / Linux
```

Open `database.php` and set your MySQL credentials (XAMPP default: user `root`, empty password).

### 4. Set up the frontend

```bash
cd ../../frontend
npm install
npm run dev
```

### 5. Open the app

Visit the URL printed by Vite (usually `http://localhost:5173`).

---

##  API Endpoints

| Method | Endpoint                        | Purpose                                       |
|--------|---------------------------------|-----------------------------------------------|
| POST   | `/backend/api/register.php`     | Create a new user account                     |
| POST   | `/backend/api/login.php`        | Authenticate user and start a session         |
| POST   | `/backend/api/logout.php`       | Destroy the active session                    |
| GET    | `/backend/api/dashboard.php`    | Protected — returns session user data         |

All endpoints return JSON and expect `Content-Type: application/json` (or `FormData` depending on implementation).

---

##  Security Measures

- **Password hashing** — `password_hash($password, PASSWORD_DEFAULT)` (bcrypt as of PHP 8+)
- **Password verification** — `password_verify($input, $storedHash)`
- **SQL injection protection** — every query uses `mysqli_prepare()` with `bind_param()`
- **Input validation** — both client-side (React) and server-side (PHP)
- **Session guard** — dashboard routes verify the session on both client and server
- **CORS with credentials** — server sends:

  ```php
  header("Access-Control-Allow-Origin: http://localhost:5173");
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type");
  ```

- **Fetch requests from React** include `credentials: 'include'`

---

##  Challenges Faced

### CORS Policy with Credentials

The biggest challenge was getting the browser to accept cross-origin requests **with cookies**. By default:

- `Access-Control-Allow-Origin: *` **cannot** be combined with `Access-Control-Allow-Credentials: true`
- The browser blocks the response if the origin isn't explicitly whitelisted

**Solution:**

- Set the exact origin (`http://localhost:5173`) instead of `*`
- Send `Access-Control-Allow-Credentials: true` from PHP
- Include `credentials: 'include'` in every `fetch()` call on the React side
- Handle the `OPTIONS` preflight request explicitly and return `200 OK`

This taught me how the browser enforces the same-origin policy and how session cookies actually travel between React and PHP.

---

##  Known Limitations

- The UI is **not fully responsive** — the focus of this project was backend logic and authentication flow
- No "forgot password" or email verification flow
- HTTP-only in local development — **use HTTPS in production** so cookies are sent securely
- Session cookie settings (`SameSite`, `Secure`, `HttpOnly`) should be tightened for production

---

##  What I Learned

- How session-based authentication actually works under the hood
- Why hashing with bcrypt is essential and how `password_hash` / `password_verify` pair up
- How to safely use `mysqli` prepared statements
- How React Router guards routes and how to combine client + server auth checks
- How CORS and credentialed requests interact — and why `*` doesn't work with cookies

---

## Author

**Subash Shrestha**
- GitHub: [@Subashstha769](https://github.com/Subashstha769)