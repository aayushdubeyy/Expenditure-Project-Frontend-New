import { Navigate, Outlet } from 'react-router-dom'
import { route_paths } from '../constants/routes.js'
import { hasAuthToken } from '../services/authService.js'

export function PrivateRoute() {
  if (!hasAuthToken()) {
    return <Navigate to={route_paths.login} replace />
  }
  return <Outlet />
}
