import { brand_content } from '../../constants/brand.js'
import { DashboardHeroInsights } from './DashboardHeroInsights.jsx'

export function DashboardShell({ children, hero_monthly_data }) {
  return <DashboardLayout hero_monthly_data={hero_monthly_data}>{children}</DashboardLayout>
}

function DashboardLayout({ children, hero_monthly_data }) {
  return (
    <main className='dashboard_shell'>
      {renderDashboardHero(hero_monthly_data)}
      <section className='dashboard_panel'>{children}</section>
    </main>
  )
}

function renderDashboardHero(hero_monthly_data) {
  return (
    <section className='dashboard_hero'>
      <p className='dashboard_logo'>{brand_content.app_name}</p>
      <h1>Daily expense cockpit</h1>
      <p className='dashboard_subtext'>
        Keep your cash flow healthy by logging every spend with clean categories and smarter payment mapping.
      </p>
      <DashboardHeroInsights hero_monthly_data={hero_monthly_data} />
    </section>
  )
}
