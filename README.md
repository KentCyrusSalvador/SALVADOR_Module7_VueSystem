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