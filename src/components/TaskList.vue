<script setup>
const props = defineProps({
  tasks: {
    type: Array,
    default: () => []
  },

  getDeadlineText: {
    type: Function,
    default: () => ''
  },

  getDeadlineClass: {
    type: Function,
    default: () => 'normal'
  }
})

const emit = defineEmits([
  'edit-task',
  'delete-task'
])

function statusClass(status) {

  if (status === 'Completed') {
    return 'completed'
  }

  if (status === 'In Progress') {
    return 'progress'
  }

  return 'pending'
}

function priorityClass(priority) {

  if (priority === 'High') {
    return 'high'
  }

  if (priority === 'Low') {
    return 'low'
  }

  return 'medium'
}
</script>

<template>

  <div class="task-list">

    <!-- EMPTY -->
    <div
      v-if="tasks.length === 0"
      class="empty-state"
    >

      <div class="empty-icon">
        ✓
      </div>

      <h3>
        No tasks found
      </h3>

      <p>
        Add a new task or try another search/filter.
      </p>

    </div>

    <!-- TASKS -->
    <article
      v-for="task in tasks"
      :key="task.id"
      class="task-card"
      :class="
        'status-' +
        statusClass(task.status)
      "
    >

      <div class="task-main">

        <div class="task-title-row">

          <span
            class="task-status-dot"
            :class="
              statusClass(
                task.status
              )
            "
          ></span>

          <h3>
            {{ task.title }}
          </h3>

        </div>

        <p class="task-description">
          {{ task.description }}
        </p>

        <div class="task-meta">

          <span
            class="status-badge"
            :class="
              statusClass(
                task.status
              )
            "
          >
            {{ task.status }}
          </span>

          <span class="category-badge">
            {{ task.category }}
          </span>

          <span
            class="priority-badge"
            :class="
              priorityClass(
                task.priority
              )
            "
          >
            {{ task.priority }}
          </span>

          <span class="due-date">
            📅 {{ task.dueDate }}
          </span>

          <span
            class="deadline-label"
            :class="
              props.getDeadlineClass(
                task.dueDate
              )
            "
          >
            {{
              props.getDeadlineText(
                task.dueDate
              )
            }}
          </span>

        </div>

      </div>

      <div class="task-actions">

        <button
          class="icon-action edit-action"
          title="Edit task"
          @click="
            emit(
              'edit-task',
              task
            )
          "
        >
          ✎
        </button>

        <button
          class="icon-action delete-action"
          title="Delete task"
          @click="
            emit(
              'delete-task',
              task.id
            )
          "
        >
          ×
        </button>

      </div>

    </article>

  </div>

</template>