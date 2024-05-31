// ** react
import React from 'react'

// ** react router
import { Navigate } from 'react-router-dom'

// ** hooks
import { useAppSelector } from '@/hooks/useAppSelector'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  if (isAuthenticated) {
    return <Navigate to='/' />
  }
  return children
}

export default PrivateRoute
