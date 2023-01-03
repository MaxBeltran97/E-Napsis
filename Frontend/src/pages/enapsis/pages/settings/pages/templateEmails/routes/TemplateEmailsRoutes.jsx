import { SETTINGS, TEMPLATE_EMAILS } from '@models/privateRoutes'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { TemplateEmailPage, TemplateEmailsPage } from '../pages'

export const TemplateEmailsRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<TemplateEmailsPage />} />
      <Route path='/:emailId' element={<TemplateEmailPage />} />

      <Route path='/*' element={<Navigate to={`${SETTINGS + TEMPLATE_EMAILS}`} />} />
    </Routes>
  )
}
