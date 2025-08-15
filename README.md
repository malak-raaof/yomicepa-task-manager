Gotcha — you want the README as **one single continuous markdown file** exactly how it will look in GitHub, no visual splits like I did earlier.

Here’s the **final `README.md`** — just copy this entire block into a file named `README.md` in the root of your repo:

---

````markdown
# 📝 Yomicepa Task Manager

A fullstack task management application with authentication, built using **TypeScript**, **Express**, **Prisma**, **MySQL**, and **React (Vite + Tailwind)**.

This project allows users to sign up, sign in, and manage their personal tasks with CRUD operations and completion tracking.

## 🚀 Tech Stack
**Backend:**
- Node.js + Express
- TypeScript
- Prisma ORM
- MySQL
- JWT authentication
- Swagger API docs

**Frontend:**
- React + TypeScript
- Vite
- Tailwind CSS
- Axios

## 📦 Prerequisites
Before running the project, ensure you have:
- [Node.js](https://nodejs.org/) v20+
- [pnpm](https://pnpm.io/) (recommended for faster installs)
- [MySQL](https://dev.mysql.com/downloads/mysql/) (running locally on your machine)
- [Git](https://git-scm.com/)

## ⚙️ Installation & Running
### 1️⃣ Clone the repository
```bash
git clone https://github.com/malak-raaof/yomicepa-task-manager.git
cd yomicepa-task-manager
````

### 2️⃣ Backend Setup

```bash
cd backend
pnpm install
```

**Create `.env` file** (based on `.env.example`):

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3307/yomicepa"
JWT_SECRET="super-secret-key"
```

**Run database migrations**:

```bash
pnpm prisma:migrate
```

**Start the backend server**:

```bash
pnpm dev
```

Backend runs at: `http://localhost:4000`
Swagger docs: `http://localhost:4000/docs`

### 3️⃣ Frontend Setup

Open another terminal:

```bash
cd frontend
pnpm install
pnpm dev
```

Frontend runs at: `http://localhost:5173`

## 📌 Key Implementation Decisions

1. **Prisma ORM with MySQL**

   * Rationale: Type-safe queries, easier migrations, works well with TypeScript.
2. **JWT-based Authentication**

   * Rationale: Decoupled auth, scalable, mobile-friendly.
3. **Folder Structure**

   * Backend routes split into `auth` and `tasks` for clarity.
   * Frontend pages split into `pages/` with global state in `contexts/`.
4. **Vite + Tailwind for Frontend**

   * Rationale: Fast dev server and utility-first CSS framework.
5. **.gitignore & Environment Variables**

   * Secrets (`.env`) and dependencies excluded from Git.

## 📬 API Documentation & Testing

The repository includes a **Postman collection**:
`docs/Yomicepa Task Manager.postman_collection.json`

**Contains:**

* **Auth**

  * `POST /auth/signup`
  * `POST /auth/signin`
* **Tasks**

  * `GET /tasks`
  * `POST /tasks`
  * `PUT /tasks/:id`
  * `DELETE /tasks/:id`
  * `PATCH /tasks/:id/toggle`

Import into Postman → set `{{base_url}}` to your backend URL (`http://localhost:4000`).

## 🔮 Future Improvements

* User profile editing
* Task categories/tags
* Pagination
* Deployment (Vercel + Render/Heroku)

## 👨‍💻 Author

**Malak Raaof** — [GitHub](https://github.com/malak-raaof)

```
