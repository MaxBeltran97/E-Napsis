import React from 'react'
import { ADD_CHECKLIST, CHECKLIST, SETTINGS } from '@models/privateRoutes'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AddCheckListPage, ShowCheckListPage } from '../pages'

export const CheckListRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<ShowCheckListPage />} />
      <Route path={`${ADD_CHECKLIST}`} element={<AddCheckListPage />} />

      <Route path='/*' element={<Navigate to={`${SETTINGS + CHECKLIST}`} />} />
    </Routes>
  )
}