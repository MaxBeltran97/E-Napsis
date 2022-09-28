import { Navigate, Route, Routes } from "react-router-dom"
import { ADD_COURSES, COURSES, IMPORT_COURSES, SHOW_COURSES } from "@models/privateRoutes"

import { AddCoursePage, ImportCoursesPage, ShowCoursesPage } from "../pages"

export const CourseRoutes = () => {
  return (
    <Routes>
      <Route path={`${ADD_COURSES}`} element={<AddCoursePage />} />
      <Route path={`${SHOW_COURSES}`} element={<ShowCoursesPage />} />
      <Route path={`${IMPORT_COURSES}`} element={<ImportCoursesPage />} />

      <Route path='/*' element={<Navigate to={`${COURSES + SHOW_COURSES}`} />} />
    </Routes>
  )
}
