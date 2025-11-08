# Job Portal App  
A Full Stack Job Portal Application built with **React (Vite)**, **Node.js**, **Express**, and **MongoDB**.  
This project includes a complete authentication system, job posting, job search, job application, resume upload, and dark mode support.

---

## 🚀 Features

### ✅ Authentication
- User Signup/Login (JWT-based)
- Role-based access: **Job Seeker** & **Employer**
- Protected routes on both backend & frontend

### ✅ Employer Features
- Post new jobs
- Delete jobs
- View all applicants for a job
- See resume files uploaded by applicants

### ✅ Job Seeker Features
- Browse available jobs
- Search by title, company, or location
- Filter using tags
- Save jobs (LocalStorage)
- Apply to jobs with resume upload (PDF/DOC)
- Dark mode (persistent)

### ✅ User Interface Enhancements
- Modern UI with animations
- Skeleton loaders & spinners
- Toast notifications
- Responsive design
- Modal popups for job details & applicants

### ✅ Backend Features
- MongoDB database connection
- Secure password hashing
- Upload handling using multer
- Auth middleware for route security
- Clean MVC structure

---

## 🛠️ Tech Stack

### **Frontend**
- React (Vite)
- React Hooks
- Axios
- CSS3
- LocalStorage

### **Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- Multer (File uploads)
- JSON Web Tokens (JWT)
- bcrypt.js

---
## 📁 Folder Structure


Job-Portal-App/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── uploads/
│ ├── server.js
│ ├── package.json
│ └── .env.example
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── services/
│ │ └── styles.css
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
│
├── .gitignore
└── README.md

---

## 🔧 Installation & Running the Project

### ✅ 1. Clone the repository

git clone https://github.com/mahakmehadia16/Job-Portal-App.git

### ✅ 2. Setup Backend
cd backend
npm install

Create `.env` file (based on `.env.example`):

PORT=5000
MONGO_URI=mongodb://localhost:27017/job_portal_db
JWT_SECRET=your_secret_key

Run backend:
npm run dev


### ✅ 3. Setup Frontend
Open a new terminal:
cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:3000

Backend runs on:
http://localhost:5000

---

## ✅ Screenshots (Optional)
Add screenshots of:
- Login page  
- Signup page  
- Home page  
- Job posting  
- Applicants list  
- Dark mode  

---

## ✅ Project Status
✔ Fully functional  
✔ Ready for submission  
✔ Clean folder structure  
✔ Secure & modular  
✔ Modern UI with animations  

---

## 📌 Author
**Mahak Mehadia**
