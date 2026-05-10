export function ExpenseExplorer({
  filter_values,
  category_list,
  payment_methods,
  expense_list,
  error_message,
  is_loading,
  onSearch,
  onDateChange,
  onCategoryToggle,
  onPaymentToggle,
}) {
  return (
    <section>
      <form className='expense_form' onSubmit={onSearch}>
        <div className='expense_field_grid'>
          {renderDateField('startDate', 'Start date', filter_values.startDate, onDateChange)}
          {renderDateField('endDate', 'End date', filter_values.endDate, onDateChange)}
        </div>
        <FilterGroup
          title='Filter by categories'
          data_list={category_list}
          selected_ids={filter_values.categoryIds}
          onToggle={onCategoryToggle}
          getId={(item_data) => item_data.id}
          getLabel={(item_data) => item_data.name}
        />
        <FilterGroup
          title='Filter by payment methods'
          data_list={payment_methods}
          selected_ids={filter_values.paymentMethodIds}
          onToggle={onPaymentToggle}
          getId={(item_data) => String(item_data.id)}
          getLabel={(item_data) => item_data.name}
        />
        {error_message ? <p className='expense_message expense_error'>{error_message}</p> : null}
        <button className='expense_submit' type='submit' disabled={is_loading}>
          {is_loading ? 'Searching...' : 'Search expense'}
        </button>
      </form>
      <ExpenseResultList expense_list={expense_list} />
    </section>
  )
}

function renderDateField(name, label, value, onDateChange) {
  return (
    <label className='expense_field'>
      <span>{label}</span>
      <input type='date' name={name} value={value} onChange={onDateChange} />
    </label>
  )
}

function FilterGroup({ title, data_list, selected_ids, onToggle, getId, getLabel }) {
  return (
    <article>
      <p className='chip_group_title'>{title}</p>
      <div className='chip_group'>
        {data_list.map((item_data) => (
          <FilterChip
            key={getId(item_data)}
            item_id={getId(item_data)}
            label={getLabel(item_data)}
            selected_ids={selected_ids}
            onToggle={onToggle}
          />
        ))}
      </div>
    </article>
  )
}

function FilterChip({ item_id, label, selected_ids, onToggle }) {
  const is_selected = selected_ids.includes(item_id)
  return (
    <button
      type='button'
      className={is_selected ? 'filter_chip filter_chip_active' : 'filter_chip'}
      onClick={() => onToggle(item_id)}
    >
      {label}
    </button>
  )
}

function ExpenseResultList({ expense_list }) {
  if (!expense_list.length) return <p className='empty_text'>No expenses found for selected filters.</p>
  return (
    <div className='overview_list expense_result_list'>
      {expense_list.map((expense_data) => <ExpenseCard key={expense_data.id} expense_data={expense_data} />)}
    </div>
  )
}

function ExpenseCard({ expense_data }) {
  return (
    <article className='overview_card'>
      <h3>{expense_data.title}</h3>
      <p className='result_meta'>Amount: {formatCurrency(expense_data.amount)}</p>
      <p className='result_meta'>Date: {expense_data.date}</p>
      <p className='result_meta'>Category: {expense_data.categoryId}</p>
      <p className='result_meta'>Payment: {expense_data.paymentMethodId}</p>
      {expense_data.creditCardId ? <p className='result_meta'>Card: {expense_data.creditCardId}</p> : null}
      {expense_data.notes ? <p className='result_meta'>Notes: {expense_data.notes}</p> : null}
    </article>
  )
}

function formatCurrency(amount) {
  const safe_amount = Number(amount || 0)
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(safe_amount)
}
