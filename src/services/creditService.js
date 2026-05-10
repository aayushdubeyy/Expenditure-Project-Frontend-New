import {
  create_credit_card_mutation,
  create_credit_line_mutation,
  pay_credit_card_mutation,
} from '../graphql/mutations/creditMutations.js'
import {
  get_credit_cards_query,
  get_credit_lines_query,
} from '../graphql/queries/creditQueries.js'
import { executeGraphqlRequest } from './apiClient.js'

export async function getCreditLines() {
  const data = await executeGraphqlRequest(get_credit_lines_query, {})
  return data?.getCreditLines || []
}

export async function getCreditCards() {
  const data = await executeGraphqlRequest(get_credit_cards_query, {})
  return data?.getCreditCards || []
}

export async function createCreditLine(form_values) {
  const variables = buildCreditLineVariables(form_values)
  const data = await executeGraphqlRequest(create_credit_line_mutation, variables)
  return data?.createCreditLine
}

function buildCreditLineVariables(form_values) {
  return {
    name: form_values.name.trim(),
    totalLimit: parseFloat(form_values.totalLimit),
  }
}

export async function createCreditCard(form_values) {
  const variables = buildCreditCardVariables(form_values)
  const data = await executeGraphqlRequest(create_credit_card_mutation, variables)
  return data?.createCreditCard
}

export async function payCreditCard(form_values) {
  const variables = buildPayCardVariables(form_values)
  const data = await executeGraphqlRequest(pay_credit_card_mutation, variables)
  return data?.payCreditCard
}

function buildCreditCardVariables(form_values) {
  return {
    name: form_values.name.trim(),
    billCycleDay: parseInt(form_values.billCycleDay, 10),
    limit: getOptionalLimit(form_values.limit),
    creditLineId: form_values.creditLineId,
  }
}

function getOptionalLimit(limit) {
  const clean_limit = limit.trim()
  return clean_limit ? parseFloat(clean_limit) : null
}

function buildPayCardVariables(form_values) {
  return {
    creditCardId: form_values.creditCardId,
    amount: parseFloat(form_values.amount),
    date: form_values.date,
  }
}
