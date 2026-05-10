import { useEffect, useState } from 'react'
import { getCreditInsights } from '../services/dashboardService.js'

export function useCreditInsights() {
  const [insights_data, set_insights_data] = useState({})
  const [error_message, set_error_message] = useState('')
  const [is_loading, set_is_loading] = useState(true)

  useEffect(() => {
    loadInsights(set_insights_data, set_error_message, set_is_loading)
  }, [])

  async function onRefresh() {
    await loadInsights(set_insights_data, set_error_message, set_is_loading)
  }

  return { insights_data, error_message, is_loading, onRefresh }
}

async function loadInsights(set_insights_data, set_error_message, set_is_loading) {
  try {
    set_is_loading(true)
    set_error_message('')
    const insights = await getCreditInsights()
    set_insights_data(insights)
  } catch (error) {
    set_error_message(error.message || 'Unable to fetch credit insights.')
  } finally {
    set_is_loading(false)
  }
}
