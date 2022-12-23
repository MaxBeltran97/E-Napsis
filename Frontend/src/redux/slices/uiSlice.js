import { createSlice } from "@reduxjs/toolkit";
import { 
  ADD_CALENDAR_COURSE, ADD_COMPANY, ADD_COURSES, ADD_PARTICIPANTS, ADD_TELLER, 
  CALENDAR_COURSE, CLASS_BOOKS, COMPANIES, COURSES, HOME, IMPORT_PARTICIPANTS, PARTICIPANTS, 
  SHOW_CALENDAR_COURSE, SHOW_COMPANIES, SHOW_COURSES, SHOW_PARTICIPANTS, SHOW_TELLERS, TELLERS 
} from "@models/privateRoutes";

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isSidebarOpen: true,
    sidebarActiveItem: {},
    sidebarItems: [
      {
        name: 'Home',
        idIcon: 0,
        url: `${HOME}`,
        rolesAllowed: []
      },
      {
        name: 'Empresas',
        idIcon: 1,
        rolesAllowed: ['admin', 'coordinator'],
        isItemOpen: false,
        activeOption: {},
        options: [
          {
            name: 'Agregar Empresa',
            url: `${COMPANIES + ADD_COMPANY}`
          },
          {
            name: 'Mostrar Empresas',
            url: `${COMPANIES + SHOW_COMPANIES}`
          }
        ]
      },
      {
        name: 'Relatores',
        idIcon: 2,
        rolesAllowed: ['admin', 'coordinator'],
        isItemOpen: false,
        activeOption: {},
        options: [
          {
            name: 'Agregar Relator',
            url: `${TELLERS + ADD_TELLER}`
          },
          {
            name: 'Mostrar Relatores',
            url: `${TELLERS + SHOW_TELLERS}`
          }
        ]
      },
      {
        name: 'Participantes',
        idIcon: 2,
        rolesAllowed: ['admin', 'coordinator'],
        isItemOpen: false,
        activeOption: {},
        options: [
          {
            name: 'Agregar Participante',
            url: `${PARTICIPANTS + ADD_PARTICIPANTS}`
          },
          {
            name: 'Mostrar Participantes',
            url: `${PARTICIPANTS + SHOW_PARTICIPANTS}`
          },
          {
            name: 'Importar Participantes',
            url: `${PARTICIPANTS + IMPORT_PARTICIPANTS}`
          }
        ]
      },
      {
        name: 'Cursos',
        idIcon: 3,
        rolesAllowed: ['admin', 'coordinator'],
        isItemOpen: false,
        activeOption: {},
        options: [
          {
            name: 'Agregar Curso',
            url: `${COURSES + ADD_COURSES}`
          },
          {
            name: 'Mostrar Cursos',
            url: `${COURSES + SHOW_COURSES}`
          }
        ]
      },
      {
        name: 'Calendario',
        idIcon: 4,
        rolesAllowed: ['admin', 'coordinator'],
        isItemOpen: false,
        activeOption: {},
        options: [
          {
            name: 'Calendarizar Curso',
            url: `${CALENDAR_COURSE + ADD_CALENDAR_COURSE}`
          },
          {
            name: 'Mostrar Calendario',
            url: `${CALENDAR_COURSE + SHOW_CALENDAR_COURSE}`
          }
        ]
      },
      {
        name: 'Libro de Clases',
        idIcon: 5,
        url: `${CLASS_BOOKS}`,
        rolesAllowed: ['admin', 'coordinator', 'teller', 'teller_with_upload'],
      },
      {
        name: 'Configuración',
        idIcon: 6,
        rolesAllowed: ['admin', 'coordinator'],
        isItemOpen: false,
        activeOption: {},
        options: [
          {
            name: 'Privilegios',
            url: ''
          },
          {
            name: 'Feriados',
            url: ''
          },
          {
            name: 'Check-List',
            url: ''
          },
          {
            name: 'Datos de Empresa',
            isOptionOpen: false,
            activeSubOption: {},
            subOptions: [
              {
                name: 'Configurar',
                url: ''
              },
              {
                name: 'Template Email',
                url: ''
              },
              {
                name: 'Template Contrato',
                url: ''
              },
              {
                name: 'Avisos Automaticos',
                url: ''
              },
              {
                name: 'Personalizar Acceso',
                url: ''
              }
            ]
          }
        ]
      }
    ]
  },
  reducers: {
    onOpenSidebar: (state) => {
      state.isSidebarOpen = true
    },
    onCloseSidebar: (state) => {
      state.isSidebarOpen = false
    },

    onChangeSidebarActiveItem: (state, {payload}) => {
      state.sidebarActiveItem = payload
    },
    onOpenSidebarActiveItem: (state) => {
      state.sidebarActiveItem.isItemOpen = true
    },

    onOpenSidebarItem: (state, {payload}) => {
      state.sidebarItems = state.sidebarItems.map((item) => {
        if(item.name === payload.name) {
          item.isItemOpen = true
        }
        return item
      })
    },

    onCloseAllSidebarItems: (state) => {
      state.sidebarItems = state.sidebarItems.map((item) => {
        item.isItemOpen = false
        return item
      })
      state.sidebarActiveItem.isItemOpen = false
    },

    onChangeSidebarActiveOption: (state, {payload}) => {
      state.sidebarActiveItem.activeOption = payload
    },
    onOpenSidebarActiveOption: (state) => {
      state.sidebarActiveItem.activeOption.isOptionOpen = true
    },

    onOpenSidebarOption: (state, {payload}) => {
      console.log('entre')
      state.sidebarItems = state.sidebarItems.map((item) => {
        item.options = item.options?.map((option) => {
          if(option.name === payload.name ) {
            console.log('entre a la opcion')
            option.isOptionOpen = true
            console.log(option)
          }
          return option
        })
        return item
      })
    },

    onCloseAllSidebarOptions: (state) => {
      state.sidebarItems = state.sidebarItems.map((item) => {
        item.options = item.options?.map((option) => {
          option.isOptionOpen = false
          return option
        })
        return item
      })
      state.sidebarActiveItem.options = state.sidebarActiveItem.options?.map((option) => {
        option.isOptionOpen = false
        return option
      })
    },

    onChangeSidebarActiveSubOption: (state, {payload}) => {
      state.sidebarActiveItem.activeOption.activeSubOption = payload
    },
  }
})

export const {
  onOpenSidebar,
  onCloseSidebar,

  onChangeSidebarActiveItem,
  onOpenSidebarActiveItem,

  onOpenSidebarItem,
  onCloseAllSidebarItems,

  onChangeSidebarActiveOption,
  onOpenSidebarActiveOption,

  onOpenSidebarOption,
  onCloseAllSidebarOptions,

  onChangeSidebarActiveSubOption
} = uiSlice.actions