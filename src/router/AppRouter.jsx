import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage.jsx'
import { SignupPage } from '../pages/SignupPage.jsx'
import { route_paths } from '../constants/routes.js'
import { DashboardPage } from '../pages/DashboardPage.jsx'
import { PrivateRoute } from './PrivateRoute.jsx'
import { PublicRoute } from './PublicRoute.jsx'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={route_paths.login} element={<LoginPage />} />
        <Route path={route_paths.signup} element={<SignupPage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path={route_paths.home} element={<DashboardPage />} />
      </Route>
      <Route path='*' element={<Navigate to={route_paths.home} replace />} />
    </Routes>
  )
}
