export function CreditInsightsView({
  insights_data,
  error_message,
  is_loading,
  onRefresh,
}) {
  return (
    <section>
      {error_message ? <p className='expense_message expense_error'>{error_message}</p> : null}
      <button className='expense_submit' type='button' disabled={is_loading} onClick={onRefresh}>
        {is_loading ? 'Refreshing...' : 'Refresh credit insights'}
      </button>
      <div className='credit_overview_grid summary_panel'>
        {renderMetricCard('Total debt', insights_data.totalDebt)}
        {renderMetricCard('Total limit', insights_data.totalLimit)}
        {renderMetricCard('Remaining limit', insights_data.remainingLimit)}
        {renderPercentCard('Utilization', insights_data.utilizationPercentage)}
      </div>
      <article className='overview_card summary_panel'>
        <h3>Card utilization</h3>
        {renderCardList(insights_data.cards)}
      </article>
    </section>
  )
}

function renderMetricCard(label, value) {
  return (
    <article className='overview_card'>
      <h3>{label}</h3>
      <p className='summary_total'>{formatCurrency(value)}</p>
    </article>
  )
}

function renderPercentCard(label, value) {
  return (
    <article className='overview_card'>
      <h3>{label}</h3>
      <p className='summary_total'>{formatPercent(value)}</p>
    </article>
  )
}

function renderCardList(cards) {
  if (!cards?.length) return <p className='empty_text'>No card insights yet.</p>
  return (
    <ul className='overview_list'>
      {cards.map((card_data) => (
        <li key={card_data.cardId}>
          <strong>{card_data.name}</strong>
          <span>Usage: {formatCurrency(card_data.usage)}</span>
          <span>Limit: {formatCurrency(card_data.limit)}</span>
        </li>
      ))}
    </ul>
  )
}

function formatCurrency(amount) {
  const safe_amount = Number(amount || 0)
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(safe_amount)
}

function formatPercent(percentage) {
  const safe_percent = Number(percentage || 0)
  return `${safe_percent.toFixed(2)}%`
}
