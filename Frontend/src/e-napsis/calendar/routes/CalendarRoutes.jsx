import { Navigate, Route, Routes } from "react-router-dom"

import { CalendarPage } from "../pages"

export const CalendarRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={ <CalendarPage /> } />

            <Route path="/*" element={ <Navigate to={'/calendario'} /> } />
        </Routes>
    )
}