import { useEffect, useState } from 'react'
import { payment_methods } from '../constants/paymentMethods.js'
import { getCategories } from '../services/categoryService.js'
import { getExpense } from '../services/expenseService.js'
import { validateExpenseSearchFilters } from '../utils/validators.js'

const initial_filter_values = {
  startDate: '',
  endDate: '',
  categoryIds: [],
  paymentMethodIds: [],
}

export function useExpenseExplorer() {
  const [filter_values, set_filter_values] = useState(initial_filter_values)
  const [category_list, set_category_list] = useState([])
  const [expense_list, set_expense_list] = useState([])
  const [error_message, set_error_message] = useState('')
  const [is_loading, set_is_loading] = useState(false)

  useEffect(() => {
    loadCategories(set_category_list, set_error_message)
  }, [])

  async function onSearch(event) {
    event.preventDefault()
    const validation_message = validateExpenseSearchFilters(filter_values)
    if (validation_message) return set_error_message(validation_message)
    await searchExpense(filter_values, set_expense_list, set_error_message, set_is_loading)
  }

  function onDateChange(event) {
    const { name, value } = event.target
    set_error_message('')
    set_filter_values((prev_values) => ({ ...prev_values, [name]: value }))
  }

  function onCategoryToggle(category_id) {
    set_filter_values((prev_values) => toggleArrayValue(prev_values, category_id, 'categoryIds'))
  }

  function onPaymentToggle(payment_id) {
    set_filter_values((prev_values) => toggleArrayValue(prev_values, payment_id, 'paymentMethodIds'))
  }

  return {
    filter_values,
    category_list,
    payment_methods,
    expense_list,
    error_message,
    is_loading,
    onSearch,
    onDateChange,
    onCategoryToggle,
    onPaymentToggle,
  }
}

async function loadCategories(set_category_list, set_error_message) {
  try {
    const categories = await getCategories()
    set_category_list(categories)
  } catch (error) {
    set_error_message(error.message || 'Unable to load categories.')
  }
}

async function searchExpense(filter_values, set_expense_list, set_error_message, set_is_loading) {
  try {
    set_is_loading(true)
    set_error_message('')
    const expenses = await getExpense(filter_values)
    set_expense_list(expenses)
  } catch (error) {
    set_error_message(error.message || 'Unable to fetch expenses.')
  } finally {
    set_is_loading(false)
  }
}

function toggleArrayValue(prev_values, value_id, key_name) {
  const has_value = prev_values[key_name].includes(value_id)
  const next_values = has_value ? prev_values[key_name].filter((id) => id !== value_id) : [...prev_values[key_name], value_id]
  return { ...prev_values, [key_name]: next_values }
}
