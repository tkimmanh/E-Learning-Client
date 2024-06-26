// ** react
import React from 'react'

// ** react router
import { Navigate } from 'react-router-dom'

// ** hooks
import { useAppSelector } from '@/hooks/useAppSelector'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  if (isAuthenticated) {
    return <Navigate to='/' />
  }
  return children
}

export const RejectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }
  return children
}
