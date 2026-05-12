import { useEffect, useState } from 'react'
import { getMonthlySummary } from '../services/expenseService.js'

export function useHeroMonthlyInsights() {
  const [hero_monthly_data, set_hero_monthly_data] = useState(getInitialHeroMonthlyData())
  useEffect(() => {
    loadHeroMonthlyInsights(set_hero_monthly_data)
  }, [])
  return hero_monthly_data
}

function getInitialHeroMonthlyData() {
  return {
    month: getCurrentMonth(),
    year: getCurrentYear(),
    summary_data: {},
    is_loading: true,
    error_message: '',
  }
}

async function loadHeroMonthlyInsights(set_hero_monthly_data) {
  const month = getCurrentMonth()
  const year = getCurrentYear()
  try {
    const summary_data = await getMonthlySummary(month, year)
    set_hero_monthly_data({ month, year, summary_data, is_loading: false, error_message: '' })
  } catch (error) {
    set_hero_monthly_data(getErrorState(month, year, error))
  }
}

function getErrorState(month, year, error) {
  return {
    month,
    year,
    summary_data: {},
    is_loading: false,
    error_message: error.message || 'Unable to load monthly insights.',
  }
}

function getCurrentMonth() {
  return String(new Date().getMonth() + 1)
}

function getCurrentYear() {
  return String(new Date().getFullYear())
}
