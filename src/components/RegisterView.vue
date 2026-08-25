<script setup>
import { ref } from 'vue'

const emit = defineEmits(['register-success', 'switch-to-login'])

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const errorMessage = ref('')

function handleRegister() {
  errorMessage.value = ''

  if (!fullName.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Please fill in all fields.'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  emit('register-success')
}
</script>

<template>
  <div class="auth-card">
    <div class="auth-header">
      <div class="auth-logo">✓</div>
      <h2>Create Account</h2>
      <p>Sign up to manage your academic tasks effectively</p>
    </div>

    <form @submit.prevent="handleRegister" class="auth-form">
      <div v-if="errorMessage" class="error-banner">
        {{ errorMessage }}
      </div>

      <div class="form-group">
        <label>Full Name</label>
        <input v-model="fullName" type="text" placeholder="Enter your full name" required />
      </div>

      <div class="form-group">
        <label>Email Address</label>
        <input v-model="email" type="email" placeholder="Enter your email" required />
      </div>

      <div class="form-group">
        <label>Password</label>
        <div class="password-wrapper">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Create a password"
            required
          />
          <button type="button" class="toggle-pwd-btn" @click="showPassword = !showPassword">
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
        </div>
      </div>

      <div class="form-group">
        <label>Confirm Password</label>
        <div class="password-wrapper">
          <input
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Confirm your password"
            required
          />
          <button type="button" class="toggle-pwd-btn" @click="showConfirmPassword = !showConfirmPassword">
            {{ showConfirmPassword ? 'Hide' : 'Show' }}
          </button>
        </div>
      </div>

      <button type="submit" class="submit-btn">Register</button>
    </form>

    <div class="auth-footer">
      <span>Already have an account?</span>
      <button type="button" @click="emit('switch-to-login')" class="toggle-btn">
        Log in here
      </button>
    </div>
  </div>
</template>

<style scoped>
.auth-card {
  background-color: #161f32;
  border: 1px solid #232f48;
  border-radius: 12px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  color: #f3f4f6;
}
.auth-header { text-align: center; margin-bottom: 2rem; }
.auth-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: #2563eb;
  color: #ffffff;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.auth-header h2 { margin: 0; font-size: 1.5rem; font-weight: 700; color: #ffffff; }
.auth-header p { margin-top: 0.5rem; font-size: 0.875rem; color: #9ca3af; }
.auth-form { display: flex; flex-direction: column; gap: 1.25rem; }
.error-banner {
  background-color: rgba(239, 68, 68, 0.15);
  border: 1px solid #ef4444;
  color: #fca5a5;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  text-align: center;
}
.form-group { display: flex; flex-direction: column; gap: 0.5rem; }
.form-group label { font-size: 0.875rem; font-weight: 500; color: #d1d5db; }
.form-group input {
  background-color: #0b1120;
  border: 1px solid #232f48;
  border-radius: 6px;
  padding: 0.75rem 1rem;
  color: #ffffff;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease;
  width: 100%;
  box-sizing: border-box;
}
.form-group input:focus { border-color: #3b82f6; }
.password-wrapper { position: relative; display: flex; align-items: center; }
.password-wrapper input { padding-right: 3.5rem; }
.toggle-pwd-btn {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: #60a5fa;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.25rem;
}
.toggle-pwd-btn:hover { color: #93c5fd; }
.submit-btn {
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 0.85rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 0.5rem;
}
.submit-btn:hover { background-color: #1d4ed8; }
.auth-footer {
  margin-top: 1.75rem;
  text-align: center;
  font-size: 0.875rem;
  color: #9ca3af;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
.toggle-btn {
  background: none;
  border: none;
  color: #60a5fa;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  font-size: 0.875rem;
}
.toggle-btn:hover { text-decoration: underline; }
</style>