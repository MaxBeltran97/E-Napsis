import { createSlice } from '@reduxjs/toolkit'

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isSidebarOpen: true,
        selectedItem: '',
        selectedOption: ''
    },
    reducers: {
        onToggleSidebar: (state) => {
            state.isSidebarOpen = !(state.isSidebarOpen)
        },
        onOpenSidebar: (state) => {
            state.isSidebarOpen = true
        },
        onCloseSidebar: (state) => {
            state.isSidebarOpen = false
        }
    }
})

export const { onToggleSidebar, onOpenSidebar, onCloseSidebar } = sidebarSlice.actions