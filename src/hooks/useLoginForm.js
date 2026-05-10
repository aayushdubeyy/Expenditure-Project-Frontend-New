import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { route_paths } from '../constants/routes.js'
import { loginUser } from '../services/authService.js'
import { validateLoginFields } from '../utils/validators.js'

const initial_form_values = { email: '', password: '' }

export function useLoginForm() {
  const navigate = useNavigate()
  const [form_values, set_form_values] = useState(initial_form_values)
  const [error_message, set_error_message] = useState('')
  const [success_message, set_success_message] = useState('')
  const [is_loading, set_is_loading] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    const validation_message = validateLoginFields(form_values.email, form_values.password)
    if (validation_message) return set_error_message(validation_message)
    await submitLogin(form_values, set_error_message, set_success_message, set_is_loading, navigate)
  }

  function onChange(event) {
    const { name, value } = event.target
    set_error_message('')
    set_form_values((prev_values) => ({ ...prev_values, [name]: value }))
  }

  return { form_values, error_message, success_message, is_loading, onSubmit, onChange }
}

async function submitLogin(form_values, set_error_message, set_success_message, set_is_loading, navigate) {
  try {
    set_is_loading(true)
    await loginUser(form_values.email, form_values.password)
    set_success_message('Login successful. Redirecting to home...')
    setTimeout(() => navigate(route_paths.home), 500)
  } catch (error) {
    set_error_message(error.message || 'Unable to login right now.')
  } finally {
    set_is_loading(false)
  }
}
