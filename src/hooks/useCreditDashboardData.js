import { useCallback, useEffect, useState } from 'react'
import { getCreditCards, getCreditLines } from '../services/creditService.js'

export function useCreditDashboardData() {
  const [credit_line_list, set_credit_line_list] = useState([])
  const [credit_card_list, set_credit_card_list] = useState([])
  const [is_data_loading, set_is_data_loading] = useState(true)
  const [data_error, set_data_error] = useState('')
  const refreshCreditData = useCallback(async () => {
    await loadCreditData(set_credit_line_list, set_credit_card_list, set_is_data_loading, set_data_error)
  }, [])
  useEffect(() => {
    refreshCreditData()
  }, [refreshCreditData])
  return { credit_line_list, credit_card_list, is_data_loading, data_error, refreshCreditData }
}

async function loadCreditData(set_credit_line_list, set_credit_card_list, set_is_data_loading, set_data_error) {
  try {
    set_is_data_loading(true)
    set_data_error('')
    const [credit_lines, credit_cards] = await Promise.all([getCreditLines(), getCreditCards()])
    set_credit_line_list(credit_lines)
    set_credit_card_list(credit_cards)
  } catch (error) {
    set_data_error(error.message || 'Unable to load credit data.')
  } finally {
    set_is_data_loading(false)
  }
}
