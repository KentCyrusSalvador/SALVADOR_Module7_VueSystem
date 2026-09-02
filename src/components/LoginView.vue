<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['login-success', 'switch-to-register'])

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')

const passwordChecks = computed(() => ({
  length: password.value.length >= 8,
  uppercase: /[A-Z]/.test(password.value),
  lowercase: /[a-z]/.test(password.value),
  number: /[0-9]/.test(password.value),
  special: /[^A-Za-z0-9]/.test(password.value)
}))

const passwordScore = computed(() => {
  if (!password.value) return 0

  return Object.values(passwordChecks.value).filter(Boolean).length
})

const passwordStrength = computed(() => {
  const score = passwordScore.value

  if (!password.value) {
    return {
      label: '',
      className: '',
      percentage: 0
    }
  }

  if (score <= 2) {
    return {
      label: 'Weak',
      className: 'weak',
      percentage: 25
    }
  }

  if (score === 3) {
    return {
      label: 'Fair',
      className: 'fair',
      percentage: 50
    }
  }

  if (score === 4) {
    return {
      label: 'Good',
      className: 'good',
      percentage: 75
    }
  }

  return {
    label: 'Strong',
    className: 'strong',
    percentage: 100
  }
})

function handleLogin() {
  errorMessage.value = ''

  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter both email and password.'
    return
  }

  const savedUser = localStorage.getItem('studentUser')

  if (!savedUser) {
    errorMessage.value =
      'No registered account found. Please register first.'
    return
  }

  let user

  try {
    user = JSON.parse(savedUser)
  } catch {
    errorMessage.value =
      'Account data is invalid. Please register again.'
    return
  }

  if (
    email.value.trim().toLowerCase() !==
    user.email.toLowerCase()
  ) {
    errorMessage.value =
      'No account found with this email address.'
    return
  }

  if (password.value !== user.password) {
    errorMessage.value =
      'Incorrect password. Please try again.'
    return
  }

  emit('login-success')
}
</script>

<template>
  <div class="auth-card">

    <!-- Header -->
    <div class="auth-header">
      <div class="auth-logo">✓</div>

      <h2>Welcome Back</h2>

      <p>
        Log in to access your student workspace
      </p>
    </div>

    <!-- Login Form -->
    <form
      @submit.prevent="handleLogin"
      class="auth-form"
    >

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="error-banner"
      >
        {{ errorMessage }}
      </div>

      <!-- Email -->
      <div class="form-group">
        <label>Email Address</label>

        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          autocomplete="email"
          required
        />
      </div>

      <!-- Password -->
      <div class="form-group">
        <label>Password</label>

        <div class="password-wrapper">

          <input
            v-model="password"
            :type="
              showPassword
                ? 'text'
                : 'password'
            "
            placeholder="Enter your password"
            autocomplete="current-password"
            required
          />

          <button
            type="button"
            class="toggle-pwd-btn"
            @click="
              showPassword = !showPassword
            "
          >
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>

        </div>
      </div>

      <!-- Password Strength -->
      <div
        v-if="password"
        class="password-strength"
      >

        <!-- Strength Header -->
        <div class="strength-header">

          <span>
            Password Strength
          </span>

          <span
            class="strength-label"
            :class="passwordStrength.className"
          >
            {{ passwordStrength.label }}
          </span>

        </div>

        <!-- Strength Bar -->
        <div class="strength-track">

          <div
            class="strength-bar"
            :class="passwordStrength.className"
            :style="{
              width:
                passwordStrength.percentage + '%'
            }"
          ></div>

        </div>

        <!-- Password Requirements -->
        <div class="password-checks">

          <!-- 8 Characters -->
          <div
            class="check-item"
            :class="{
              valid: passwordChecks.length
            }"
          >
            <span class="check-circle">
              {{
                passwordChecks.length
                  ? '✓'
                  : ''
              }}
            </span>

            <span>8 Chars</span>
          </div>

          <!-- Uppercase -->
          <div
            class="check-item"
            :class="{
              valid: passwordChecks.uppercase
            }"
          >
            <span class="check-circle">
              {{
                passwordChecks.uppercase
                  ? '✓'
                  : ''
              }}
            </span>

            <span>A-Z</span>
          </div>

          <!-- Lowercase -->
          <div
            class="check-item"
            :class="{
              valid: passwordChecks.lowercase
            }"
          >
            <span class="check-circle">
              {{
                passwordChecks.lowercase
                  ? '✓'
                  : ''
              }}
            </span>

            <span>a-z</span>
          </div>

          <!-- Number -->
          <div
            class="check-item"
            :class="{
              valid: passwordChecks.number
            }"
          >
            <span class="check-circle">
              {{
                passwordChecks.number
                  ? '✓'
                  : ''
              }}
            </span>

            <span>123</span>
          </div>

          <!-- Special Character -->
          <div
            class="check-item"
            :class="{
              valid: passwordChecks.special
            }"
          >
            <span class="check-circle">
              {{
                passwordChecks.special
                  ? '✓'
                  : ''
              }}
            </span>

            <span>@#$</span>
          </div>

        </div>

        <!-- Password Example -->
        <div class="password-example">

          <div class="example-title">
            Example:
            <strong>Student@2026</strong>
          </div>

          <div class="example-description">
            Use at least 8 characters with
            uppercase, lowercase, number,
            and special character.
          </div>

        </div>

      </div>

      <!-- Login Button -->
      <button
        type="submit"
        class="submit-btn"
      >
        Log In
      </button>

    </form>

    <!-- Footer -->
    <div class="auth-footer">

      <span>
        Don't have an account?
      </span>

      <button
        type="button"
        @click="
          emit('switch-to-register')
        "
        class="toggle-btn"
      >
        Register here
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
  box-sizing: border-box;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

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

