export const create_credit_line_mutation =
  'mutation CreateCreditLine($name: String!, $totalLimit: Float!) {' +
  ' createCreditLine(name: $name, totalLimit: $totalLimit) { id } }'

export const create_credit_card_mutation =
  'mutation CreateCreditCard(' +
  '$name: String!, ' +
  '$billCycleDay: Int!, ' +
  '$limit: Float, ' +
  '$creditLineId: UUID!' +
  ') {' +
  ' createCreditCard(' +
  'name: $name, ' +
  'billCycleDay: $billCycleDay, ' +
  'limit: $limit, ' +
  'creditLineId: $creditLineId' +
  ') { id } }'

export const pay_credit_card_mutation =
  'mutation PayCreditCard($creditCardId: UUID!, $amount: Float!, $date: Date!) {' +
  ' payCreditCard(creditCardId: $creditCardId, amount: $amount, date: $date) { id } }'
