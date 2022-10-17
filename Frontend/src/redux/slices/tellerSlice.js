import { createSlice } from "@reduxjs/toolkit"

export const tellerSlice = createSlice({
  name: 'teller',
  initialState: {
    isLoading: false,
    activeTeller: {},
    tellers: [],
    errors: {}
  },
  reducers: {
    onHandleLoading: (state, {payload}) => {
      state.isLoading = payload
    },
    onHandleTellers: (state, {payload}) => {
      state.tellers = payload
    },
    onHandleActiveTeller: (state, {payload}) => {
      state.activeTeller = payload
    },
    onResetActiveTeller: (state) => {
      state.activeTeller = {}
    }
  }
})

export const {
  onHandleLoading,
  onHandleTellers,
  onHandleActiveTeller,
  onResetActiveTeller
} = tellerSlice.actions