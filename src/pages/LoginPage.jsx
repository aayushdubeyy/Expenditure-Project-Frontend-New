import { AuthForm } from '../components/auth/AuthForm.jsx'
import { AuthShell } from '../components/auth/AuthShell.jsx'
import { login_fields } from '../constants/authFields.js'
import { route_paths } from '../constants/routes.js'
import { useLoginForm } from '../hooks/useLoginForm.js'

export function LoginPage() {
  const { form_values, error_message, success_message, is_loading, onSubmit, onChange } = useLoginForm()
  return (
    <AuthShell
      title='Welcome back'
      subtitle='Log in to continue tracking your money goals.'
      link_to={route_paths.signup}
      link_label='Create account'
    >
      <AuthForm
        fields={login_fields}
        form_values={form_values}
        is_loading={is_loading}
        submit_label='Log in'
        error_message={error_message}
        success_message={success_message}
        onSubmit={onSubmit}
        onChange={onChange}
      />
    </AuthShell>
  )
}
