import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { route_paths } from '../constants/routes.js'
import { signupUser } from '../services/authService.js'
import { validateSignupFields } from '../utils/validators.js'

const initial_form_values = { name: '', email: '', password: '' }

export function useSignupForm() {
  const navigate = useNavigate()
  const [form_values, set_form_values] = useState(initial_form_values)
  const [error_message, set_error_message] = useState('')
  const [success_message, set_success_message] = useState('')
  const [is_loading, set_is_loading] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    const { name, email, password } = form_values
    const validation_message = validateSignupFields(name, email, password)
    if (validation_message) return set_error_message(validation_message)
    await submitSignup(form_values, set_error_message, set_success_message, set_is_loading, navigate)
  }

  function onChange(event) {
    const { name, value } = event.target
    set_error_message('')
    set_form_values((prev_values) => ({ ...prev_values, [name]: value }))
  }

  return { form_values, error_message, success_message, is_loading, onSubmit, onChange }
}

async function submitSignup(form_values, set_error_message, set_success_message, set_is_loading, navigate) {
  try {
    set_is_loading(true)
    await signupUser(form_values.name, form_values.email, form_values.password)
    set_success_message('Account created. Redirecting to login...')
    setTimeout(() => navigate(route_paths.login), 1000)
  } catch (error) {
    set_error_message(error.message || 'Unable to create account right now.')
  } finally {
    set_is_loading(false)
  }
}
