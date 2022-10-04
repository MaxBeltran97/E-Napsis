import { createSlice } from "@reduxjs/toolkit";

export const companySlice = createSlice({
  name: 'company',
  initialState: {
    isLoading: false,
    activeCompany: {},
    companies: [],
    errors: {}
  },
  reducers: {
    onHandleLoading: (state, {payload}) => {
      state.isLoading = payload
    },
    onHandleCompanies: (state, {payload}) => {
      state.companies = payload
    },
    onHandleActiveCompany: (state, {payload}) => {
      state.activeCompany = payload
    },
    onResetActiveCompany: (state) => {
      state.activeCompany = {}
    }
  }
})

export const {
  onHandleLoading,
  onHandleCompanies,
  onHandleActiveCompany,
  onResetActiveCompany
} = companySlice.actions