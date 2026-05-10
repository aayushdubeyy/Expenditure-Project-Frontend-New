export const create_expense_mutation =
  'mutation CreateExpense(' +
  '$title: String!, ' +
  '$amount: Float!, ' +
  '$categoryId: UUID!, ' +
  '$paymentMethodId: Int!, ' +
  '$creditcardId: UUID, ' +
  '$date: Date!, ' +
  '$notes: String' +
  ') {' +
  ' createExpense(' +
  'title: $title, ' +
  'amount: $amount, ' +
  'categoryId: $categoryId, ' +
  'paymentMethodId: $paymentMethodId, ' +
  'creditcardId: $creditcardId, ' +
  'date: $date, ' +
  'notes: $notes' +
  ') { id } }'
