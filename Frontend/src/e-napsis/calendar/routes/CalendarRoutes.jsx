import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import { CalendarPage } from "../pages"

export const CalendarRoutes = () => {

    useEffect(() => {
        document.title = 'e-Napsis - Calendario'
    }, [])

    return (
        <Routes>
            <Route path="/" element={ <CalendarPage /> } />

            <Route path="/*" element={ <Navigate to={'/calendario'} /> } />
        </Routes>
    )
}