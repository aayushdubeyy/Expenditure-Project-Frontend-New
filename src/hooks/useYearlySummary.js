import { useState } from 'react'
import { getYearlySummary } from '../services/expenseService.js'
import { validateYear } from '../utils/validators.js'

const initial_filter_values = {
  year: getCurrentYear(),
}

export function useYearlySummary() {
  const [filter_values, set_filter_values] = useState(initial_filter_values)
  const [summary_data, set_summary_data] = useState({})
  const [error_message, set_error_message] = useState('')
  const [is_loading, set_is_loading] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    const validation_message = validateYear(filter_values.year)
    if (validation_message) return set_error_message(validation_message)
    await fetchYearlySummary(filter_values, set_summary_data, set_error_message, set_is_loading)
  }

  function onChange(event) {
    const { name, value } = event.target
    set_error_message('')
    set_filter_values((prev_values) => ({ ...prev_values, [name]: value }))
  }

  return { filter_values, summary_data, error_message, is_loading, onSubmit, onChange }
}

async function fetchYearlySummary(filter_values, set_summary_data, set_error_message, set_is_loading) {
  try {
    set_is_loading(true)
    set_error_message('')
    const summary = await getYearlySummary(filter_values.year)
    set_summary_data(summary)
  } catch (error) {
    set_error_message(error.message || 'Unable to fetch yearly summary.')
  } finally {
    set_is_loading(false)
  }
}

function getCurrentYear() {
  return String(new Date().getFullYear())
}
