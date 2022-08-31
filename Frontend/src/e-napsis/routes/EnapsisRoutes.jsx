import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"

import { CalendarRoutes } from "../calendar/routes"
import { CompanyRoutes } from "../company/routes"
import { CoursesRoutes } from "../courses/routes"
import { HomeRoutes } from "../home/routes"
import { ParticipantRoutes } from "../participant/routes"
import { RapporteurRoutes } from "../rapporteur/routes"

import { LayoutApp } from "../ui/layout"
import { useSidebarStore } from "../../hooks"

export const EnapsisRoutes = () => {

    const { pathname } = useLocation()
    const { setByUrlActiveItem, activeItem } = useSidebarStore()

    useEffect(() => {
        if(!(!!activeItem.name)) {
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
