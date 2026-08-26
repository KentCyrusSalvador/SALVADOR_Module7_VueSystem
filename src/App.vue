<script setup>
import LoginView from './components/LoginView.vue'
import RegisterView from './components/RegisterView.vue'
import AppHeader from './components/AppHeader.vue'
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'
import AppFooter from './components/AppFooter.vue'
import { ref, computed, onMounted, watch } from 'vue'

const isLoggedIn = ref(false)
const authMode = ref('login')

function handleAuthSuccess() {
  isLoggedIn.value = true
}

function handleRegisterSuccess() {
  alert('Account created successfully! Please log in.')
  authMode.value = 'login'
}

function handleLogout() {
  isLoggedIn.value = false
  authMode.value = 'login'
}

const tasks = ref([])
const searchTerm = ref('')
const statusFilter = ref('All')
const editingId = ref(null)

const sidebarOpen = ref(false)
const darkMode = ref(true)
const activeSection = ref('Dashboard')

const formMessage = ref('')
const formMessageType = ref('success')

onMounted(() => {
  const savedTasks = localStorage.getItem('module7-tasks')
  const savedTheme = localStorage.getItem('module7-theme')

  if (savedTasks) {
    try {
      tasks.value = JSON.parse(savedTasks)
    } catch {
      tasks.value = []
    }
  }

  if (savedTheme) {
    darkMode.value = savedTheme === 'dark'
  }
})

watch(
  tasks,
  () => {
    localStorage.setItem('module7-tasks', JSON.stringify(tasks.value))
  },
  { deep: true }
)

watch(darkMode, value => {
  localStorage.setItem('module7-theme', value ? 'dark' : 'light')
})

function showFormMessage(message, type = 'success') {
  formMessage.value = message
  formMessageType.value = type
  setTimeout(() => { formMessage.value = '' }, 3000)
}

function addTask(newTask) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const dueDate = new Date(newTask.dueDate)
  dueDate.setHours(0, 0, 0, 0)

  if (dueDate < today) {
    showFormMessage(
      'Due date cannot be in the past.',
      'error'
    )
    return
  }

  tasks.value.push({
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...newTask
  })
  showFormMessage('Task added successfully!')
}

