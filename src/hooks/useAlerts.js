import { useEffect, useState } from 'react'
import { getAlerts, markAlertRead } from '../services/alertService.js'

export function useAlerts() {
  const [alert_list, set_alert_list] = useState([])
  const [error_message, set_error_message] = useState('')
  const [is_loading, set_is_loading] = useState(true)
  const [is_marking, set_is_marking] = useState(false)

  useEffect(() => {
    loadAlerts(set_alert_list, set_error_message, set_is_loading)
  }, [])

  async function onRefresh() {
    await loadAlerts(set_alert_list, set_error_message, set_is_loading)
  }

  async function onMarkRead(alert_id) {
    await markAsRead(alert_id, set_is_marking, set_error_message)
    await loadAlerts(set_alert_list, set_error_message, set_is_loading)
  }

  return { alert_list, error_message, is_loading, is_marking, onRefresh, onMarkRead }
}

async function loadAlerts(set_alert_list, set_error_message, set_is_loading) {
  try {
    set_is_loading(true)
    set_error_message('')
    const alerts = await getAlerts()
    set_alert_list(alerts)
  } catch (error) {
    set_error_message(error.message || 'Unable to load alerts.')
  } finally {
    set_is_loading(false)
  }
}

async function markAsRead(alert_id, set_is_marking, set_error_message) {
  try {
    set_is_marking(true)
    set_error_message('')
    await markAlertRead(alert_id)
  } catch (error) {
    set_error_message(error.message || 'Unable to mark alert as read.')
  } finally {
    set_is_marking(false)
  }
}
