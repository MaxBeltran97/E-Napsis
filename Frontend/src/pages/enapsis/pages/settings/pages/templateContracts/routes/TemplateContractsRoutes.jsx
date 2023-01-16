import { SETTINGS, TEMPLATE_CONTRACTS } from "@models/privateRoutes"
import { Navigate, Route, Routes } from "react-router-dom"
import { TemplateContractPage, TemplateCotractsPage } from "../pages"

export const TemplateContractsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TemplateCotractsPage />} />
      <Route path="/:contractId" element={<TemplateContractPage />} />

      <Route path="/*" element={<Navigate to={`${SETTINGS + TEMPLATE_CONTRACTS}`} />} />
    </Routes>
  )
}
