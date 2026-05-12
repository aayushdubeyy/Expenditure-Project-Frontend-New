export const create_expense_mutation =
  'mutation CreateExpense($input: CreateExpenseInput!) {' +
  ' createExpense(input: $input) { id } }'
