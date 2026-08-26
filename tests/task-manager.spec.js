import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'

import TaskForm from '../src/components/TaskForm.vue'
import TaskList from '../src/components/TaskList.vue'
import App from '../src/App.vue'

describe('Student Task Management System', () => {

  beforeEach(() => {
    localStorage.clear()
  })

  // TEST 1 — ADD TASK
  it('should emit add-task when a valid task is submitted', async () => {
    const wrapper = mount(TaskForm)

    const inputs = wrapper.findAll('input')

    await inputs.find(input =>
      input.attributes('type') === 'text'
    ).setValue('Software Engineering Assignment')

    await wrapper.find('textarea').setValue(
      'Complete the Module 8 software testing activity.'
    )

    await inputs.find(input =>
      input.attributes('type') === 'date'
    ).setValue('2026-08-30')

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('add-task')).toBeTruthy()

    const emittedTask = wrapper.emitted('add-task')[0][0]

    expect(emittedTask.title).toBe(
      'Software Engineering Assignment'
    )

    expect(emittedTask.description).toBe(
      'Complete the Module 8 software testing activity.'
    )

    expect(emittedTask.dueDate).toBe('2026-08-30')
  })


  // TEST 2 — DISPLAY TASKS
  it('should display the supplied task records', () => {
    const tasks = [
      {
        id: 1,
        title: 'Vue.js Project',
        description: 'Complete the Vue.js project.',
        category: 'Project',
        priority: 'High',
        status: 'Pending',
        dueDate: '2026-08-30'
      },
      {
        id: 2,
        title: 'Software Testing',
        description: 'Perform automated testing.',
        category: 'Assignment',
        priority: 'Medium',
        status: 'In Progress',
        dueDate: '2026-09-01'
      }
    ]

    const wrapper = mount(TaskList, {
      props: {
        tasks
      }
    })

    expect(wrapper.text()).toContain('Vue.js Project')
    expect(wrapper.text()).toContain('Software Testing')
    expect(wrapper.text()).toContain('Complete the Vue.js project.')
    expect(wrapper.text()).toContain('Perform automated testing.')
  })


  // TEST 3 — EDIT TASK
  it('should emit edit-task when the edit button is clicked', async () => {
    const task = {
      id: 1,
      title: 'Original Task',
      description: 'Original description',
      category: 'Assignment',
      priority: 'Medium',
      status: 'Pending',
      dueDate: '2026-08-30'
    }

    const wrapper = mount(TaskList, {
      props: {
        tasks: [task]
      }
    })

    const editButton = wrapper.find('.edit-action')

    await editButton.trigger('click')

    expect(wrapper.emitted('edit-task')).toBeTruthy()
    expect(wrapper.emitted('edit-task')[0][0]).toEqual(task)
  })


  // TEST 4 — DELETE TASK
  it('should emit delete-task with the correct task ID', async () => {
    const task = {
      id: 25,
      title: 'Task To Delete',
      description: 'This task will be deleted.',
      category: 'Assignment',
      priority: 'Low',
      status: 'Pending',
      dueDate: '2026-08-30'
    }

    const wrapper = mount(TaskList, {
      props: {
        tasks: [task]
      }
    })

    const deleteButton = wrapper.find('.delete-action')

    await deleteButton.trigger('click')

    expect(wrapper.emitted('delete-task')).toBeTruthy()
    expect(wrapper.emitted('delete-task')[0][0]).toBe(25)
  })

// TEST 5 — SEARCH TASK
it('should filter tasks when searching', async () => {
  const wrapper = mount(App)

  // Log in so the task management interface is displayed
  wrapper.vm.isLoggedIn = true

  wrapper.vm.tasks = [
    {
      id: 1,
      title: 'Mathematics Assignment',
      description: 'Complete math work.',
      category: 'Assignment',
      priority: 'Medium',
      status: 'Pending',
      dueDate: '2026-08-30'
    },
    {
      id: 2,
      title: 'Programming Project',
      description: 'Complete Vue project.',
      category: 'Project',
      priority: 'High',
      status: 'Pending',
      dueDate: '2026-09-01'
    }
  ]

  await wrapper.vm.$nextTick()

  const searchInput = wrapper.find(
    'input[placeholder="Search tasks..."]'
  )

  expect(searchInput.exists()).toBe(true)

  await searchInput.setValue('Mathematics')

  await wrapper.vm.$nextTick()

  const taskCards = wrapper.findAll('.task-card')

  expect(taskCards).toHaveLength(1)
  expect(taskCards[0].text()).toContain(
    'Mathematics Assignment'
  )
  expect(taskCards[0].text()).not.toContain(
    'Programming Project'
  )
})
})