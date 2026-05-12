export function ExpenseExplorer({
  filter_values,
  category_list,
  credit_card_list,
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
      <ExpenseResultList
        expense_list={expense_list}
        category_list={category_list}
        credit_card_list={credit_card_list}
        payment_methods={payment_methods}
      />
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

function ExpenseResultList({ expense_list, category_list, credit_card_list, payment_methods }) {
  if (!expense_list.length) return <p className='empty_text'>No expenses found for selected filters.</p>
  const category_map = buildNameMap(category_list)
  const card_map = buildNameMap(credit_card_list)
  const payment_map = buildNameMap(payment_methods)
  return (
    <div className='overview_list expense_result_list'>
      {expense_list.map((expense_data) => (
        <ExpenseCard
          key={expense_data.id}
          expense_data={expense_data}
          category_map={category_map}
          card_map={card_map}
          payment_map={payment_map}
        />
      ))}
    </div>
  )
}

function ExpenseCard({ expense_data, category_map, card_map, payment_map }) {
  const category_name = getNameById(category_map, expense_data.categoryId)
  const payment_name = getNameById(payment_map, expense_data.paymentMethodId)
  const card_name = getNameById(card_map, expense_data.creditCardId)
  return (
    <article className='overview_card'>
      <h3>{expense_data.title}</h3>
      <p className='result_meta'>Amount: {formatCurrency(expense_data.amount)}</p>
      <p className='result_meta'>Date: {formatExpenseDate(expense_data.date)}</p>
      <p className='result_meta'>Category: {category_name}</p>
      <p className='result_meta'>Payment: {payment_name}</p>
      {expense_data.creditCardId ? <p className='result_meta'>Card: {card_name}</p> : null}
      {expense_data.notes ? <p className='result_meta'>Notes: {expense_data.notes}</p> : null}
    </article>
  )
}

function formatCurrency(amount) {
  const safe_amount = Number(amount || 0)
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(safe_amount)
}

function formatExpenseDate(date_value) {
  if (!date_value) return '-'
  const numeric_date = Number(date_value)
  const date_obj = Number.isNaN(numeric_date) ? new Date(date_value) : new Date(numeric_date)
  if (Number.isNaN(date_obj.getTime())) return String(date_value)
  return date_obj.toLocaleDateString('en-IN')
}

function buildNameMap(data_list) {
  return data_list.reduce((accumulator, item_data) => {
    const key = String(item_data.id)
    accumulator[key] = item_data.name
    return accumulator
  }, {})
}

function getNameById(name_map, value_id) {
  if (!value_id && value_id !== 0) return '-'
  const key = String(value_id)
  return name_map[key] || key
}
