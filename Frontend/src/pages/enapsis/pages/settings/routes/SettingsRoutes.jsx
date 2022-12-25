import { AUTOMATIC_NOTICES, CHECKLIST, DATA_COMPANY, HOLIDAYS, PRIVILEGES, SETTINGS, TEMPLATE_CONTRACT, TEMPLATE_EMAILS } from '@models/privateRoutes'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AutomaticNoticesPage, CheckListPage, DataCompanyPage, HolidaysPage, PrivilegesPage, TemplateContractsPage, TemplateEmailsPage } from '../pages'

export const SettingsRoutes = () => {
  return (
    <Routes>
      <Route path={`${PRIVILEGES}`} element={<PrivilegesPage />} />
      <Route path={`${HOLIDAYS}`} element={<HolidaysPage />} />
      <Route path={`${CHECKLIST}`} element={<CheckListPage />} />
      <Route path={`${DATA_COMPANY}`} element={<DataCompanyPage />} />
      <Route path={`${TEMPLATE_EMAILS}`} element={<TemplateEmailsPage />} />
      <Route path={`${TEMPLATE_CONTRACT}`} element={<TemplateContractsPage />} />
      <Route path={`${AUTOMATIC_NOTICES}`} element={<AutomaticNoticesPage />} />

      <Route path='/*' element={<Navigate to={`${SETTINGS + PRIVILEGES}`} />} />
    </Routes>
  )
}
