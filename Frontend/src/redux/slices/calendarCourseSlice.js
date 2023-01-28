import { createSlice } from "@reduxjs/toolkit";

export const calendarCourseSlice = createSlice({
  name: 'calendarCourse',
  initialState: {
    isLoading: false,
    activeCalendarCourse: {},
    calendarCourses: [],
    errors: {},
    isLoadingEvaluations: false,
    activeEvaluation: {},
    evaluations: [],
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
    },

    // Evaluations
    onHandleEvaluationLoading: (state, {payload}) => {
      state.isLoadingEvaluations = payload
    },
    onHandleEvaluations: (state, {payload}) => {
      state.evaluations = payload
    },
    onResetEvaluations: (state) => {
      state.evaluations = []
    },
    onHandleActiveEvaluation: (state, {payload}) => {
      state.activeEvaluation = payload
    },
    onResetActiveEvaluation: (state) => {
      state.activeEvaluation = {}
    }
  }
})

export const {
  onHandleLoading,
  onHandleCalendarCourses,
  onHandleActiveCalendarCourse,
  onResetActiveCalendarCourse,

  //Evaluations
  onHandleEvaluationLoading,
  onHandleEvaluations,
  onResetEvaluations,
  onHandleActiveEvaluation,
  onResetActiveEvaluation,
} = calendarCourseSlice.actions
