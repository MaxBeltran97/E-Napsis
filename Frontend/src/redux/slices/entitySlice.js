import { createSlice } from "@reduxjs/toolkit";

export const entitySlice = createSlice({
  name: 'entity',
  initialState: {
    isLoading: false,
    activeEntity: {},
    entities: [],
    activePage: 0,
    errors: {}
  },
  reducers: {
    onHandleLoading: (state, {payload}) => {
      state.isLoading = payload
    },
    onHandleEntities: (state, {payload}) => {
      state.entities = payload
    },
    onHandleActiveEntity: (state, {payload}) => {
      state.activeEntity = payload
    },
    onHandleActivePage: (state, {payload}) => {
      state.activePage = payload
    }
  }
})

export const {
  onHandleLoading,
  onHandleEntities,
  onHandleActiveEntity,
  onHandleActivePage
} = entitySlice.actions