import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import LoginView from './LoginView.vue'

describe('LoginView Component', () => {
  it('renders login form properly', () => {
    const wrapper = mount(LoginView)
    expect(wrapper.exists()).toBe(true)
  })

  it('contains email input field', () => {
    const wrapper = mount(LoginView)
    const emailInput = wrapper.find('input[type="email"]')
    expect(emailInput.exists()).toBe(true)
  })
})