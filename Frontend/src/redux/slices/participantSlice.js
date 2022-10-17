import { createSlice } from "@reduxjs/toolkit";

export const participantSlice = createSlice({
  name: 'participant',
  initialState: {
    isLoading: false,
    activeParticipant: {},
    participants: [],
    errors: {}
  },
  reducers: {
    onHandleLoading: (state, {payload}) => {
      state.isLoading = payload
    },
    onHandleParticipants: (state, {payload}) => {
      state.participants = payload
    },
    onHandleActiveParticipant: (state, {payload}) => {
      state.activeParticipant = payload
    },
    onResetActiveParticipant: (state) => {
      state.activeParticipant = {}
    }
  }
})

export const {
  onHandleLoading,
  onHandleParticipants,
  onHandleActiveParticipant,
  onResetActiveParticipant
} = participantSlice.actions