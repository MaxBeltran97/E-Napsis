import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AUTH, LOGIN } from '@models/publicRoutes'

import { LoginPage } from '../pages'

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path={`${LOGIN}`} element={<LoginPage />} />

      <Route path='/*' element={<Navigate to={`${AUTH + LOGIN}`}/>} />
    </Routes>
  )
}
