import { useState } from 'react'
import { payCreditCard } from '../services/creditService.js'
import { validatePayCardFields } from '../utils/validators.js'

const initial_form_values = {
  creditCardId: '',
  amount: '',
  date: getTodayDate(),
}

export function usePayCreditCardForm(refreshCreditData) {
  const [form_values, set_form_values] = useState(initial_form_values)
  const [error_message, set_error_message] = useState('')
  const [success_message, set_success_message] = useState('')
  const [is_loading, set_is_loading] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    const validation_message = validatePayCardFields(form_values)
    if (validation_message) return set_error_message(validation_message)
    await submitPayment(form_values, set_form_values, set_error_message, set_success_message, set_is_loading, refreshCreditData)
  }

  function onChange(event) {
    const { name, value } = event.target
    set_error_message('')
    set_success_message('')
    set_form_values((prev_values) => ({ ...prev_values, [name]: value }))
  }

  return { form_values, error_message, success_message, is_loading, onSubmit, onChange }
}

async function submitPayment(
  form_values,
  set_form_values,
  set_error_message,
  set_success_message,
  set_is_loading,
  refreshCreditData,
) {
  try {
    set_is_loading(true)
    await payCreditCard(form_values)
    set_success_message('Credit card payment recorded.')
    set_form_values({ ...initial_form_values, date: getTodayDate() })
    await refreshCreditData()
  } catch (error) {
    set_error_message(error.message || 'Unable to pay credit card right now.')
  } finally {
    set_is_loading(false)
  }
}

function getTodayDate() {
  const today_date = new Date()
  return today_date.toISOString().slice(0, 10)
}
