# Task Manager

A simple **Task Management App** built with **Next.js 13**, **TypeScript**, **Prisma**, and **PostgreSQL**.  
Users can register, login, manage tasks, set priorities, due dates, and mark tasks as completed.

---

## Features

- User Authentication: Login, Logout  
- Task Management: Add, Edit, Delete, Complete tasks  
- Task Priority: Low, Medium, High  
- Due Dates for tasks  
- Responsive UI with **Tailwind CSS**  
- Modal-based editing using **shadcn/ui** components  
- Toast notifications for actions  

---

## Tech Stack

- **Frontend:** Next.js 13, React, TypeScript  
- **Backend:** Next.js API Routes, Prisma, PostgreSQL  
- **UI:** Tailwind CSS, shadcn/ui, Lucide icons  
- **State:** React Context (`AuthProvider`)  
- **Form Handling:** React Hook Form  

---

## Getting Started

1. Clone the repo  
```bash
git clone https://github.com/yourusername/task_manager.git
cd task_manager
Install dependencies

bash
Copy code
npm install
Setup .env

env
Copy code
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME
NEXTAUTH_SECRET=your-secret-key
Run Prisma migrations

bash
Copy code
npx prisma migrate dev --name init
Start development server

bash
Copy code
npm run dev
Open http://localhost:3000

API Routes
Route	Method	Description
/api/auth/login	POST	Login user
/api/auth/logout	POST	Logout user
/api/taskList	GET	Fetch user tasks
/api/deletetask/[id]	DELETE	Delete task
/api/toggleTask/[id]	PATCH	Mark task complete
/api/editTask/[id]	PATCH	Edit task