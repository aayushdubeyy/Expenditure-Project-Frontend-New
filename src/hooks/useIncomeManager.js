import { useEffect, useState } from 'react'
import { createIncome, getIncomes } from '../services/incomeService.js'
import { validateIncomeFields } from '../utils/validators.js'

const initial_form_values = {
  amount: '',
  source: '',
  date: getTodayDate(),
}

export function useIncomeManager() {
  const [form_values, set_form_values] = useState(initial_form_values)
  const [income_list, set_income_list] = useState([])
  const [error_message, set_error_message] = useState('')
  const [success_message, set_success_message] = useState('')
  const [is_loading, set_is_loading] = useState(false)
  const [is_list_loading, set_is_list_loading] = useState(true)

  useEffect(() => {
    loadIncomes(set_income_list, set_error_message, set_is_list_loading)
  }, [])

  async function onSubmit(event) {
    event.preventDefault()
    const validation_message = validateIncomeFields(form_values)
    if (validation_message) return set_error_message(validation_message)
    await saveIncome(form_values, set_form_values, set_error_message, set_success_message, set_is_loading, set_income_list, set_is_list_loading)
  }

  function onChange(event) {
    const { name, value } = event.target
    set_error_message('')
    set_success_message('')
    set_form_values((prev_values) => ({ ...prev_values, [name]: value }))
  }

  return {
    form_values, income_list, error_message, success_message,
    is_loading, is_list_loading, onSubmit, onChange,
  }
}

async function loadIncomes(set_income_list, set_error_message, set_is_list_loading) {
  try {
    set_is_list_loading(true)
    const incomes = await getIncomes()
    set_income_list(incomes)
  } catch (error) {
    set_error_message(error.message || 'Unable to load incomes.')
  } finally {
    set_is_list_loading(false)
  }
}

async function saveIncome(
  form_values,
  set_form_values,
  set_error_message,
  set_success_message,
  set_is_loading,
  set_income_list,
  set_is_list_loading,
) {
  try {
    set_is_loading(true)
    await createIncome(form_values)
    set_success_message('Income added successfully.')
    set_form_values({ ...initial_form_values, date: getTodayDate() })
    await loadIncomes(set_income_list, set_error_message, set_is_list_loading)
  } catch (error) {
    set_error_message(error.message || 'Unable to create income right now.')
  } finally {
    set_is_loading(false)
  }
}

function getTodayDate() {
  const today_date = new Date()
  return today_date.toISOString().slice(0, 10)
}
