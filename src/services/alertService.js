import { mark_alert_read_mutation } from '../graphql/mutations/alertMutations.js'
import { get_alerts_query } from '../graphql/queries/alertQueries.js'
import { executeGraphqlRequest } from './apiClient.js'

export async function getAlerts() {
  const data = await executeGraphqlRequest(get_alerts_query, {})
  return data?.getAlerts || []
}

export async function markAlertRead(alert_id) {
  const variables = { alertId: alert_id }
  const data = await executeGraphqlRequest(mark_alert_read_mutation, variables)
  return data?.markAlertRead
}
