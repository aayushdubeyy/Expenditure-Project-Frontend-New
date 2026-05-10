export const get_credit_lines_query =
  'query GetCreditLines { getCreditLines { id name totalLimit currentUsage } }'

export const get_credit_cards_query =
  'query GetCreditCards {' +
  ' getCreditCards { id name billCycleDay limit currentUsage creditLineId } }'
