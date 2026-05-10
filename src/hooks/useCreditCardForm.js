import { useState } from 'react'
import { createCreditCard } from '../services/creditService.js'
import { validateCreditCardFields } from '../utils/validators.js'

const initial_form_values = {
  name: '',
  billCycleDay: '',
  limit: '',
  creditLineId: '',
}

export function useCreditCardForm(refreshCreditData) {
  const [form_values, set_form_values] = useState(initial_form_values)
  const [error_message, set_error_message] = useState('')
  const [success_message, set_success_message] = useState('')
  const [is_loading, set_is_loading] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    const validation_message = validateCreditCardFields(form_values)
    if (validation_message) return set_error_message(validation_message)
    await submitCreditCard(form_values, set_form_values, set_error_message, set_success_message, set_is_loading, refreshCreditData)
  }

  function onChange(event) {
    const { name, value } = event.target
    set_error_message('')
    set_success_message('')
    set_form_values((prev_values) => ({ ...prev_values, [name]: value }))
  }

  return { form_values, error_message, success_message, is_loading, onSubmit, onChange }
}

async function submitCreditCard(
  form_values,
  set_form_values,
  set_error_message,
  set_success_message,
  set_is_loading,
  refreshCreditData,
) {
  try {
    set_is_loading(true)
    await createCreditCard(form_values)
    set_success_message('Credit card created successfully.')
    set_form_values(initial_form_values)
    await refreshCreditData()
  } catch (error) {
    set_error_message(error.message || 'Unable to create credit card right now.')
  } finally {
    set_is_loading(false)
  }
}
