import { createSlice } from '@reduxjs/toolkit'

const tempRapporteur = {
    _id: 1,
    firstName: 'Rafael',
    lastName: 'Carvacho',
    rut: '20668572-7',
    condition: true,
    reuf: true,
    acredited: false,
    acreditationProcess: true,
    user: {
        _id: '123',
        name: 'Rcarvacho'
    }
}

export const rapporteurSlice = createSlice({
    name: 'rapporteur',
    initialState: {
        isLoading: false,
        activeRapporteur: {},
        rapporteurs: [
            tempRapporteur,
        ],
        errors: {}
    },
    reducers: {
        onHandleLoading: (state, {payload}) => {
            state.isLoading = payload
        },
        onHandleRapporteurs: (state, {payload}) => {
            state.rapporteurs = payload
        },
        onHandleActiveRapporteur: (state, {payload}) => {
            state.activeRapporteur = payload
        },
        onAddNewRapporteur: (state, {payload}) => {
            state.rapporteurs.push(payload)
        },
        onUpdateRapporteur: (state, {payload}) => {
            state.rapporteurs = state.rapporteurs.map( rapporteur => {
                if(rapporteur._id === payload._id) {
                    return payload
                }
                return rapporteur
            })
        },
        onDeleteRapporteur: (state, {payload}) => {
            state.rapporteurs = state.rapporteurs.filter( rapporteur => rapporteur._id !== payload._id )
        }
    }
})

export const {
    onHandleLoading,
    onHandleRapporteurs,
    onHandleActiveRapporteur,
    onAddNewRapporteur,
    onUpdateRapporteur,
    onDeleteRapporteur
} = rapporteurSlice.actions