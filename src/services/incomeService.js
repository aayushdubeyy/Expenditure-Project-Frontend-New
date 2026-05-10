import { create_income_mutation } from '../graphql/mutations/incomeMutations.js'
import { get_incomes_query } from '../graphql/queries/incomeQueries.js'
import { executeGraphqlRequest } from './apiClient.js'

export async function createIncome(form_values) {
  const variables = buildIncomeVariables(form_values)
  const data = await executeGraphqlRequest(create_income_mutation, variables)
  return data?.createIncome
}

function buildIncomeVariables(form_values) {
  return {
    amount: parseFloat(form_values.amount),
    source: form_values.source.trim(),
    date: form_values.date,
  }
}

export async function getIncomes() {
  const data = await executeGraphqlRequest(get_incomes_query, {})
  return data?.getIncomes || []
}
