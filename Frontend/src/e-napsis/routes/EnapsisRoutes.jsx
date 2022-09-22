import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"

import { CalendarRoutes } from "../pages/calendar/routes"
import { CompanyRoutes } from "../pages/company/routes"
import { CoursesRoutes } from "../pages/courses/routes"
import { HomeRoutes } from "../pages/home/routes"
import { ParticipantRoutes } from "../pages/participant/routes"
import { RapporteurRoutes } from "../pages/rapporteur/routes"

import { LayoutApp } from "../layout"
import { useSidebarStore } from "../../hooks"

export const EnapsisRoutes = () => {

    const { pathname } = useLocation()
    const { setByUrlActiveItem, activeItem } = useSidebarStore()

    useEffect(() => {
        if(!(!!activeItem.name) || (activeItem.activeOption?.url !== pathname)) {
            setByUrlActiveItem(pathname)
        }
    }, [pathname])

    return (
        <LayoutApp>
            <Routes>
                {/* Empresas */}
                <Route path="empresas/*" element={<CompanyRoutes />} />

                {/* Relatores */}
                <Route path="relatores/*" element={<RapporteurRoutes />} />

                {/* Participantes */}
                <Route path="participantes/*" element={<ParticipantRoutes />} />

                {/* Cursos */}
                <Route path="cursos/*" element={<CoursesRoutes />} />

                {/* Calendario */}
                <Route path="calendario/*" element={<CalendarRoutes />} />

                {/* Home */}
                <Route path="/*" element={<HomeRoutes />} />
            </Routes>
        </LayoutApp>
    )
}
