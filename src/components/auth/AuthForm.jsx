import { AuthFormField } from './AuthFormField.jsx'

export function AuthForm({
  fields,
  form_values,
  is_loading,
  submit_label,
  error_message,
  success_message,
  onSubmit,
  onChange,
}) {
  return (
    <form className='auth_form' onSubmit={onSubmit}>
      {fields.map((field) => (
        <AuthFormField key={field.name} field={field} value={form_values[field.name]} onChange={onChange} />
      ))}
      {error_message ? <p className='auth_message auth_error'>{error_message}</p> : null}
      {success_message ? <p className='auth_message auth_success'>{success_message}</p> : null}
      <button className='auth_submit' type='submit' disabled={is_loading}>{is_loading ? 'Please wait...' : submit_label}</button>
    </form>
  )
}
