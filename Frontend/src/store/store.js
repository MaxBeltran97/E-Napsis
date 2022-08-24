import { configureStore } from '@reduxjs/toolkit'

import { sidebarSlice } from './sidebar/SidebarSlice'

export const store = configureStore({
    reducer: {
        sidebar: sidebarSlice.reducer
    },
})