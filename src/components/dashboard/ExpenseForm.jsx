export function ExpenseForm(props) {
  return <ExpenseFormBody {...props} />
}

function ExpenseFormBody(props) {
  const { form_values, category_list, payment_methods, is_category_loading, onChange } = props
  const primary_fields = buildPrimaryFields(
    form_values,
    category_list,
    payment_methods,
    is_category_loading,
    onChange,
  )
  return (
    <form className='expense_form' onSubmit={props.onSubmit}>
      <div className='expense_field_grid'>{primary_fields}</div>
      <TextAreaField name='notes' label='Notes (optional)' value={form_values.notes} onChange={onChange} />
      {renderCardField(props.is_credit_card_mode, form_values.creditcardId, onChange)}
      {renderMessages(props.error_message, props.success_message)}
      <SubmitButton is_loading={props.is_loading} />
    </form>
  )
}

function buildPrimaryFields(form_values, category_list, payment_methods, is_category_loading, onChange) {
  return (
    <>
      {renderTitleField(form_values.title, onChange)}
      {renderAmountField(form_values.amount, onChange)}
      {renderCategoryField(
        category_list,
        form_values.categoryId,
        is_category_loading,
        onChange,
      )}
      {renderPaymentField(payment_methods, form_values.paymentMethodId, onChange)}
      {renderDateField(form_values.date, onChange)}
    </>
  )
}

function renderTitleField(title, onChange) {
  return (
    <InputField
      name='title'
      label='Title'
      placeholder='Dinner with friends'
      value={title}
      onChange={onChange}
    />
  )
}

function renderAmountField(amount, onChange) {
  return (
    <InputField
      name='amount'
      label='Amount'
      type='number'
      placeholder='1250.50'
      value={amount}
      onChange={onChange}
    />
  )
}

function renderCategoryField(category_list, categoryId, is_category_loading, onChange) {
  return (
    <CategoryField
      category_list={category_list}
      categoryId={categoryId}
      is_category_loading={is_category_loading}
      onChange={onChange}
    />
  )
}

function renderPaymentField(payment_methods, paymentMethodId, onChange) {
  return (
    <PaymentField
      payment_methods={payment_methods}
      paymentMethodId={paymentMethodId}
      onChange={onChange}
    />
  )
}

function renderDateField(date, onChange) {
  return (
    <InputField
      name='date'
      label='Date'
      type='date'
      value={date}
      onChange={onChange}
    />
  )
}

function renderCardField(is_credit_card_mode, creditcardId, onChange) {
  if (!is_credit_card_mode) return null
  return (
    <InputField
      name='creditcardId'
      label='Credit card id'
      placeholder='3fa85f64-5717-4562-b3fc-2c963f66afa6'
      value={creditcardId}
      onChange={onChange}
    />
  )
}

function renderMessages(error_message, success_message) {
  return (
    <>
      {error_message ? (
        <p className='expense_message expense_error'>{error_message}</p>
      ) : null}
      {success_message ? (
        <p className='expense_message expense_success'>{success_message}</p>
      ) : null}
    </>
  )
}

function SubmitButton({ is_loading }) {
  return (
    <button className='expense_submit' type='submit' disabled={is_loading}>
      {is_loading ? 'Saving expense...' : 'Log expense'}
    </button>
  )
}

function InputField({ name, label, type = 'text', placeholder = '', value, onChange }) {
  return (
    <label className='expense_field'>
      <span>{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </label>
  )
}

function CategoryField({ category_list, categoryId, is_category_loading, onChange }) {
  return (
    <label className='expense_field'>
      <span>Category</span>
      <select
        name='categoryId'
        value={categoryId}
        onChange={onChange}
        required
        disabled={is_category_loading}
      >
        <option value=''>{is_category_loading ? 'Loading categories...' : 'Choose category'}</option>
        {category_list.map((category_data) => (
          <option key={category_data.id} value={category_data.id}>
            {category_data.name}
          </option>
        ))}
      </select>
    </label>
  )
}

function PaymentField({ payment_methods, paymentMethodId, onChange }) {
  return (
    <label className='expense_field'>
      <span>Payment method</span>
      <select
        name='paymentMethodId'
        value={paymentMethodId}
        onChange={onChange}
        required
      >
        <option value=''>Choose payment mode</option>
        {payment_methods.map((payment_method) => (
          <option key={payment_method.id} value={payment_method.id}>
            {payment_method.name}
          </option>
        ))}
      </select>
    </label>
  )
}

function TextAreaField({ name, label, value, onChange }) {
  return (
    <label className='expense_field'>
      <span>{label}</span>
      <textarea
        name={name}
        rows='4'
        placeholder='Optional details for this expense'
        value={value}
        onChange={onChange}
      />
    </label>
  )
}
