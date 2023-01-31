
import { CLASS_BOOKS } from '@models/privateRoutes'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AttendancesPage, ClassBooksPage, EvaluationsPage, GradesPage, ParticipantsAttendancePage } from '../pages'

export const ClassBooksRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={ <ClassBooksPage /> } />
      <Route path='/:calendarCourseId/evaluaciones' element={ <EvaluationsPage /> } />
      <Route path='/:calendarCourseId/evaluaciones/:evaluationId' element={ <GradesPage /> } />
      <Route path='/:calendarCourseId/asistencia' element={ <AttendancesPage /> } />
      <Route path='/:calendarCourseId/asistencia/:attendanceId' element={ <ParticipantsAttendancePage /> } />

      <Route path='/*' element={ <Navigate to={`${CLASS_BOOKS}`} /> } />
    </Routes>
  )
}
