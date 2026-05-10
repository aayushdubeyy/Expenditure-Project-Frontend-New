export function FinancialDashboardView({
  filter_values,
  dashboard_data,
  error_message,
  is_loading,
  onSubmit,
  onChange,
}) {
  return (
    <section>
      <form className='expense_form' onSubmit={onSubmit}>
        <div className='expense_field_grid'>
          {renderMonthField(filter_values.month, onChange)}
          {renderYearField(filter_values.year, onChange)}
        </div>
        {error_message ? <p className='expense_message expense_error'>{error_message}</p> : null}
        <button className='expense_submit' type='submit' disabled={is_loading}>
          {is_loading ? 'Loading dashboard...' : 'Load financial dashboard'}
        </button>
      </form>
      <div className='credit_overview_grid'>
        {renderMetricCard('Total income', dashboard_data.totalIncome)}
        {renderMetricCard('Total expense', dashboard_data.totalExpense)}
        {renderMetricCard('Net savings', dashboard_data.netSavings)}
        {renderMetricCard('Credit remaining', dashboard_data?.creditUtilization?.remainingLimit)}
      </div>
      <article className='overview_card summary_panel'>
        <h3>Top spending categories</h3>
        {renderTopCategoryList(dashboard_data.topCategories)}
      </article>
      <article className='overview_card summary_panel'>
        <h3>Credit utilization</h3>
        {renderUtilizationInfo(dashboard_data.creditUtilization)}
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

function renderMetricCard(label, value) {
  return (
    <article className='overview_card'>
      <h3>{label}</h3>
      <p className='summary_total'>{formatCurrency(value)}</p>
    </article>
  )
}

function renderTopCategoryList(topCategories) {
  if (!topCategories?.length) return <p className='empty_text'>No category data yet.</p>
  return (
    <ul className='overview_list'>
      {topCategories.map((category_data) => (
        <li key={category_data.categoryId}>
          <strong>{category_data.categoryName}</strong>
          <span>Total: {formatCurrency(category_data.total)}</span>
          <span>Share: {formatPercent(category_data.percentage)}</span>
        </li>
      ))}
    </ul>
  )
}

function renderUtilizationInfo(creditUtilization) {
  if (!creditUtilization) return <p className='empty_text'>No credit utilization data yet.</p>
  return (
    <ul className='overview_list'>
      <li><span>Total limit: {formatCurrency(creditUtilization.totalLimit)}</span></li>
      <li><span>Total usage: {formatCurrency(creditUtilization.totalUsage)}</span></li>
      <li><span>Utilization: {formatPercent(creditUtilization.utilizationPercentage)}</span></li>
      <li><span>Remaining: {formatCurrency(creditUtilization.remainingLimit)}</span></li>
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
