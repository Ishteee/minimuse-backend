# 🎵 MiniMuse - Backend

This repository contains the Node.js backend for the MiniMuse music application. It's built with Express.js, Knex.js, and SQLite to provide a simple yet powerful REST API for the Flutter frontend.

---

## ✨ Live Deployment & Evaluator's Guide

> To make your evaluation process as seamless as possible, **this backend is already deployed and live on Render**. You **do not** need to run it locally to evaluate the Flutter application.
>
> The GitHub repository for the backend is available [here](https://github.com/Ishteee/minimuse-backend).
>
> After deploying the backend, the API calls in the Flutter frontend were updated to point to the Render deployment, so all requests go directly to the live backend.

- **Live URL:** `[https://minimuse-backend.onrender.com]`

**Important Note:** This backend is hosted on Render's free tier, which uses an **ephemeral file system**. This means the SQLite database is automatically reset and re-seeded with sample data on each deployment and after periods of inactivity. Any new data created through the app (such as new user profiles or uploaded tracks) will not be persisted long-term on the deployed version. This was a deliberate choice to provide a consistent, fresh dataset for evaluation purposes within the constraints of free hosting.

---

## 🛠️ Tech Stack & Packages Used

### Core Technologies
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite3
- **Query Builder:** Knex.js

### Why these choices?
- **Express.js** was chosen for its minimalist and flexible nature, perfect for creating a clean REST API.
- **SQLite** was selected for its simplicity and file-based nature, making local development and seeding incredibly easy without requiring a separate database server.
- **Knex.js** provides a powerful SQL query builder that prevents SQL injection and makes database interactions clean and maintainable. It also includes excellent migration and seeding tools, which are essential for managing the database schema and providing sample data.

---

## 📄 API Endpoints

The API provides all the necessary endpoints for the MiniMuse application.

| Method    | Endpoint                          | Description                                                                      |
| :-------- | :-------------------------------- | :--------------------------------------------------------------------------------|
| `POST`    | `/api/users`                      | Create a new user (creator or listener).                                         |
| `GET`     | `/api/users`                      | Get a user by name and password for login.                                       |
| `GET`     | `/api/creators`                   | Get all creators, their tracks, and avatar URLs.                                 |
| `POST`    | `/api/tracks`                     | Upload a new track.                                                              |
| `PUT`     | `/api/tracks/:trackId`            | Update an existing track's metadata.                                             |
| `DELETE`  | `/api/tracks/:trackId`            | Delete a track from the database and its associated files from Supabase storage. |
| `POST`    | `/api/subscriptions`              | Subscribe or unsubscribe from a creator.                                         |
| `GET`     | `/api/subscriptions/:listenerId` | Get a list of creators a user follows.                                            |
| `GET`     | `/api/analytics/:creatorId`       | Get a creator's subscriber and play counts.                                      |
| `POST`    | `/api/plays`                      | Log a track play event for analytics.                                            |

---

## 🚀 Run Instructions

### Prerequisites
   - Node.js (v18 or higher recommended).
   - `npm`.

### Local Setup
1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/Ishteee/minimuse-backend]
    cd minimuse-backend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Set Up the Database:**
    This single command will create the `minimuse.db` file, run all migrations to build the tables, and populate the database with a rich set of sample data.
    ```bash
    npx knex migrate:latest && npx knex seed:run
    ```

4.  **Start the Server:**
    ```bash
    node server.js
    ```
    The server will start on `http://localhost:3000`.

---

## 📝 Assumptions & Clarifications

### Assumptions
- The backend is designed to be a simple, stateless API to support the primary functionality of the Flutter app.
- Authentication is handled via a simple name/password check, which is sufficient for this project but would be replaced by a more secure system (e.g., JWT) in a full production application.

### Features Implemented
- Full CRUD operations for tracks, including file deletion from cloud storage.
- User creation and simple authentication.
- A subscription/following system.
- Basic analytics tracking for creators.

### Gaps
- The backend does not include real-time features (e.g., WebSockets).
- Error handling is functional but could be expanded with more specific error codes and logging for a production environment.
