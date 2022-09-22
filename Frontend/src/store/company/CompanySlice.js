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
        onAddNewCompany: (state, {payload}) => {
            state.companies.push(payload)
        }
    }
})

export const {
    onHandleLoading,
    onHandleCompanies,
    onHandleActiveCompany,
    onAddNewCompany
} = companySlice.actions
