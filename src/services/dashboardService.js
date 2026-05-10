import {
  get_credit_insights_query,
  get_financial_dashboard_query,
} from '../graphql/queries/dashboardQueries.js'
import { executeGraphqlRequest } from './apiClient.js'

export async function getFinancialDashboard(month, year) {
  const variables = buildMonthYearVariables(month, year)
  const data = await executeGraphqlRequest(get_financial_dashboard_query, variables)
  return data?.getFinancialDashboard || {}
}

function buildMonthYearVariables(month, year) {
  return { month: parseInt(month, 10), year: parseInt(year, 10) }
}

export async function getCreditInsights() {
  const data = await executeGraphqlRequest(get_credit_insights_query, {})
  return data?.getCreditInsights || {}
}
