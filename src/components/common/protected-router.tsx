import { useAppSelector } from '@/hooks/useAppSelector'
import React from 'react'
import { Navigate } from 'react-router-dom'

const GuardedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole: string }) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  if (!user || !user.role.includes(requiredRole) || !isAuthenticated) {
    return <Navigate to='/' />
  }

  return children
}

export default GuardedRoute
