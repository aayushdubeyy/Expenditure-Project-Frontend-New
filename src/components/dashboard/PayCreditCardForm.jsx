export function PayCreditCardForm({
  form_values,
  credit_card_list,
  error_message,
  success_message,
  is_loading,
  onSubmit,
  onChange,
}) {
  return (
    <section>
      <form className='expense_form' onSubmit={onSubmit}>
        <div className='expense_field_grid'>
          <label className='expense_field'>
            <span>Credit card</span>
            <select name='creditCardId' value={form_values.creditCardId} onChange={onChange} required>
              <option value=''>Select card</option>
              {credit_card_list.map((card_data) => (
                <option key={card_data.id} value={card_data.id}>
                  {card_data.name}
                </option>
              ))}
            </select>
          </label>
          <label className='expense_field'>
            <span>Amount</span>
            <input name='amount' type='number' value={form_values.amount} onChange={onChange} required />
          </label>
          <label className='expense_field'>
            <span>Date</span>
            <input name='date' type='date' value={form_values.date} onChange={onChange} required />
          </label>
        </div>
        {error_message ? <p className='expense_message expense_error'>{error_message}</p> : null}
        {success_message ? <p className='expense_message expense_success'>{success_message}</p> : null}
        <button className='expense_submit' type='submit' disabled={is_loading}>
          {is_loading ? 'Processing payment...' : 'Pay credit card'}
        </button>
      </form>
    </section>
  )
}
