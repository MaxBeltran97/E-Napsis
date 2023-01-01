import { AUTOMATIC_NOTICES, CHECKLIST, HOLIDAYS, PRIVILEGES, SETTINGS, SETTINGS_COMPANY, TEMPLATE_CONTRACT, TEMPLATE_EMAILS } from '@models/privateRoutes'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AutomaticNoticesPage, CheckListPage, HolidaysPage, PrivilegesPage, SettingsCompanyPage, TemplateContractsPage, TemplateEmailPage, TemplateEmailsPage } from '../pages'
import { TemplateEmailsRoutes } from '../pages/templateEmails/routes'

export const SettingsRoutes = () => {
  return (
    <Routes>
      <Route path={`${PRIVILEGES}`} element={<PrivilegesPage />} />
      <Route path={`${HOLIDAYS}`} element={<HolidaysPage />} />
      <Route path={`${CHECKLIST}`} element={<CheckListPage />} />
      <Route path={`${SETTINGS_COMPANY}`} element={<SettingsCompanyPage />} />
      <Route path={`${TEMPLATE_EMAILS}/*`} element={<TemplateEmailsRoutes />} />
      <Route path={`${TEMPLATE_CONTRACT}`} element={<TemplateContractsPage />} />
      <Route path={`${AUTOMATIC_NOTICES}`} element={<AutomaticNoticesPage />} />

      <Route path='/*' element={<Navigate to={`${SETTINGS + PRIVILEGES}`} />} />
    </Routes>
  )
}
