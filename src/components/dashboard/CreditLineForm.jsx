export function CreditLineForm({
  form_values,
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
          <span>Credit line name</span>
          <input
            name='name'
            value={form_values.name}
            placeholder='HDFC credit line'
            onChange={onChange}
            required
          />
        </label>
        <label className='expense_field'>
          <span>Total limit</span>
          <input
            name='totalLimit'
            type='number'
            value={form_values.totalLimit}
            placeholder='150000'
            onChange={onChange}
            required
          />
        </label>
      </div>
      {renderMessages(error_message, success_message)}
      <button className='expense_submit' type='submit' disabled={is_loading}>
        {is_loading ? 'Creating...' : 'Create credit line'}
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
