import { createSlice } from '@reduxjs/toolkit'

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isSidebarOpen: true,
        activeItem: {
            idIcon: 0,
            name: 'Home'
        }, // Home, Empresas, Relatores, Participantes, Cursos, Calendario
        items: [
            {
                idIcon: 0,
                name: 'Home',
            },
            {
                idIcon: 1,
                name: 'Empresas',
                isItemOpen: false,
                activeOption: null,
                options: [
                    {
                        name: 'Agregar Empresa'
                    },
                    {
                        name: 'Mostrar Empresas'
                    },
                    {
                        name: 'Importar Empresas'
                    }
                ]
            },
            {
                idIcon: 2,
                name: 'Relatores',
                isItemOpen: false,
                activeOption: null,
                options: [
                    {
                        name: 'Agregar Relator'
                    },
                    {
                        name: 'Mostrar Relatores'
                    },
                    {
                        name: 'Importar Relatores'
                    }
                ]
            },
            {
                idIcon: 2,
                name: 'Participantes',
                isItemOpen: false,
                activeOption: null,
                options: [
                    {
                        name: 'Agregar Participante'
                    },
                    {
                        name: 'Mostrar Participantes'
                    },
                    {
                        name: 'Importar Participantes'
                    }
                ]
            },
            {
                idIcon: 3,
                name: 'Cursos',
                isItemOpen: false,
                activeOption: null,
                options: [
                    {
                        name: 'Agregar Curso'
                    },
                    {
                        name: 'Mostrar Cursos'
                    },
                    {
                        name: 'Importar Cursos'
                    },
                    {
                        name: 'Importar Actividades'
                    }
                ]
            },
            {
                idIcon: 4,
                name: 'Calendario',
            }
        ]
    },
    reducers: {
        //* Sidebar
        onToggleSidebar: (state) => {
            state.isSidebarOpen = !(state.isSidebarOpen)
        },
        onOpenSidebar: (state) => {
            state.isSidebarOpen = true
        },
        onCloseSidebar: (state) => {
            state.isSidebarOpen = false
        },

        //* Item Active
        onHandleActiveItem: (state, {payload}) => {
            state.activeItem = payload
        },
        onToggleActiveItem: (state) => {
            state.activeItem.isItemOpen = !(state.activeItem.isItemOpen)
        },
        onCloseActiveItem: (state) => {
            state.activeItem.isItemOpen = false
        },

        //* Option Selected
        onHandleActiveOption: (state, {payload}) => {
            state.activeItem.activeOption = payload
        }
    }
})

export const {
    //* Sidebar 
    onToggleSidebar, 
    onOpenSidebar, 
    onCloseSidebar,
    //* Item Selected 
    onHandleActiveItem,
    onToggleActiveItem,
    onCloseActiveItem,
    //* Option Selected 
    onHandleActiveOption
} = sidebarSlice.actions