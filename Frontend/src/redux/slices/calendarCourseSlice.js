import { createSlice } from "@reduxjs/toolkit";

export const calendarCourseSlice = createSlice({
  name: 'calendarCourse',
  initialState: {
    isLoading: false,
    activeCalendarCourse: {},
    calendarCourses: [],
    errors: {}
  },
  reducers: {
    onHandleLoading: (state, {payload}) => {
      state.isLoading = payload
    },
    onHandleCalendarCourses: (state, {payload}) => {
      state.calendarCourses = payload
    },
    onHandleActiveCalendarCourse: (state, {payload}) => {
      state.activeCalendarCourse = payload
    },
    onResetActiveCalendarCourse: (state) => {
      state.activeCalendarCourse = {}
    }
  }
})

export const {
  onHandleLoading,
  onHandleCalendarCourses,
  onHandleActiveCalendarCourse,
  onResetActiveCalendarCourse
} = calendarCourseSlice.actions
