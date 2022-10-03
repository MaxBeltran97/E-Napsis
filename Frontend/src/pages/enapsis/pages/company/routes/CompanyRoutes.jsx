import { Navigate, Route, Routes } from "react-router-dom"
import { ADD_COMPANY, COMPANIES, SHOW_COMPANIES } from "@models/privateRoutes"

import { AddCompanyPage, ShowCompaniesPage } from "../pages"

export const CompanyRoutes = () => {
  return (
    <Routes>
      <Route path={`${ADD_COMPANY}`} element={<AddCompanyPage />} />
      <Route path={`${SHOW_COMPANIES}`} element={<ShowCompaniesPage />} />

      <Route path='/*' element={<Navigate to={`${COMPANIES + SHOW_COMPANIES}`} />} />
    </Routes>
  )
}