.auth-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
}

.auth-header p {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #9ca3af;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.error-banner {
  background-color: rgba(239, 68, 68, 0.15);
  border: 1px solid #ef4444;
  color: #fca5a5;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  text-align: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #d1d5db;
}

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

.form-group input::placeholder {
  color: #7f8ba3;
}

.form-group input:focus {
  border-color: #3b82f6;
}

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrapper input {
  padding-right: 4.5rem;
}

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

.toggle-pwd-btn:hover {
  color: #93c5fd;
}

/* PASSWORD STRENGTH */

.password-strength {
  margin-top: -0.4rem;
  background-color: #0b1120;
  border: 1px solid #232f48;
  border-radius: 8px;
  padding: 1rem;
}

.strength-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #d1d5db;
}

.strength-label {
  font-weight: 700;
}

.strength-label.weak {
  color: #ef4444;
}

.strength-label.fair {
  color: #f59e0b;
}

.strength-label.good {
  color: #60a5fa;
}

.strength-label.strong {
  color: #22c55e;
}

.strength-track {
  width: 100%;
  height: 7px;
  background-color: #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 0.75rem;
}

.strength-bar {
  height: 100%;
  border-radius: 10px;
  transition:
    width 0.3s ease,
    background-color 0.3s ease;
}

.strength-bar.weak {
  background-color: #ef4444;
}

.strength-bar.fair {
  background-color: #f59e0b;
}

.strength-bar.good {
  background-color: #3b82f6;
}

.strength-bar.strong {
  background-color: #22c55e;
}

.password-checks {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #ef4444;
  font-size: 0.76rem;
  white-space: nowrap;
}

.check-item.valid {
  color: #22c55e;
}

.check-circle {
  width: 18px;
  height: 18px;
  border: 2px solid #ef4444;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 700;
  box-sizing: border-box;
}

.check-item.valid .check-circle {
  background-color: #22c55e;
  border-color: #22c55e;
  color: #ffffff;
}

/* PASSWORD EXAMPLE */

.password-example {
  margin-top: 0.9rem;
  padding: 0.8rem;
  background-color: #111827;
  border: 1px solid #26344f;
  border-radius: 6px;
}

.example-title {
  color: #d1d5db;
  font-size: 0.85rem;
  margin-bottom: 0.35rem;
}

.example-title strong {
  color: #60a5fa;
  font-weight: 700;
}

.example-description {
  color: #9ca3af;
  font-size: 0.78rem;
  line-height: 1.45;
}

/* LOGIN BUTTON */

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

.submit-btn:hover {
  background-color: #1d4ed8;
}

/* FOOTER */

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

.toggle-btn:hover {
  text-decoration: underline;
}

/* MOBILE */

@media (max-width: 480px) {
  .auth-card {
    padding: 1.5rem;
  }

  .password-checks {
    justify-content: flex-start;
  }

  .check-item {
    font-size: 0.72rem;
  }

  .password-example {
    padding: 0.7rem;
  }

  .example-description {
    font-size: 0.75rem;
  }
}
</style>