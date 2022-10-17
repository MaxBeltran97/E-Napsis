import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
  name: 'course',
  initialState: {
    isLoading: false,
    activeCourse: {},
    courses: [],
    errors: {}
  },
  reducers: {
    onHandleLoading: (state, {payload}) => {
      state.isLoading = payload
    },
    onHandleCourses: (state, {payload}) => {
      state.courses = payload
    },
    onHandleActiveCourse: (state, {payload}) => {
      state.activeCourse = payload
    },
    onResetActiveCourse: (state) => {
      state.activeCourse = {}
    }
  }
})

export const {
  onHandleLoading,
  onHandleCourses,
  onHandleActiveCourse,
  onResetActiveCourse
} = courseSlice.actions