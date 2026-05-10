export function AuthFormField({ field, value, onChange }) {
  return (
    <label className='auth_field' htmlFor={field.name}>
      <span>{field.label}</span>
      <input
        id={field.name}
        name={field.name}
        type={field.type}
        autoComplete={field.auto_complete}
        value={value}
        placeholder={field.placeholder}
        onChange={onChange}
        required
      />
    </label>
  )
}
