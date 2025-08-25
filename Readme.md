# 🎓 Student Skill Portfolio Hub

A full-stack web application that allows students to create and manage their skill portfolios, while also enabling skill-based search to connect students with peers, mentors, or recruiters.  

This project is built using **Node.js + Express** with **PostgreSQL** as the database.  

---

## ✨ Features

- 🔐 **Authentication** (JWT-based login & registration)
- 🧑‍🎓 **Student Profiles**: Name, Branch, Year, Skills, GitHub, LinkedIn
- 📝 **Skill Management**: Add, edit, and delete skills
- 🔎 **Search**: Find students by skills
- 🛡 **Role-based access**: Admin & User views
- 📦 **PostgreSQL integration** for persistent storage

---

## 🛠 Tech Stack

**Backend**
- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Token)
- bcrypt.js

**Frontend**
- HTML, CSS, JavaScript

---


---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/ramta123chhipa/student_skill_portfolio_Hub.git
cd student_skill_portfolio_Hub

2. Install dependencies
npm install


3. Setup environment variables

Create a .env file in the server/ directory:

PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/studentdb
JWT_SECRET=your_jwt_secret

# OAuth (if using Google login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret


4. Run the server
npm start


Server will run on: http://localhost:5000


📌 API Endpoints
Auth

POST /api/auth/register → Register new student

POST /api/auth/login → Login student

Students

GET /api/students → Get all students

GET /api/students/:id → Get student by ID

POST /api/students → Add new student (protected)

PUT /api/students/:id → Update student (protected)

DELETE /api/students/:id → Delete student (protected)

Search

GET /api/students/search?skill=JavaScript → Search students by skill

🚀 Future Enhancements

📊 Analytics dashboard

🌐 Deployment on Render/Heroku + PostgreSQL cloud

📱 React frontend or Flutter app for mobile

🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.
