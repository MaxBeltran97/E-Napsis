import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'

import { sidebarSlice } from './sidebar/SidebarSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        sidebar: sidebarSlice.reducer
    },
})