
import { CLASS_BOOKS } from '@models/privateRoutes'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ClassBooksPage } from '../pages'

export const ClassBooksRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={ <ClassBooksPage /> } />

      <Route path='/*' element={ <Navigate to={`${CLASS_BOOKS}`} /> } />
    </Routes>
  )
}
