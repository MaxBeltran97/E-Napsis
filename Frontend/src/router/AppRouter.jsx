import { Navigate, Route, Routes } from 'react-router-dom'

import { AuthRoutes } from '../auth/routes'
import { EnapsisRoutes } from '../e-napsis/routes'
import { useAuthStore } from '../hooks'

export const AppRouter = () => {

    const { status } = useAuthStore()

    return (
        <Routes>
            {
                (status === 'authenticated')
                ? <Route path='/*' element={<EnapsisRoutes />} />
                : <Route path='/auth/*' element={<AuthRoutes />} />
            }

            <Route path='/*' element={<Navigate to={'/auth/login'} />} />
        </Routes>
    )
}
