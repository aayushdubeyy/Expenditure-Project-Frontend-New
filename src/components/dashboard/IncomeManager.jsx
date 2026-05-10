export function IncomeManager({
  form_values,
  income_list,
  error_message,
  success_message,
  is_loading,
  is_list_loading,
  onSubmit,
  onChange,
}) {
  return (
    <section>
      <form className='expense_form' onSubmit={onSubmit}>
        <div className='expense_field_grid'>
          <label className='expense_field'>
            <span>Amount</span>
            <input name='amount' type='number' value={form_values.amount} onChange={onChange} required />
          </label>
          <label className='expense_field'>
            <span>Source</span>
            <input name='source' value={form_values.source} placeholder='Salary or freelance' onChange={onChange} required />
          </label>
          <label className='expense_field'>
            <span>Date</span>
            <input name='date' type='date' value={form_values.date} onChange={onChange} required />
          </label>
        </div>
        {error_message ? <p className='expense_message expense_error'>{error_message}</p> : null}
        {success_message ? <p className='expense_message expense_success'>{success_message}</p> : null}
        <button className='expense_submit' type='submit' disabled={is_loading}>
          {is_loading ? 'Saving income...' : 'Create income'}
        </button>
      </form>
      <article className='overview_card summary_panel'>
        <h3>Income entries</h3>
        {is_list_loading ? <p className='empty_text'>Loading incomes...</p> : renderIncomeList(income_list)}
      </article>
    </section>
  )
}

function renderIncomeList(income_list) {
  if (!income_list.length) return <p className='empty_text'>No incomes found.</p>
  return (
    <ul className='overview_list'>
      {income_list.map((income_data) => (
        <li key={income_data.id}>
          <strong>{income_data.source}</strong>
          <span>Amount: {formatCurrency(income_data.amount)}</span>
          <span>Date: {income_data.date}</span>
        </li>
      ))}
    </ul>
  )
}

function formatCurrency(amount) {
  const safe_amount = Number(amount || 0)
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(safe_amount)
}
