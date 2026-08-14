<script setup>
defineProps({
  darkMode: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits([
  'toggle-sidebar',
  'toggle-theme'
])
</script>

<template>

  <header class="top-header">

    <div class="header-left">

      <button
        class="hamburger-button"
        @click="
          emit('toggle-sidebar')
        "
        aria-label="Open menu"
      >

        <span></span>
        <span></span>
        <span></span>

      </button>

      <div class="header-brand">

        <div class="header-logo">
          ✓
        </div>

        <div>

          <h2>
            Student Task Manager
          </h2>

          <p>
            Organize. Plan. Achieve.
          </p>

        </div>

      </div>

    </div>

    <button
      class="theme-toggle"
      @click="
        emit('toggle-theme')
      "
    >

      <span class="theme-icon">
        {{
          darkMode
            ? '☾'
            : '☀'
        }}
      </span>

      <span class="toggle-track">

        <span
          class="toggle-thumb"
        ></span>

      </span>

    </button>

  </header>

</template>