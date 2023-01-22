import { AUTOMATIC_NOTICES, CHECKLIST, HOLIDAYS, PRIVILEGES, SETTINGS, SETTINGS_COMPANY, TEMPLATE_CONTRACTS, TEMPLATE_EMAILS } from '@models/privateRoutes'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AutomaticNoticesPage, HolidaysPage, PrivilegesPage, SettingsCompanyPage  } from '../pages'
import { CheckListRoutes } from '../pages/CheckList/routes'
import { TemplateContractsRoutes } from '../pages/templateContracts/routes'
import { TemplateEmailsRoutes } from '../pages/templateEmails/routes'

export const SettingsRoutes = () => {
  return (
    <Routes>
      <Route path={`${PRIVILEGES}`} element={<PrivilegesPage />} />
      <Route path={`${HOLIDAYS}`} element={<HolidaysPage />} />
      <Route path={`${CHECKLIST}/*`} element={<CheckListRoutes />} />
      <Route path={`${SETTINGS_COMPANY}`} element={<SettingsCompanyPage />} />
      <Route path={`${TEMPLATE_EMAILS}/*`} element={<TemplateEmailsRoutes />} />
      <Route path={`${TEMPLATE_CONTRACTS}/*`} element={<TemplateContractsRoutes />} />
      <Route path={`${AUTOMATIC_NOTICES}`} element={<AutomaticNoticesPage />} />

      <Route path='/*' element={<Navigate to={`${SETTINGS + PRIVILEGES}`} />} />
    </Routes>
  )
}
