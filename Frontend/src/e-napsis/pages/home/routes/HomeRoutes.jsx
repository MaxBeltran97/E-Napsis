import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "../pages"

export const HomeRoutes = () => {

    useEffect(() => {
        document.title = 'e-Napsis'
    }, [])

    return (
        <Routes>
            <Route path="/" element={ <HomePage /> } />

            <Route path="/*" element={ <Navigate to={'/'} /> } />
        </Routes>
    )
}
