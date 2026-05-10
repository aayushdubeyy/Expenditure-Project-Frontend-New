export const get_financial_dashboard_query =
  'query GetFinancialDashboard($month: Int!, $year: Int!) {' +
  ' getFinancialDashboard(month: $month, year: $year) {' +
  ' totalIncome totalExpense netSavings ' +
  ' topCategories { categoryId categoryName total percentage } ' +
  ' creditUtilization { totalLimit totalUsage utilizationPercentage remainingLimit }' +
  ' } }'

export const get_credit_insights_query =
  'query GetCreditInsights {' +
  ' getCreditInsights {' +
  ' totalDebt totalLimit utilizationPercentage remainingLimit ' +
  ' cards { cardId name usage limit }' +
  ' } }'
