import { Navigate, Route, Routes } from "react-router-dom"
import { AddCoursesPage, ImportActivitiesPage, ImportCoursesPage, ShowCoursesPage } from "../pages"

export const CoursesRoutes = () => {
    return (
        <Routes>
            <Route path="/agr-cursos" element={ <AddCoursesPage /> } />
            <Route path="/mst-cursos" element={ <ShowCoursesPage /> } />
            <Route path="/imp-cursos" element={ <ImportCoursesPage /> } />
            <Route path="/imp-actividades" element={ <ImportActivitiesPage /> } />

            <Route path="/*" element={ <Navigate to={'/cursos/mst-cursos'} /> } />
        </Routes>
    )
}
