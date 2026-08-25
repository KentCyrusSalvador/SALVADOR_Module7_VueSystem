<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>{{ isRegistering ? 'Register' : 'Login' }}</h2>

      <form @submit.prevent="handleSubmit">
        <div v-if="isRegistering" class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" v-model="form.name" required placeholder="Enter your name" />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" required placeholder="Enter your email" />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="form.password" required placeholder="Enter your password" />
        </div>

        <button type="submit" class="btn-primary">
          {{ isRegistering ? 'Sign Up' : 'Log In' }}
        </button>
      </form>

      <div class="toggle-container">
        <p v-if="!isRegistering">
          Don't have an account? 
          <button type="button" class="btn-link" @click="isRegistering = true">Register here</button>
        </p>
        <p v-else>
          Already have an account? 
          <button type="button" class="btn-link" @click="isRegistering = false">Login here</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthView',
  data() {
    return {
      isRegistering: false,
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      if (this.isRegistering) {
        console.log('Registering user:', this.form)
      } else {
        console.log('Logging in user:', { email: this.form.email, password: this.form.password })
      }
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 8px;
  background-color: var(--color-background-soft, #ffffff);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-border, #e2e8f0);
}

h2 {
  margin-bottom: 24px;
  text-align: center;
  color: var(--color-heading, #2c3e50);
}

.form-group {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 6px;
  font-weight: 500;
  color: var(--color-text, #2c3e50);
}

input {
  padding: 10px 12px;
  border: 1px solid var(--color-border, #ccc);
  border-radius: 4px;
  background-color: var(--color-background, #fff);
  color: var(--color-text, #2c3e50);
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: var(--vt-c-green, #42b883);
}

.btn-primary {
  width: 100%;
  padding: 12px;
  background-color: var(--vt-c-green, #42b883);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-primary:hover {
  background-color: var(--vt-c-green-dark, #33a06f);
}

.toggle-container {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: var(--color-text, #2c3e50);
}

.btn-link {
  background: none;
  border: none;
  color: var(--vt-c-green, #42b883);
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}
</style>