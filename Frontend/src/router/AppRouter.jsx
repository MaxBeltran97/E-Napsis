import { Navigate, Route, Routes } from "react-router-dom"

import { AUTH, LOGIN } from "@models/publicRoutes"

import { EnapsisRoutes } from "@pages/enapsis/routes"
import { AuthRoutes } from "@pages/auth/routes"

export const AppRouter = () => {

  const status = 'authenticated'

  return (
    <Routes>
      {
        (status === 'authenticated')
          ? <Route path="/*" element={<EnapsisRoutes />} />
          : <Route path={`${AUTH}/*`} element={<AuthRoutes />} />
      }

      <Route path="/*" element={<Navigate to={`${AUTH + LOGIN}`} />} />
    </Routes>
  )
}
