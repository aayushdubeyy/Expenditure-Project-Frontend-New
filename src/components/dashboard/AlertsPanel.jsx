export function AlertsPanel({
  alert_list,
  error_message,
  is_loading,
  is_marking,
  onRefresh,
  onMarkRead,
}) {
  return (
    <section>
      <button className='expense_submit' type='button' disabled={is_loading} onClick={onRefresh}>
        {is_loading ? 'Refreshing alerts...' : 'Refresh alerts'}
      </button>
      {error_message ? <p className='expense_message expense_error'>{error_message}</p> : null}
      <div className='alerts_list'>{renderAlertList(alert_list, is_marking, onMarkRead)}</div>
    </section>
  )
}

function renderAlertList(alert_list, is_marking, onMarkRead) {
  if (!alert_list.length) return <p className='empty_text'>No alerts right now.</p>
  return alert_list.map((alert_data) => (
    <article className={getAlertClassName(alert_data.read)} key={alert_data.id}>
      <p className='alert_type'>{alert_data.type}</p>
      <h3>{alert_data.title}</h3>
      <p className='result_meta'>{alert_data.message}</p>
      {alert_data.read ? (
        <p className='empty_text'>Marked as read</p>
      ) : (
        <button
          className='alert_action_button'
          type='button'
          disabled={is_marking}
          onClick={() => onMarkRead(alert_data.id)}
        >
          Mark as read
        </button>
      )}
    </article>
  ))
}

function getAlertClassName(read) {
  if (read) return 'overview_card alert_card alert_card_read'
  return 'overview_card alert_card'
}
