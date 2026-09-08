import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RegisterView from './RegisterView.vue'

describe('RegisterView Component', () => {
  it('renders the registration form', () => {
    const wrapper = mount(RegisterView)

    expect(wrapper.text()).toContain('Create Account')
    expect(wrapper.text()).toContain('Register')
  })

  it('contains the required registration input fields', () => {
    const wrapper = mount(RegisterView)

    const inputs = wrapper.findAll('input')

    expect(inputs.length).toBeGreaterThanOrEqual(4)
  })

  it('contains password and confirm password fields', () => {
    const wrapper = mount(RegisterView)

    const passwordInputs = wrapper.findAll('input[type="password"]')

    expect(passwordInputs.length).toBeGreaterThanOrEqual(2)
  })

  it('contains the register button', () => {
    const wrapper = mount(RegisterView)

    expect(wrapper.text()).toContain('Register')
  })
})