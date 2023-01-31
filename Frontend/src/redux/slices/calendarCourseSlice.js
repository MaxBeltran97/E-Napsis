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

    isLoadingGrades: false,
    grades: [],

    isLoadingAttendances: false,
    attendances: [],

    isLoadingPartAttendance: false,
    participantsAttendance: []
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
    },

    // Grades
    onHandleGradesLoading: (state, {payload}) => {
      state.isLoadingGrades = payload
    },
    onHandleGrades: (state, {payload}) => {
      state.grades = payload
    },
    onResetGrades: (state) => {
      state.grades = []
    },

    // Attendances
    onHandleAttendanceLoading: (state, {payload}) => {
      state.isLoadingAttendances = payload
    },
    onHandleAttendances: (state, {payload}) => {
      state.attendances = payload
    },
    onResetAttendances: (state) => {
      state.attendances = []
    },

    // ParticipantsAttendance
    onHandleParticipantsAttendanceLoading: (state, {payload}) => {
      state.isLoadingPartAttendance = payload
    },
    onHandleParticipantsAttendance: (state, {payload}) => {
      state.participantsAttendance = payload
    },
    onResetParticipantsAttendance: (state) => {
      state.participantsAttendance = []
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

  //Grades
  onHandleGradesLoading,
  onHandleGrades,
  onResetGrades,

  //Attendance
  onHandleAttendanceLoading,
  onHandleAttendances,
  onResetAttendances,

  //ParticipantsAttendance
  onHandleParticipantsAttendanceLoading,
  onHandleParticipantsAttendance,
  onResetParticipantsAttendance
} = calendarCourseSlice.actions
