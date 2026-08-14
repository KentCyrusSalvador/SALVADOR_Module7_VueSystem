<script setup>
import {
  ref,
  watch
} from 'vue'

const props = defineProps({
  editingTask: {
    type: Object,
    default: null
  },

  message: {
    type: String,
    default: ''
  },

  messageType: {
    type: String,
    default: 'success'
  }
})

const emit = defineEmits([
  'add-task',
  'update-task',
  'cancel-edit'
])

const title = ref('')
const description = ref('')
const category = ref('Assignment')
const priority = ref('Medium')
const status = ref('Pending')
const dueDate = ref('')

const errorMessage = ref('')

function resetForm() {
  title.value = ''
  description.value = ''
  category.value = 'Assignment'
  priority.value = 'Medium'
  status.value = 'Pending'
  dueDate.value = ''
  errorMessage.value = ''
}

watch(
  () => props.editingTask,
  task => {

    if (task) {

      title.value =
        task.title || ''

      description.value =
        task.description || ''

      category.value =
        task.category ||
        'Assignment'

      priority.value =
        task.priority ||
        'Medium'

      status.value =
        task.status ||
        'Pending'

      dueDate.value =
        task.dueDate || ''

      errorMessage.value = ''

    } else {

      resetForm()

    }

  },
  {
    immediate: true
  }
)

function submitForm() {

  errorMessage.value = ''

  if (
    !title.value.trim() ||
    !description.value.trim() ||
    !dueDate.value
  ) {

    errorMessage.value =
      'Please complete all required fields.'

    return
  }

  const taskData = {

    title:
      title.value.trim(),

    description:
      description.value.trim(),

    category:
      category.value,

    priority:
      priority.value,

    status:
      status.value,

    dueDate:
      dueDate.value

  }

  if (props.editingTask) {

    emit(
      'update-task',
      taskData
    )

  } else {

    emit(
      'add-task',
      taskData
    )

  }

  resetForm()
}

function cancelEdit() {
  emit('cancel-edit')
  resetForm()
}
</script>

<template>

  <section
    class="panel form-panel"
  >

    <!-- MESSAGE -->
    <Transition name="message">

      <div
        v-if="message"
        class="form-success-message"
        :class="{
          error:
            messageType ===
            'error'
        }"
      >

        <span>
          {{
            messageType ===
            'success'
              ? '✓'
              : '!'
          }}
        </span>

        {{ message }}

      </div>

    </Transition>

    <!-- HEADER -->
    <div class="panel-heading">

      <div class="form-icon">

        {{
          editingTask
            ? '✎'
            : '＋'
        }}

      </div>

      <div>

        <span class="panel-label">

          {{
            editingTask
              ? 'UPDATE TASK'
              : 'CREATE TASK'
          }}

        </span>

        <h2>

          {{
            editingTask
              ? 'Edit Task'
              : 'Add New Task'
          }}

        </h2>

        <p>

          {{
            editingTask
              ? 'Update your task information.'
              : 'Enter your academic task details.'
          }}

        </p>

      </div>

    </div>

    <!-- ERROR -->
    <div
      v-if="errorMessage"
      class="error-message"
    >

      <span>!</span>

      {{ errorMessage }}

    </div>

    <!-- FORM -->
    <form
      class="task-form"
      @submit.prevent="submitForm"
    >

      <div class="form-group">

        <label>
          Task Title
          <span>*</span>
        </label>

        <input
          v-model="title"
          type="text"
          placeholder="Enter task title"
        />

      </div>

      <div class="form-group">

        <label>
          Description
          <span>*</span>
        </label>

        <textarea
          v-model="description"
          rows="4"
          placeholder="Describe your task..."
        ></textarea>

      </div>

      <div class="form-row">

        <div class="form-group">

          <label>
            Category
          </label>

          <select
            v-model="category"
          >

            <option value="Assignment">
              Assignment
            </option>

            <option value="Project">
              Project
            </option>

            <option value="Exam">
              Exam
            </option>

            <option value="Quiz">
              Quiz
            </option>

            <option value="Presentation">
              Presentation
            </option>

            <option value="Laboratory">
              Laboratory
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>

        <div class="form-group">

          <label>
            Priority
          </label>

          <select
            v-model="priority"
          >

            <option value="Low">
              Low
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">
              High
            </option>

          </select>

        </div>

      </div>

      <div class="form-row">

        <div class="form-group">

          <label>
            Status
          </label>

          <select
            v-model="status"
          >

            <option value="Pending">
              Pending
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Completed
            </option>

          </select>

        </div>

        <div class="form-group">

          <label>
            Due Date
            <span>*</span>
          </label>

          <input
            v-model="dueDate"
            type="date"
          />

        </div>

      </div>

      <div class="form-actions">

        <button
          type="submit"
          class="primary-button"
        >

          <span>

            {{
              editingTask
                ? '✓'
                : '＋'
            }}

          </span>

          {{
            editingTask
              ? 'Update Task'
              : 'Add Task'
          }}

        </button>

        <button
          v-if="editingTask"
          type="button"
          class="secondary-button"
          @click="cancelEdit"
        >
          Cancel
        </button>

      </div>

    </form>

  </section>

</template>