import { Navigate, Route, Routes } from "react-router-dom"
import { ADD_COURSES, COURSES, SHOW_COURSES } from "@models/privateRoutes"

import { AddCoursePage, ShowCoursesPage } from "../pages"

export const CourseRoutes = () => {
  return (
    <Routes>
      <Route path={`${ADD_COURSES}`} element={<AddCoursePage />} />
      <Route path={`${SHOW_COURSES}`} element={<ShowCoursesPage />} />

      <Route path='/*' element={<Navigate to={`${COURSES + SHOW_COURSES}`} />} />
    </Routes>
  )
}