function startEdit(task) {
  editingId.value = task.id
  activeSection.value = 'Add Task'
  setTimeout(() => {
    document.getElementById('task-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 50)
}

function updateTask(updatedTask) {
  const index = tasks.value.findIndex(task => task.id === editingId.value)
  if (index !== -1) {
    tasks.value[index] = {
      ...tasks.value[index],
      ...updatedTask,
      updatedAt: new Date().toISOString()
    }
    showFormMessage('Task updated successfully!')
  }
  editingId.value = null
}

function cancelEdit() {
  editingId.value = null
  formMessage.value = ''
}

function deleteTask(id) {
  if (window.confirm('Are you sure you want to delete this task?')) {
    tasks.value = tasks.value.filter(task => task.id !== id)
  }
}

const totalTasks = computed(() => tasks.value.length)
const pendingTasks = computed(() => tasks.value.filter(task => task.status === 'Pending').length)
const inProgressTasks = computed(() => tasks.value.filter(task => task.status === 'In Progress').length)
const completedTasks = computed(() => tasks.value.filter(task => task.status === 'Completed').length)

const completionPercentage = computed(() => {
  if (totalTasks.value === 0) return 0
  return Math.round((completedTasks.value / totalTasks.value) * 100)
})

const filteredTasks = computed(() => {
  const keyword = searchTerm.value.toLowerCase().trim()
  return tasks.value.filter(task => {
    const matchesSearch =
      !keyword ||
      task.title.toLowerCase().includes(keyword) ||
      task.description.toLowerCase().includes(keyword) ||
      task.category.toLowerCase().includes(keyword) ||
      task.priority.toLowerCase().includes(keyword)

    const matchesStatus = statusFilter.value === 'All' || task.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

const upcomingTasks = computed(() => {
  return tasks.value
    .filter(task => task.status !== 'Completed')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 6)
})

const today = computed(() => {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
})

function getDaysLeft(dateString) {
  if (!dateString) return null
  const due = new Date(dateString)
  due.setHours(0, 0, 0, 0)
  return Math.ceil((due.getTime() - today.value.getTime()) / (1000 * 60 * 60 * 24))
}

function getDeadlineText(dateString) {
  const days = getDaysLeft(dateString)
  if (days < 0) return `${Math.abs(days)} day${Math.abs(days) === 1 ? '' : 's'} overdue`
  if (days === 0) return 'Due today'
  if (days === 1) return 'Due tomorrow'
  return `${days} days left`
}

function getDeadlineClass(dateString) {
  const days = getDaysLeft(dateString)
  if (days < 0) return 'overdue'
  if (days <= 2) return 'due-soon'
  return 'normal'
}

function toggleSidebar() { sidebarOpen.value = !sidebarOpen.value }
function closeSidebar() { sidebarOpen.value = false }
function toggleTheme() { darkMode.value = !darkMode.value }

function goToSection(section) {
  activeSection.value = section
  closeSidebar()
  const sectionIds = {
    'Dashboard': null,
    'My Tasks': 'task-list',
    'Add Task': 'task-form',
    'Calendar': 'calendar-section',
    'Statistics': 'statistics-section'
  }
  if (section === 'Dashboard') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else if (sectionIds[section]) {
    document.getElementById(sectionIds[section])?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div class="app-shell" :class="darkMode ? 'theme-dark' : 'theme-light'">
    <div v-if="!isLoggedIn" class="login-wrapper">
      <LoginView
        v-if="authMode === 'login'"
        @login-success="handleAuthSuccess"
        @switch-to-register="authMode = 'register'"
      />
      <RegisterView
        v-else
        @register-success="handleRegisterSuccess"
        @switch-to-login="authMode = 'login'"
      />
    </div>

    <template v-else>
      <AppHeader
        :dark-mode="darkMode"
        @toggle-sidebar="toggleSidebar"
        @toggle-theme="toggleTheme"
        @logout="handleLogout"
      />

      <Transition name="fade">
        <div v-if="sidebarOpen" class="mobile-overlay" @click="closeSidebar"></div>
      </Transition>

      <Transition name="sidebar">
        <aside v-if="sidebarOpen" class="sidebar">
          <div class="sidebar-content">
            <div class="sidebar-brand">
              <div class="brand-icon">✓</div>
              <div>
                <h2>Student Task Manager</h2>
                <p>Organize. Plan. Achieve.</p>
              </div>
            </div>

            <nav class="sidebar-nav">
              <button class="nav-item" :class="{ active: activeSection === 'Dashboard' }" @click="goToSection('Dashboard')"><span>⌂</span> Dashboard</button>
              <button class="nav-item" :class="{ active: activeSection === 'My Tasks' }" @click="goToSection('My Tasks')"><span>☷</span> My Tasks</button>
              <button class="nav-item" :class="{ active: activeSection === 'Add Task' }" @click="goToSection('Add Task')"><span>＋</span> Add Task</button>
              <button class="nav-item" :class="{ active: activeSection === 'Calendar' }" @click="goToSection('Calendar')"><span>□</span> Calendar</button>
              <button class="nav-item" :class="{ active: activeSection === 'Statistics' }" @click="goToSection('Statistics')"><span>▥</span> Statistics</button>
              <button class="nav-item logout-btn" @click="handleLogout"><span>➔</span> Logout</button>
            </nav>

            <div class="menu-theme-card">
              <span>{{ darkMode ? '☾' : '☀' }}</span>
              <div>
                <strong>{{ darkMode ? 'Night Mode' : 'Light Mode' }}</strong>
                <p>Change appearance</p>
              </div>
              <button @click="toggleTheme">Switch</button>
            </div>
          </div>
        </aside>
      </Transition>

      <main class="main-content">
        <div class="content-wrapper">
          <section id="dashboard-section" class="page-heading">
            <div>
              <span class="eyebrow">STUDENT WORKSPACE</span>
              <h1>Student Task Management System</h1>
              <p>Manage your academic tasks, deadlines, and progress in one place.</p>
            </div>
            <button class="primary-button heading-button" @click="goToSection('Add Task')">＋ Add New Task</button>
          </section>

          <section id="statistics-section" class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon blue-icon">▣</div>
              <div><span>Total Tasks</span><strong>{{ totalTasks }}</strong><small>All tasks</small></div>
            </div>
            <div class="stat-card">
              <div class="stat-icon yellow-icon">◷</div>
              <div><span>Pending</span><strong>{{ pendingTasks }}</strong><small>Tasks to do</small></div>
            </div>
            <div class="stat-card">
              <div class="stat-icon purple-icon">◌</div>
              <div><span>In Progress</span><strong>{{ inProgressTasks }}</strong><small>Keep going</small></div>
            </div>
            <div class="stat-card">
              <div class="stat-icon green-icon">✓</div>
              <div><span>Completed</span><strong>{{ completedTasks }}</strong><small>Well done!</small></div>
            </div>
          </section>

          <section class="progress-panel">
            <div class="progress-header">
              <div>
                <span class="panel-label">OVERALL PROGRESS</span>
                <h2>Task Completion</h2>
              </div>
              <strong>{{ completionPercentage }}%</strong>
            </div>
            <div class="progress-track">
              <div class="progress-fill" :style="{ width: completionPercentage + '%' }"></div>
            </div>
            <div class="progress-info">
              <span>{{ completedTasks }} of {{ totalTasks }} tasks completed</span>
              <span>Keep going!</span>
            </div>
          </section>

          <section class="workspace-grid">
            <div id="task-form">
              <TaskForm
                :editing-task="editingId ? tasks.find(task => task.id === editingId) : null"
                :message="formMessage"
                :message-type="formMessageType"
                @add-task="addTask"
                @update-task="updateTask"
                @cancel-edit="cancelEdit"
              />
            </div>

            <div id="task-list">
              <section class="panel task-panel">
                <div class="panel-header">
                  <div>
                    <span class="panel-label">TASK OVERVIEW</span>
                    <h2>My Tasks</h2>
                    <p>{{ filteredTasks.length }} task(s) displayed</p>
                  </div>
                  <div class="task-tools">
                    <div class="search-box">
                      <span>⌕</span>
                      <input v-model="searchTerm" type="text" placeholder="Search tasks..." />
                    </div>
                    <select v-model="statusFilter" class="status-filter">
                      <option value="All">All</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <TaskList
                  :tasks="filteredTasks"
                  @edit-task="startEdit"
                  @delete-task="deleteTask"
                  :get-deadline-text="getDeadlineText"
                  :get-deadline-class="getDeadlineClass"
                />
              </section>
            </div>
          </section>

          <section id="calendar-section" class="extra-section">
            <div class="extra-section-header">
              <span class="panel-label">DEADLINES</span>
              <h2>Upcoming Tasks</h2>
              <p>Your upcoming academic deadlines.</p>
            </div>

            <div v-if="upcomingTasks.length === 0" class="calendar-empty">
              <div class="empty-calendar-icon">✓</div>
              <strong>No upcoming tasks</strong>
              <p>You're all caught up!</p>
            </div>

            <div v-else class="upcoming-grid">
              <div v-for="task in upcomingTasks" :key="task.id" class="upcoming-card">
                <div class="calendar-date">📅</div>
                <div class="upcoming-info">
                  <strong>{{ task.title }}</strong>
                  <span>{{ task.category }} • {{ task.dueDate }}</span>
                </div>
                <span class="deadline-label" :class="getDeadlineClass(task.dueDate)">
                  {{ getDeadlineText(task.dueDate) }}
                </span>
              </div>
            </div>
          </section>
        </div>

        <nav class="mobile-bottom-nav">
          <button :class="{ active: activeSection === 'Dashboard' }" @click="goToSection('Dashboard')"><span>⌂</span> Home</button>
          <button :class="{ active: activeSection === 'My Tasks' }" @click="goToSection('My Tasks')"><span>☷</span> Tasks</button>
          <button class="mobile-add" @click="goToSection('Add Task')"><span>＋</span> Add</button>
          <button @click="goToSection('Calendar')"><span>□</span> Calendar</button>
          <button @click="toggleSidebar"><span>•••</span> More</button>
        </nav>

        <AppFooter />
      </main>
    </template>
  </div>
</template>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: #0b1120;
}
</style>