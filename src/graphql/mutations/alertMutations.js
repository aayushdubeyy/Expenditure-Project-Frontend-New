export const mark_alert_read_mutation =
  'mutation MarkAlertRead($alertId: UUID!) {' +
  ' markAlertRead(alertId: $alertId) { id }' +
  ' }'
