import {
  get_expense_query,
  monthly_summary_query,
  yearly_summary_query,
} from '../graphql/queries/expenseQueries.js'
import { create_expense_mutation } from '../graphql/mutations/expenseMutations.js'
import { executeGraphqlRequest } from './apiClient.js'

export async function createExpense(form_values) {
  const variables = buildExpenseVariables(form_values)
  const data = await executeGraphqlRequest(create_expense_mutation, variables)
  return data?.createExpense
}

export async function getExpense(filter_values) {
  const variables = { filter: buildExpenseFilter(filter_values) }
  const data = await executeGraphqlRequest(get_expense_query, variables)
  return data?.getExpense || []
}

export async function getMonthlySummary(month, year) {
  const variables = { month: parseInt(month, 10), year: parseInt(year, 10) }
  const data = await executeGraphqlRequest(monthly_summary_query, variables)
  return data?.monthlySummary || {}
}

export async function getYearlySummary(year) {
  const variables = { year: parseInt(year, 10) }
  const data = await executeGraphqlRequest(yearly_summary_query, variables)
  return data?.yearlySummary || {}
}

function buildExpenseVariables(form_values) {
  return {
    title: form_values.title.trim(),
    amount: parseFloat(form_values.amount),
    categoryId: form_values.categoryId,
    paymentMethodId: parseInt(form_values.paymentMethodId, 10),
    creditcardId: getCreditCardId(form_values),
    date: form_values.date,
    notes: getOptionalNotes(form_values.notes),
  }
}

function buildExpenseFilter(filter_values) {
  const filter = {}
  assignDateFilter(filter, filter_values)
  assignCategoryFilter(filter, filter_values)
  assignPaymentMethodFilter(filter, filter_values)
  return Object.keys(filter).length ? filter : null
}

function assignDateFilter(filter, filter_values) {
  if (filter_values.startDate) filter.startDate = filter_values.startDate
  if (filter_values.endDate) filter.endDate = filter_values.endDate
}

function assignCategoryFilter(filter, filter_values) {
  if (!filter_values.categoryIds.length) return
  filter.categoryIds = filter_values.categoryIds
}

function assignPaymentMethodFilter(filter, filter_values) {
  if (!filter_values.paymentMethodIds.length) return
  filter.paymentMethodIds = filter_values.paymentMethodIds.map((payment_id) => parseInt(payment_id, 10))
}

function getCreditCardId(form_values) {
  return form_values.paymentMethodId === '9' ? form_values.creditcardId || null : null
}

function getOptionalNotes(notes) {
  const clean_notes = notes.trim()
  return clean_notes ? clean_notes : null
}
