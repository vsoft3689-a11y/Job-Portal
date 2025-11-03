# 🎓 College & University Job Portal

A **full-stack web application** that bridges the gap between **colleges/universities** and **faculty or academic professionals**.  
Institutions can post job vacancies, and faculty members can browse, apply, and upload resumes with **automated email notifications**.

---

## 🚀 Tech Stack

### 🖥️ Frontend
- React.js (with React Router)
- Axios for API communication
- CSS / TailwindCSS for styling

### ⚙️ Backend
- Spring Boot (RESTful API)
- Spring Data JPA (ORM)
- Spring Mail (Email Notification)
- MySQL Database

---

## 🧩 Features

### 👨‍🏫 Faculty Module
- Register and login as a faculty member  
- Browse jobs by college, department, or title  
- Apply for jobs with resume upload  
- Receive an email confirmation upon application  

### 🏫 College / University Module
- Register and login as a college/university  
- Post new job vacancies with title, department, qualification, and salary  
- View list of applications for each posted job  
- Receive email notification when a faculty applies  

### 👨‍💼 Admin Module
- Manage users (faculty, college, admin)  
- Manage jobs and applications  
- Monitor platform activity  

---

## 📬 Email Notifications

| Type | Recipient | Description |
|------|------------|--------------|
| ✅ Application Confirmation | Faculty | Sent after successfully applying for a job |
| 📩 New Applicant Alert | College | Sent when a new faculty applies for a posted job |

Emails are sent using **Spring Mail (SMTP)** with **HTML templates** for professional formatting.

---

## 🛠️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/job-portal.git
cd job-portal
2️⃣ Backend Setup (Spring Boot)
Configure application.properties
properties

spring.datasource.url=jdbc:mysql://localhost:3306/job_portal
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update

# Email Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=youremail@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
Run Backend
bash
Copy code
mvn spring-boot:run
The backend will start at 👉 http://localhost:8080

3️⃣ Frontend Setup (React)
Install Dependencies
bash
Copy code
cd frontend
npm install
Run Development Server
bash
Copy code
npm run dev
The frontend will start at 👉 http://localhost:5173

🧱 Folder Structure
Frontend (/frontend)
css
Copy code
src/
 ┣ components/
 ┃ ┣ Navbar.jsx
 ┃ ┣ Footer.jsx
 ┃ ┗ LandingPage.jsx
 ┣ pages/
 ┃ ┣ LoginPage.jsx
 ┃ ┣ RegisterPage.jsx
 ┃ ┣ CollegeDashboard.jsx
 ┃ ┣ FacultyDashboard.jsx
 ┃ ┣ JobList.jsx
 ┃ ┗ JobDetails.jsx
 ┣ api/
 ┃ ┗ api.js
 ┣ App.jsx
 ┗ index.js
Backend (/backend)
swift
Copy code
src/main/java/com/jobportal/Job_Portal/
 ┣ controller/
 ┃ ┣ UserController.java
 ┃ ┣ FacultyController.java
 ┃ ┣ CollegeController.java
 ┃ ┣ JobController.java
 ┃ ┗ ApplicationController.java
 ┣ entity/
 ┃ ┣ User.java
 ┃ ┣ Faculty.java
 ┃ ┣ College.java
 ┃ ┣ Job.java
 ┃ ┗ Application.java
 ┣ repository/
 ┃ ┣ UserRepository.java
 ┃ ┣ FacultyRepository.java
 ┃ ┣ CollegeRepository.java
 ┃ ┣ JobRepository.java
 ┃ ┗ ApplicationRepository.java
 ┣ service/
 ┃ ┣ EmailService.java
 ┃ ┗ JobService.java
 ┗ JobPortalApplication.java
📄 API Endpoints
User APIs
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login user
GET	/api/users/{id}	Get user by ID

College APIs
Method	Endpoint	Description
POST	/api/college/jobs	Post a new job
GET	/api/college/jobs/{collegeId}	View jobs by college

Faculty APIs
Method	Endpoint	Description
GET	/api/faculty/{userId}	Get faculty profile
POST	/api/applications	Apply for a job

💌 Sample Email Templates
Applicant Confirmation
Subject: ✅ Job Application Submitted Successfully
Body:
Dear Applicant,
You have successfully applied for the position of Assistant Professor (CSE Department).
We’ll notify you once your application is reviewed.

Employer Notification
Subject: 📩 New Applicant for Assistant Professor (CSE Department)
Body:
Dear Employer,
A new applicant Dr. Priya Sharma has applied for your job posting.
Please review the application in your dashboard.

🧠 Future Enhancements
JWT Authentication & Role-based Access

File Storage Integration (AWS S3 / Cloudinary)

Admin Analytics Dashboard

Email Templates using Thymeleaf

Notification System with WebSockets


🪪 License
This project is licensed under the MIT License.
Feel free to use, modify, and distribute.