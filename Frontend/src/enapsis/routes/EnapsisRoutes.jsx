import { Navigate, Route, Routes } from "react-router-dom"
import { EnapsisPage } from "../pages"

export const EnapsisRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <EnapsisPage /> } />

            <Route path="/*" element={ <Navigate to={'/'} /> } />
        </Routes>
    )
}
