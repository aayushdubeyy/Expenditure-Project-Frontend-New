import { useEffect, useMemo, useState } from 'react'
import { payment_methods } from '../constants/paymentMethods.js'
import { getCategories } from '../services/categoryService.js'
import { createExpense } from '../services/expenseService.js'
import { validateExpenseFields } from '../utils/validators.js'

const initial_form_values = {
  title: '',
  amount: '',
  categoryId: '',
  paymentMethodId: '',
  creditcardId: '',
  date: getTodayDate(),
  notes: '',
}

export function useExpenseForm() {
  const expense_state = useExpenseState()
  const is_credit_card_mode = useIsCreditCardMode(
    expense_state.form_values.paymentMethodId,
  )
  useLoadCategories(
    expense_state.set_category_list,
    expense_state.set_error_message,
    expense_state.set_is_category_loading,
  )
  const onSubmit = getSubmitHandler(
    expense_state.form_values,
    expense_state.set_form_values,
    expense_state.set_error_message,
    expense_state.set_success_message,
    expense_state.set_is_loading,
  )
  const onChange = getChangeHandler(
    expense_state.set_error_message,
    expense_state.set_success_message,
    expense_state.set_form_values,
  )
  return buildHookResponse(expense_state, is_credit_card_mode, onSubmit, onChange)
}

function useExpenseState() {
  const [form_values, set_form_values] = useState(initial_form_values)
  const [category_list, set_category_list] = useState([])
  const [error_message, set_error_message] = useState('')
  const [success_message, set_success_message] = useState('')
  const [is_loading, set_is_loading] = useState(false)
  const [is_category_loading, set_is_category_loading] = useState(true)
  return {
    form_values, set_form_values, category_list, set_category_list,
    error_message, set_error_message, success_message, set_success_message,
    is_loading, set_is_loading, is_category_loading, set_is_category_loading,
  }
}

function useIsCreditCardMode(paymentMethodId) {
  return useMemo(() => paymentMethodId === '9', [paymentMethodId])
}

function useLoadCategories(set_category_list, set_error_message, set_is_category_loading) {
  useEffect(() => {
    loadCategories(set_category_list, set_error_message, set_is_category_loading)
  }, [set_category_list, set_error_message, set_is_category_loading])
}

function getSubmitHandler(
  form_values,
  set_form_values,
  set_error_message,
  set_success_message,
  set_is_loading,
) {
  return async function onSubmit(event) {
    event.preventDefault()
    const validation_message = validateExpenseFields(form_values)
    if (validation_message) return set_error_message(validation_message)
    await submitExpense(form_values, set_form_values, set_error_message, set_success_message, set_is_loading)
  }
}

function getChangeHandler(set_error_message, set_success_message, set_form_values) {
  return function onChange(event) {
    const { name, value } = event.target
    set_error_message('')
    set_success_message('')
    set_form_values((prev_values) => updateFormValues(prev_values, name, value))
  }
}

function buildHookResponse(expense_state, is_credit_card_mode, onSubmit, onChange) {
  return {
    form_values: expense_state.form_values,
    category_list: expense_state.category_list,
    payment_methods,
    error_message: expense_state.error_message,
    success_message: expense_state.success_message,
    is_loading: expense_state.is_loading,
    is_category_loading: expense_state.is_category_loading,
    is_credit_card_mode,
    onSubmit,
    onChange,
  }
}

async function loadCategories(set_category_list, set_error_message, set_is_category_loading) {
  try {
    set_is_category_loading(true)
    const categories = await getCategories()
    set_category_list(categories)
  } catch (error) {
    set_error_message(error.message || 'Unable to load categories.')
  } finally {
    set_is_category_loading(false)
  }
}

async function submitExpense(
  form_values,
  set_form_values,
  set_error_message,
  set_success_message,
  set_is_loading,
) {
  try {
    set_is_loading(true)
    await createExpense(form_values)
    set_success_message('Expense logged successfully.')
    set_form_values({ ...initial_form_values, date: getTodayDate() })
  } catch (error) {
    set_error_message(error.message || 'Unable to log expense right now.')
  } finally {
    set_is_loading(false)
  }
}

function updateFormValues(prev_values, name, value) {
  if (name === 'paymentMethodId' && value !== '9') {
    return { ...prev_values, paymentMethodId: value, creditcardId: '' }
  }
  return { ...prev_values, [name]: value }
}

function getTodayDate() {
  const today_date = new Date()
  return today_date.toISOString().slice(0, 10)
}
