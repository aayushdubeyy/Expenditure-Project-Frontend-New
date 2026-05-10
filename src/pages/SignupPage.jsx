import { AuthForm } from '../components/auth/AuthForm.jsx'
import { AuthShell } from '../components/auth/AuthShell.jsx'
import { route_paths } from '../constants/routes.js'
import { signup_fields } from '../constants/authFields.js'
import { useSignupForm } from '../hooks/useSignupForm.js'

export function SignupPage() {
  const { form_values, error_message, success_message, is_loading, onSubmit, onChange } = useSignupForm()
  return (
    <AuthShell
      title='Create your account'
      subtitle='Start budgeting smarter with real-time GraphQL powered finance insights.'
      link_to={route_paths.login}
      link_label='Back to login'
    >
      <AuthForm
        fields={signup_fields}
        form_values={form_values}
        is_loading={is_loading}
        submit_label='Create account'
        error_message={error_message}
        success_message={success_message}
        onSubmit={onSubmit}
        onChange={onChange}
      />
    </AuthShell>
  )
}
