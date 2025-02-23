# Task Manager APP

## Live Demo
https://drive.google.com/file/d/1KtKggALHfXMV7tAcTscFXPaE91vrBAtw/view?usp=drive_link

## How to Run the Project

### **Clone & Checkout the Branch**
If this branch is **not merged**, first checkout the correct branch:
```sh
git checkout sylvie-wu/task-manager
```

---
## **Backend Setup** (Node.js + Express + Prisma + PostgreSQL)
### 1️. Navigate to the Backend Directory
```sh
cd server
```

### 2️. Install Dependencies
```sh
npm install
```

### 3️. Set Up Environment Variables
- **Edit `.env.example` and replace it with your database credentials & JWT secret.**
- Example values:
  ```env
  DATABASE_URL="postgresql://xinruiwu:managetask@localhost:5432/taskmanager?schema=public"
  JWT_SECRET="d4f1a8b927c3e5f6d29a7e3f14b2c9d85e6a41d37c5f7d2b39e6f8a21c5d7e8f"
  ```
- Then, **create the `.env` file**:
  ```sh
  cp .env.example .env
  ```

### 4️. Apply Database Migrations
```sh
npx prisma migrate dev
```

### 5️. Generate Prisma Client
```sh
npx prisma generate
```

### 6️. Start the Backend Server
```sh
npm run dev
```

### 7️. (Optional) Check Database Visually
```sh
npx prisma studio
```
This will open a **GUI** to view and manage database records.

---
## **Frontend Setup** (React + TypeScript + Vite)
### 1️. Open Another Terminal
Navigate to the frontend directory:
```sh
cd client
```

### 2️. Install Dependencies
```sh
npm install
```

### 3️. Start the Frontend Server
```sh
npm run dev
```

The frontend should now be running at **`http://localhost:5173`** (or another port if 5173 is occupied).

---
## **Testing API Endpoints in Postman**
### 1️. Register a New User
```http
POST http://localhost:5120/auth/register
Content-Type: application/json
```
```json
{
  "username": "testuser",
  "password": "password123"
}
```

### 2️. Login to Get JWT Token
```http
POST http://localhost:5120/auth/login
Content-Type: application/json
```
```json
{
  "username": "testuser",
  "password": "password123"
}
```
Response:
```json
{
  "token": "your_generated_jwt_token"
}
```

### 3️. Create a Task (Authenticated)
```http
POST http://localhost:5120/tasks
Authorization: Bearer your_generated_jwt_token
Content-Type: application/json
```
```json
{
  "title": "First Task",
  "description": "This is my first task"
}
```

### 4️. Get All Tasks
```http
GET http://localhost:5120/tasks
Authorization: Bearer your_generated_jwt_token
```

---
## **Common Issues & Fixes**
### **Error: `DATABASE_URL is not defined in environment variables`**
 **Fix:** Ensure `.env` exists and contains `DATABASE_URL`. Run:
```sh
echo $DATABASE_URL
```
If it's empty, try reloading environment variables:
```sh
source .env
```
Then restart the server.

###  **Error: `Error: Cannot find module '.prisma/client'`**
**Fix:** Run:
```sh
npx prisma generate
```

## Salary Expection
I can do both unpaid or paid from $20-30/hr as listed in the job description, so it will be about $1732 - 2598 if paid.