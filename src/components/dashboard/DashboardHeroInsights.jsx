import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const chart_palette = ['#60a5fa', '#22d3ee', '#a78bfa', '#34d399', '#f59e0b', '#f43f5e']

export function DashboardHeroInsights({ hero_monthly_data }) {
  const category_chart_data = getCategoryChartData(hero_monthly_data.summary_data)
  const payment_chart_data = getPaymentChartData(hero_monthly_data.summary_data)
  return (
    <section className='hero_insights_panel'>
      {renderHeroInsightsHeader(hero_monthly_data.month, hero_monthly_data.year)}
      {renderHeroInsightsState(hero_monthly_data, category_chart_data, payment_chart_data)}
    </section>
  )
}

function renderHeroInsightsHeader(month, year) {
  return (
    <header className='hero_insights_header'>
      <h2>Monthly spend insights</h2>
      <p>{formatMonthLabel(month, year)}</p>
    </header>
  )
}

function formatMonthLabel(month, year) {
  const date_value = new Date(Number(year), Number(month) - 1, 1)
  return date_value.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
}

function renderHeroInsightsState(hero_monthly_data, category_chart_data, payment_chart_data) {
  if (hero_monthly_data.is_loading) return <p className='empty_text'>Loading chart insights...</p>
  if (hero_monthly_data.error_message) return <p className='expense_message expense_error'>{hero_monthly_data.error_message}</p>
  if (!category_chart_data.length && !payment_chart_data.length) return <p className='empty_text'>No monthly data available yet.</p>
  return (
    <>
      <p className='hero_total_spent'>Spent this month: {formatCurrency(hero_monthly_data.summary_data.totalSpent)}</p>
      <div className='hero_chart_grid'>
        {renderCategoryChart(category_chart_data)}
        {renderPaymentChart(payment_chart_data)}
      </div>
    </>
  )
}

function renderCategoryChart(category_chart_data) {
  return (
    <article className='dashboard_stat_card hero_chart_card'>
      <h3>Category share</h3>
      <div className='hero_chart_box'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={category_chart_data}>
            <XAxis dataKey='name' tick={{ fill: '#bfdbfe', fontSize: 11 }} interval={0} angle={-16} textAnchor='end' height={45} />
            <YAxis tick={{ fill: '#bfdbfe', fontSize: 11 }} tickFormatter={formatAxisCurrency} />
            <Tooltip content={<CurrencyTooltip />} />
            <Bar dataKey='total' radius={[8, 8, 0, 0]}>
              {category_chart_data.map((item_data, index) => (
                <Cell key={item_data.name} fill={chart_palette[index % chart_palette.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}

function formatAxisCurrency(amount) {
  const safe_amount = Number(amount || 0)
  if (safe_amount >= 1000) return `₹${(safe_amount / 1000).toFixed(1)}k`
  return `₹${safe_amount.toFixed(0)}`
}

function CurrencyTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className='hero_tooltip'>
      <p>{label}</p>
      <strong>{formatCurrency(payload[0].value)}</strong>
    </div>
  )
}

function renderPaymentChart(payment_chart_data) {
  return (
    <article className='dashboard_stat_card hero_chart_card'>
      <h3>Payment method share</h3>
      <div className='hero_chart_box'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie data={payment_chart_data} dataKey='total' nameKey='name' innerRadius={44} outerRadius={72} paddingAngle={2}>
              {payment_chart_data.map((item_data, index) => (
                <Cell key={item_data.name} fill={chart_palette[index % chart_palette.length]} />
              ))}
            </Pie>
            <Tooltip content={<CurrencyTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {renderPaymentLegend(payment_chart_data)}
    </article>
  )
}

function renderPaymentLegend(payment_chart_data) {
  return (
    <ul className='hero_payment_legend'>
      {payment_chart_data.map((item_data, index) => (
        <li key={item_data.name}>
          <span style={{ background: chart_palette[index % chart_palette.length] }} />
          <p>{item_data.name}</p>
        </li>
      ))}
    </ul>
  )
}

function getCategoryChartData(summary_data) {
  const category_data = summary_data?.categoryBreakdown || []
  return category_data.map((item_data) => ({
    name: getTrimmedLabel(item_data.categoryName),
    total: Number(item_data.total || 0),
  }))
}

function getPaymentChartData(summary_data) {
  const payment_data = summary_data?.paymentMethodBreakdown || []
  return payment_data.map((item_data) => ({
    name: getTrimmedLabel(item_data.paymentMethodName),
    total: Number(item_data.total || 0),
  }))
}

function getTrimmedLabel(raw_label) {
  const label_value = String(raw_label || '')
  if (label_value.length <= 18) return label_value
  return `${label_value.slice(0, 15)}...`
}

function formatCurrency(amount) {
  const safe_amount = Number(amount || 0)
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(safe_amount)
}
