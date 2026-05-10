import { useState } from 'react'
import { AlertsPanel } from '../components/dashboard/AlertsPanel.jsx'
import { CreditCardForm } from '../components/dashboard/CreditCardForm.jsx'
import { CreditInsightsView } from '../components/dashboard/CreditInsightsView.jsx'
import { CreditLineForm } from '../components/dashboard/CreditLineForm.jsx'
import { CreditOverview } from '../components/dashboard/CreditOverview.jsx'
import { DashboardShell } from '../components/dashboard/DashboardShell.jsx'
import { ExpenseExplorer } from '../components/dashboard/ExpenseExplorer.jsx'
import { ExpenseForm } from '../components/dashboard/ExpenseForm.jsx'
import { FinancialDashboardView } from '../components/dashboard/FinancialDashboardView.jsx'
import { IncomeManager } from '../components/dashboard/IncomeManager.jsx'
import { ModuleSelector } from '../components/dashboard/ModuleSelector.jsx'
import { PayCreditCardForm } from '../components/dashboard/PayCreditCardForm.jsx'
import { SummaryView } from '../components/dashboard/SummaryView.jsx'
import { useAlerts } from '../hooks/useAlerts.js'
import { useCreditCardForm } from '../hooks/useCreditCardForm.js'
import { useCreditDashboardData } from '../hooks/useCreditDashboardData.js'
import { useCreditInsights } from '../hooks/useCreditInsights.js'
import { useCreditLineForm } from '../hooks/useCreditLineForm.js'
import { useExpenseExplorer } from '../hooks/useExpenseExplorer.js'
import { useExpenseForm } from '../hooks/useExpenseForm.js'
import { useFinancialDashboard } from '../hooks/useFinancialDashboard.js'
import { useIncomeManager } from '../hooks/useIncomeManager.js'
import { useMonthlySummary } from '../hooks/useMonthlySummary.js'
import { usePayCreditCardForm } from '../hooks/usePayCreditCardForm.js'
import { useYearlySummary } from '../hooks/useYearlySummary.js'

const module_options = [
  { id: 'overview', title: 'Dashboard overview', subtitle: 'See credit usage and quick status' },
  { id: 'expense', title: 'Log expense', subtitle: 'Capture an expense when needed' },
  { id: 'expense_search', title: 'Search expense', subtitle: 'Query expense with optional filters' },
  { id: 'financial_dashboard', title: 'Financial dashboard', subtitle: 'Get month-wise finance snapshot' },
  { id: 'credit_insights', title: 'Credit insights', subtitle: 'Track debt and utilization by card' },
  { id: 'income', title: 'Manage income', subtitle: 'Add incomes and view entries' },
  { id: 'monthly_summary', title: 'Monthly summary', subtitle: 'Track spend by month and category' },
  { id: 'yearly_summary', title: 'Yearly summary', subtitle: 'Review annual spend insights' },
  { id: 'credit_line', title: 'Create credit line', subtitle: 'Add shared limit pools' },
  { id: 'credit_card', title: 'Create credit card', subtitle: 'Connect cards with existing lines' },
  { id: 'pay_credit_card', title: 'Pay credit card', subtitle: 'Record card bill payments' },
  { id: 'alerts', title: 'Alerts', subtitle: 'Review spending and utilization alerts' },
]

export function DashboardPage() {
  const [active_module, set_active_module] = useState('overview')
  const expense_form_data = useExpenseForm()
  const expense_explorer_data = useExpenseExplorer()
  const financial_dashboard_data = useFinancialDashboard()
  const credit_insights_data = useCreditInsights()
  const income_manager_data = useIncomeManager()
  const alerts_data = useAlerts()
  const monthly_summary_data = useMonthlySummary()
  const yearly_summary_data = useYearlySummary()
  const credit_data = useCreditDashboardData()
  const credit_line_form_data = useCreditLineForm(credit_data.refreshCreditData)
  const credit_card_form_data = useCreditCardForm(credit_data.refreshCreditData)
  const pay_card_form_data = usePayCreditCardForm(credit_data.refreshCreditData)
  return (
    <DashboardShell>
      <article className='dashboard_card'>
        <h2>Northstar dashboard</h2>
        <p className='dashboard_card_subtitle'>
          Pick any action below based on what you want to manage right now.
        </p>
        <ModuleSelector active_module={active_module} module_options={module_options} onSelect={set_active_module} />
        {renderActiveModule(
          active_module,
          expense_form_data,
          expense_explorer_data,
          financial_dashboard_data,
          credit_insights_data,
          income_manager_data,
          monthly_summary_data,
          yearly_summary_data,
          credit_line_form_data,
          credit_card_form_data,
          pay_card_form_data,
          alerts_data,
          credit_data,
        )}
      </article>
    </DashboardShell>
  )
}

function renderActiveModule(
  active_module,
  expense_form_data,
  expense_explorer_data,
  financial_dashboard_data,
  credit_insights_data,
  income_manager_data,
  monthly_summary_data,
  yearly_summary_data,
  credit_line_form_data,
  credit_card_form_data,
  pay_card_form_data,
  alerts_data,
  credit_data,
) {
  if (active_module === 'expense') return <ExpenseForm {...expense_form_data} />
  if (active_module === 'expense_search') return <ExpenseExplorer {...expense_explorer_data} />
  if (active_module === 'financial_dashboard') {
    return <FinancialDashboardView {...financial_dashboard_data} />
  }
  if (active_module === 'credit_insights') return <CreditInsightsView {...credit_insights_data} />
  if (active_module === 'income') return <IncomeManager {...income_manager_data} />
  if (active_module === 'monthly_summary') {
    return renderSummaryModule('monthly', monthly_summary_data)
  }
  if (active_module === 'yearly_summary') {
    return renderSummaryModule('yearly', yearly_summary_data)
  }
  if (active_module === 'credit_line') return <CreditLineForm {...credit_line_form_data} />
  if (active_module === 'credit_card') {
    return <CreditCardForm {...credit_card_form_data} credit_line_list={credit_data.credit_line_list} />
  }
  if (active_module === 'pay_credit_card') {
    return <PayCreditCardForm {...pay_card_form_data} credit_card_list={credit_data.credit_card_list} />
  }
  if (active_module === 'alerts') return <AlertsPanel {...alerts_data} />
  return <CreditOverview {...credit_data} />
}

function renderSummaryModule(mode_name, summary_data) {
  if (mode_name === 'monthly') {
    return (
      <SummaryView
        title='Monthly summary'
        subtitle='Breakdown by category and payment method for selected month.'
        show_month
        {...summary_data}
      />
    )
  }
  return (
    <SummaryView
      title='Yearly summary'
      subtitle='Breakdown by category and payment method for selected year.'
      show_month={false}
      {...summary_data}
    />
  )
}
