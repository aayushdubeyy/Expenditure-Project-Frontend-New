export function CreditCardForm({
  form_values,
  credit_line_list,
  error_message,
  success_message,
  is_loading,
  onSubmit,
  onChange,
}) {
  return (
    <form className='expense_form' onSubmit={onSubmit}>
      <div className='expense_field_grid'>
        <label className='expense_field'>
          <span>Credit card name</span>
          <input
            name='name'
            value={form_values.name}
            placeholder='HDFC Millennia'
            onChange={onChange}
            required
          />
        </label>
        <label className='expense_field'>
          <span>Bill cycle day</span>
          <input
            name='billCycleDay'
            type='number'
            value={form_values.billCycleDay}
            placeholder='12'
            onChange={onChange}
            required
          />
        </label>
        <label className='expense_field'>
          <span>Credit line</span>
          <select name='creditLineId' value={form_values.creditLineId} onChange={onChange} required>
            <option value=''>Select credit line</option>
            {credit_line_list.map((credit_line_data) => (
              <option key={credit_line_data.id} value={credit_line_data.id}>
                {credit_line_data.name}
              </option>
            ))}
          </select>
        </label>
        <label className='expense_field'>
          <span>Card limit (optional)</span>
          <input
            name='limit'
            type='number'
            value={form_values.limit}
            placeholder='Can be empty'
            onChange={onChange}
          />
        </label>
      </div>
      {renderMessages(error_message, success_message)}
      <button className='expense_submit' type='submit' disabled={is_loading}>
        {is_loading ? 'Creating...' : 'Create credit card'}
      </button>
    </form>
  )
}

function renderMessages(error_message, success_message) {
  return (
    <>
      {error_message ? <p className='expense_message expense_error'>{error_message}</p> : null}
      {success_message ? <p className='expense_message expense_success'>{success_message}</p> : null}
    </>
  )
}
