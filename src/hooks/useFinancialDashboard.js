import { useState } from 'react'
import { getFinancialDashboard } from '../services/dashboardService.js'
import { validateMonthYear } from '../utils/validators.js'

const initial_filter_values = {
  month: getCurrentMonth(),
  year: getCurrentYear(),
}

export function useFinancialDashboard() {
  const [filter_values, set_filter_values] = useState(initial_filter_values)
  const [dashboard_data, set_dashboard_data] = useState({})
  const [error_message, set_error_message] = useState('')
  const [is_loading, set_is_loading] = useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    const validation_message = validateMonthYear(filter_values.month, filter_values.year)
    if (validation_message) return set_error_message(validation_message)
    await loadDashboard(filter_values, set_dashboard_data, set_error_message, set_is_loading)
  }

  function onChange(event) {
    const { name, value } = event.target
    set_error_message('')
    set_filter_values((prev_values) => ({ ...prev_values, [name]: value }))
  }

  return { filter_values, dashboard_data, error_message, is_loading, onSubmit, onChange }
}

async function loadDashboard(filter_values, set_dashboard_data, set_error_message, set_is_loading) {
  try {
    set_is_loading(true)
    set_error_message('')
    const dashboard = await getFinancialDashboard(filter_values.month, filter_values.year)
    set_dashboard_data(dashboard)
  } catch (error) {
    set_error_message(error.message || 'Unable to fetch financial dashboard.')
  } finally {
    set_is_loading(false)
  }
}

function getCurrentMonth() {
  return String(new Date().getMonth() + 1)
}

function getCurrentYear() {
  return String(new Date().getFullYear())
}
