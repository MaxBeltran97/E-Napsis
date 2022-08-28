import { createSlice } from '@reduxjs/toolkit'

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isSidebarOpen: true,
        activeItem: {}, // Home, Empresas, Relatores, Participantes, Cursos, Calendario
        items: [
            {
                idIcon: 0,
                name: 'Home',
                url: '/'
            },
            {
                idIcon: 1,
                name: 'Empresas',
                isItemOpen: false,
                activeOption: null,
                options: [
                    {
                        name: 'Agregar Empresa',
                        url: '/empresas/agr-empresas'
                    },
                    {
                        name: 'Mostrar Empresas',
                        url: '/empresas/mst-empresas'
                    },
                    {
                        name: 'Importar Empresas',
                        url: '/empresas/imp-empresas'
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
                url: '/calendario'
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

        //* Options Item
        onOpenItem: (state, {payload}) => {
            state.items = state.items.map((item) => {
                if(item.name === payload.name){
                    item.isItemOpen = true
                }
                return item
            })
        },
        onCloseItem: (state, {payload}) => {
            state.items = state.items.map((item) => {
                if(item.name === payload.name) {
                    item.isItemOpen = false
                }
                return item
            })
        },
        onCloseAllItems: (state) => {
            state.items = state.items.map((item) => {
                item.isItemOpen = false
                return item
            })
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
    //* Options Item
    onOpenItem,
    onCloseItem,
    onCloseAllItems,
    //* Option Selected 
    onHandleActiveOption
} = sidebarSlice.actions