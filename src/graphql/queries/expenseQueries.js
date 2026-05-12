export const get_expense_query =
  'query GetExpense($filter: ExpenseFilterInput) {' +
  ' getExpenses(filter: $filter) {' +
  ' id title amount date notes categoryId paymentMethodId creditCardId' +
  ' } }'

export const monthly_summary_query =
  'query MonthlySummary($month: Int!, $year: Int!) {' +
  ' monthlySummary(month: $month, year: $year) {' +
  ' totalSpent ' +
  ' categoryBreakdown { categoryId categoryName total percentage } ' +
  ' paymentMethodBreakdown { paymentMethodId paymentMethodName total percentage }' +
  ' } }'

export const yearly_summary_query =
  'query YearlySummary($year: Int!) {' +
  ' yearlySummary(year: $year) {' +
  ' totalSpent ' +
  ' categoryBreakdown { categoryId categoryName total percentage } ' +
  ' paymentMethodBreakdown { paymentMethodId paymentMethodName total percentage }' +
  ' } }'
