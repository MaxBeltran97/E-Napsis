import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { AddRapporteurPage, ImportRapporteursPage, ShowRapporteursPage } from "../pages"

export const RapporteurRoutes = () => {

    useEffect(() => {
        document.title = 'e-Napsis - Relatores'
    }, [])

    return (
        <Routes>
            <Route path="/agr-relatores" element={ <AddRapporteurPage /> } />
            <Route path="/mst-relatores" element={ <ShowRapporteursPage /> } />
            <Route path="/imp-relatores" element={ <ImportRapporteursPage /> } />

            <Route path="/*" element={ <Navigate to={'/relatores/mst-relatores'} /> } />
        </Routes>
    )
}