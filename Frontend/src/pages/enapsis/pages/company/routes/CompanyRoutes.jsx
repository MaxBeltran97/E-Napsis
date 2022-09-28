import { Navigate, Route, Routes } from "react-router-dom"
import { ADD_COMPANY, COMPANIES, IMPORT_COMPANIES, SHOW_COMPANIES } from "@models/privateRoutes"

import { AddCompanyPage, ImportCompaniesPage, ShowCompaniesPage } from "../pages"

export const CompanyRoutes = () => {
  return (
    <Routes>
      <Route path={`${ADD_COMPANY}`} element={<AddCompanyPage />} />
      <Route path={`${SHOW_COMPANIES}`} element={<ShowCompaniesPage />} />
      <Route path={`${IMPORT_COMPANIES}`} element={<ImportCompaniesPage />} />

      <Route path='/*' element={<Navigate to={`${COMPANIES + SHOW_COMPANIES}`} />} />
    </Routes>
  )
}
