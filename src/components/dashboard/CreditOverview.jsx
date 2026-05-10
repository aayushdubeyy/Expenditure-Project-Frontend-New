export function CreditOverview({
  credit_line_list,
  credit_card_list,
  is_data_loading,
  data_error,
}) {
  if (is_data_loading) return <p className='dashboard_card_subtitle'>Loading dashboard data...</p>
  if (data_error) return <p className='expense_message expense_error'>{data_error}</p>
  return (
    <section className='credit_overview_grid'>
      <article className='overview_card'>
        <h3>Credit lines</h3>
        {renderCreditLineList(credit_line_list)}
      </article>
      <article className='overview_card'>
        <h3>Credit cards</h3>
        {renderCreditCardList(credit_card_list)}
      </article>
    </section>
  )
}

function renderCreditLineList(credit_line_list) {
  if (!credit_line_list.length) return <p className='empty_text'>No credit lines yet.</p>
  return (
    <ul className='overview_list'>
      {credit_line_list.map((credit_line_data) => (
        <li key={credit_line_data.id}>
          <strong>{credit_line_data.name}</strong>
          <span>Limit: {formatCurrency(credit_line_data.totalLimit)}</span>
          <span>Usage: {formatCurrency(credit_line_data.currentUsage)}</span>
        </li>
      ))}
    </ul>
  )
}

function renderCreditCardList(credit_card_list) {
  if (!credit_card_list.length) return <p className='empty_text'>No credit cards yet.</p>
  return (
    <ul className='overview_list'>
      {credit_card_list.map((credit_card_data) => (
        <li key={credit_card_data.id}>
          <strong>{credit_card_data.name}</strong>
          <span>Cycle: {credit_card_data.billCycleDay}</span>
          <span>Usage: {formatCurrency(credit_card_data.currentUsage)}</span>
        </li>
      ))}
    </ul>
  )
}

function formatCurrency(amount) {
  const safe_amount = Number(amount || 0)
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(safe_amount)
}
