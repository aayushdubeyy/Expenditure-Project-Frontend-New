export const create_income_mutation =
  'mutation CreateIncome($amount: Float!, $source: String!, $date: Date!) {' +
  ' createIncome(amount: $amount, source: $source, date: $date) { id } }'
