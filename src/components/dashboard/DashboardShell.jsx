import { brand_content } from '../../constants/brand.js'

export function DashboardShell({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>
}

function DashboardLayout({ children }) {
  return (
    <main className='dashboard_shell'>
      {renderDashboardHero()}
      <section className='dashboard_panel'>{children}</section>
    </main>
  )
}

function renderDashboardHero() {
  return (
    <section className='dashboard_hero'>
      <p className='dashboard_logo'>{brand_content.app_name}</p>
      <h1>Daily expense cockpit</h1>
      <p className='dashboard_subtext'>
        Keep your cash flow healthy by logging every spend with clean categories and smarter payment mapping.
      </p>
      <div className='dashboard_stat_grid'>
        {renderStatCard('Today', 'Track all purchases')}
        {renderStatCard('Focus', 'Build mindful habits')}
      </div>
    </section>
  )
}

function renderStatCard(label, value) {
  return (
    <article className='dashboard_stat_card'>
      <p>{label}</p>
      <strong>{value}</strong>
    </article>
  )
}
