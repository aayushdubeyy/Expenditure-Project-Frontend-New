export function SummaryView({
  title,
  subtitle,
  filter_values,
  error_message,
  is_loading,
  summary_data,
  onSubmit,
  onChange,
  show_month,
}) {
  return (
    <section>
      <form className='expense_form' onSubmit={onSubmit}>
        <div className='expense_field_grid'>
          {show_month ? renderMonthField(filter_values.month, onChange) : null}
          {renderYearField(filter_values.year, onChange)}
        </div>
        {error_message ? <p className='expense_message expense_error'>{error_message}</p> : null}
        <button className='expense_submit' type='submit' disabled={is_loading}>
          {is_loading ? 'Loading summary...' : 'Load summary'}
        </button>
      </form>
      <article className='summary_panel'>
        <h3>{title}</h3>
        <p className='dashboard_card_subtitle'>{subtitle}</p>
        {renderSummaryTotal(summary_data)}
        <div className='credit_overview_grid'>
          <article className='overview_card'>
            <h3>Category breakdown</h3>
            {renderBreakdownList(summary_data.categoryBreakdown, 'category')}
          </article>
          <article className='overview_card'>
            <h3>Payment method breakdown</h3>
            {renderBreakdownList(summary_data.paymentMethodBreakdown, 'payment')}
          </article>
        </div>
      </article>
    </section>
  )
}

function renderMonthField(month, onChange) {
  return (
    <label className='expense_field'>
      <span>Month</span>
      <input type='number' min='1' max='12' name='month' value={month} onChange={onChange} required />
    </label>
  )
}

function renderYearField(year, onChange) {
  return (
    <label className='expense_field'>
      <span>Year</span>
      <input type='number' min='2000' max='2100' name='year' value={year} onChange={onChange} required />
    </label>
  )
}

function renderSummaryTotal(summary_data) {
  if (!summary_data.totalSpent) return <p className='empty_text'>No summary data loaded yet.</p>
  return <p className='summary_total'>Total spent: {formatCurrency(summary_data.totalSpent)}</p>
}

function renderBreakdownList(breakdown_list, key_name) {
  if (!breakdown_list?.length) return <p className='empty_text'>No breakdown data found.</p>
  return (
    <ul className='overview_list'>
      {breakdown_list.map((item_data) => (
        <li key={getBreakdownKey(item_data, key_name)}>
          <strong>{getBreakdownName(item_data, key_name)}</strong>
          <span>Total: {formatCurrency(item_data.total)}</span>
          <span>Share: {formatPercent(item_data.percentage)}</span>
        </li>
      ))}
    </ul>
  )
}

function getBreakdownKey(item_data, key_name) {
  if (key_name === 'category') return item_data.categoryId
  return item_data.paymentMethodId
}

function getBreakdownName(item_data, key_name) {
  if (key_name === 'category') return item_data.categoryName
  return item_data.paymentMethodName
}

function formatCurrency(amount) {
  const safe_amount = Number(amount || 0)
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(safe_amount)
}

function formatPercent(percentage) {
  const safe_percent = Number(percentage || 0)
  return `${safe_percent.toFixed(2)}%`
}
