# Student Task Management System

A responsive **Vue.js Student Task Management System** developed for **Module 7 – Design and Implementation Activity**.

The system helps students organize academic tasks, monitor deadlines, manage priorities, and track task progress through a simple and modern interface.

---

## 🌐 Live System

**Student Task Management System:**

https://kentcyrussalvador.github.io/SALVADOR_Module7_VueSystem/

---

## 📌 Project Information

**Project:** Module 7 – Design and Implementation  
**System:** Student Task Management System  
**Developer:** Kent Cyrus Salvador  
**Course & Section:** BSCS 3A  
**Technology:** Vue.js + Vite  

---

## ✨ Features

- Add new academic tasks
- Edit existing tasks
- Delete tasks
- Search tasks
- Filter tasks by status
- Set task categories
- Set task priorities
- Set task due dates
- Track Pending tasks
- Track In Progress tasks
- Track Completed tasks
- Automatic task statistics
- Task completion progress bar
- Upcoming deadline display
- Overdue task detection
- Due-soon notifications
- Dark/Night Mode
- Light Mode
- Functional hamburger navigation menu
- Responsive mobile design
- Local storage for saving tasks
- GitHub Pages deployment

---

## 🖥️ System Functions

### Dashboard

The dashboard provides an overview of the student's tasks and displays:

- Total Tasks
- Pending Tasks
- In Progress Tasks
- Completed Tasks
- Overall completion percentage

### Add Task

Users can create a task by entering:

- Task Title
- Description
- Category
- Priority
- Status
- Due Date

### Edit Task

Users can modify the information of an existing task.

### Delete Task

Users can remove tasks from the system after confirmation.

### Search and Filter

Users can search for tasks and filter them based on their current status.

### Deadline Tracking

The system identifies:

- Upcoming deadlines
- Tasks due soon
- Overdue tasks
- Completed tasks

### Theme

The system supports:

- Night/Dark Mode
- Light Mode

### Responsive Design

The interface adapts to:

- Desktop computers
- Tablets
- Mobile devices

---

## 🛠️ Technologies Used

- Vue.js
- Vite
- JavaScript
- HTML5
- CSS3
- Git
- GitHub
- GitHub Actions
- GitHub Pages
- LocalStorage

---

## 📂 Project Structure

```text
SALVADOR_Module7_VueSystem/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── AppFooter.vue
│   │   ├── AppHeader.vue
│   │   ├── TaskForm.vue
│   │   └── TaskList.vue
│   │
│   ├── App.vue
│   ├── main.js
│   └── style.css
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
## Module 9 - Software Evolution

### Change Request

**CR-M9-01 - Password Strength and Login Validation Improvement**

**Maintenance Type:** Preventive Maintenance

The authentication interface was evolved to provide password-strength feedback and clear password requirements while preserving the existing login and registration behavior.

### Affected Component

- `src/components/LoginView.vue`

### Evolution Implemented

- Added password-strength feedback.
- Added password requirements for stronger passwords.
- Added validation feedback while entering a password.
- Preserved the existing login and registration interface.
- Preserved existing tested behavior.

### Testing Results

- Automated tests: **7 passed**
- Test files: **2 passed**
- Production build: **Successful**
- GitHub Actions CI: **Successful**

### Regression Testing

The existing Module 8 automated tests were retained and executed after the change. All existing tests continued to pass.

### Version

**1.1.0**

### Known Limitations

The change is limited to the authentication interface. No new backend, database, API, or unrelated system functionality was introduced.
## M9-08 — Updated Test Cases

### Manual Test Cases and Results

| Test Case | Expected Result | Actual Result | Status |
|---|---|---|---|
| Password with 8 or more characters | 8-character requirement is satisfied | Requirement is satisfied | PASS |
| Password contains uppercase letter | Uppercase requirement is satisfied | Requirement is satisfied | PASS |
| Password contains lowercase letter | Lowercase requirement is satisfied | Requirement is satisfied | PASS |
| Password contains a number | Number requirement is satisfied | Requirement is satisfied | PASS |
| Password contains a special character | Special-character requirement is satisfied | Requirement is satisfied | PASS |
| All password requirements are satisfied | Password strength shows Strong | Password strength shows Strong | PASS |
| Confirm Password matches Password | Registration can proceed | Passwords match | PASS |