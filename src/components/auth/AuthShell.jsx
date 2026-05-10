import { Link } from 'react-router-dom'
import { brand_content } from '../../constants/brand.js'

export function AuthShell({ title, subtitle, link_to, link_label, children }) {
  return (
    <main className='auth_shell'>
      <section className='auth_brand_panel'>
        <p className='auth_logo'>{brand_content.app_name}</p>
        <h1>{brand_content.panel_title}</h1>
        <p className='auth_panel_text'>{brand_content.panel_text}</p>
      </section>
      <section className='auth_form_panel'>
        <article className='auth_card'>
          <h2>{title}</h2>
          <p className='auth_subtitle'>{subtitle}</p>
          {children}
          <p className='auth_switch_link'>Go to <Link to={link_to}>{link_label}</Link></p>
        </article>
      </section>
    </main>
  )
}
