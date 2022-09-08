import { Navigate, Route, Routes } from "react-router-dom"
import { AddCompanyPage, ImportCompaniesPage, ShowCompaniesPage } from "../pages"

export const CompanyRoutes = () => {
    return (
        <Routes>
            <Route path="/agr-empresas" element={ <AddCompanyPage /> } />
            <Route path="/mst-empresas" element={ <ShowCompaniesPage /> } />
            <Route path="/imp-empresas" element={ <ImportCompaniesPage /> } />
        
            <Route path="/*" element={ <Navigate to={'/empresas/mst-empresas'} /> } />
        </Routes>
    )
}