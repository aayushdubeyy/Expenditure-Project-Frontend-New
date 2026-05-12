const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateLoginFields(email, password) {
  if (!email || !password) return 'Email and password are required.'
  if (!email_regex.test(email)) return 'Please enter a valid email address.'
  return ''
}

export function validateSignupFields(name, email, password) {
  if (!name || !email || !password) return 'All fields are required.'
  if (name.trim().length < 2) return 'Name should be at least 2 characters.'
  if (!email_regex.test(email)) return 'Please enter a valid email address.'
  if (password.length < 8) return 'Password should be at least 8 characters.'
  return ''
}

export function validateExpenseFields(form_values) {
  if (!form_values.title.trim()) return 'Expense title is required.'
  if (!form_values.amount || Number(form_values.amount) <= 0) return 'Amount must be greater than zero.'
  if (!form_values.categoryId) return 'Please choose a category.'
  if (!form_values.paymentMethodId) return 'Please choose a payment method.'
  if (!form_values.date) return 'Please select a date.'
  if (isCreditCardMissing(form_values)) return 'Please choose a credit card for card payments.'
  return ''
}

function isCreditCardMissing(form_values) {
  return form_values.paymentMethodId === '9' && !form_values.creditcardId.trim()
}

export function validateCreditLineFields(form_values) {
  if (!form_values.name.trim()) return 'Credit line name is required.'
  if (!form_values.totalLimit || Number(form_values.totalLimit) <= 0) {
    return 'Total limit must be greater than zero.'
  }
  return ''
}

export function validateCreditCardFields(form_values) {
  if (!form_values.name.trim()) return 'Credit card name is required.'
  if (!form_values.billCycleDay) return 'Bill cycle day is required.'
  if (!isBillCycleDayValid(form_values.billCycleDay)) {
    return 'Bill cycle day should be between 1 and 31.'
  }
  if (!form_values.creditLineId) return 'Please select a credit line.'
  if (!isOptionalLimitValid(form_values.limit)) return 'Limit should be a positive number.'
  return ''
}

function isBillCycleDayValid(billCycleDay) {
  const cycle_day = Number(billCycleDay)
  return cycle_day >= 1 && cycle_day <= 31
}

function isOptionalLimitValid(limit) {
  if (!limit.trim()) return true
  return Number(limit) > 0
}

export function validateExpenseSearchFilters(filter_values) {
  if (!filter_values.startDate || !filter_values.endDate) return ''
  if (filter_values.startDate > filter_values.endDate) {
    return 'Start date cannot be after end date.'
  }
  return ''
}

export function validateMonthYear(month, year) {
  if (!month || !year) return 'Month and year are required.'
  if (Number(month) < 1 || Number(month) > 12) return 'Month should be between 1 and 12.'
  if (Number(year) < 2000 || Number(year) > 2100) return 'Year should be between 2000 and 2100.'
  return ''
}

export function validateYear(year) {
  if (!year) return 'Year is required.'
  if (Number(year) < 2000 || Number(year) > 2100) return 'Year should be between 2000 and 2100.'
  return ''
}

export function validateIncomeFields(form_values) {
  if (!form_values.amount || Number(form_values.amount) <= 0) {
    return 'Income amount must be greater than zero.'
  }
  if (!form_values.source.trim()) return 'Income source is required.'
  if (!form_values.date) return 'Income date is required.'
  return ''
}

export function validatePayCardFields(form_values) {
  if (!form_values.creditCardId) return 'Please select a credit card.'
  if (!form_values.amount || Number(form_values.amount) <= 0) {
    return 'Payment amount must be greater than zero.'
  }
  if (!form_values.date) return 'Payment date is required.'
  return ''
}
