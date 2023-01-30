import enapsisApi from "@api/enapsisApi"
import { radioInstructionModality } from "@assets/radio-data"
import { ADD_CALENDAR_COURSE, CALENDAR_COURSE } from "@models/privateRoutes"
import { DataObject } from "@mui/icons-material"
import { onHandleActiveCalendarCourse, onHandleActiveEvaluation, onHandleCalendarCourses, onHandleEvaluationLoading, onHandleEvaluations, onHandleGrades, onHandleGradesLoading, onHandleLoading, onResetActiveCalendarCourse, onResetActiveEvaluation, onResetEvaluations, onResetGrades } from "@reduxSlices/calendarCourseSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "./useAuthStore"
import { useCourseStore } from "./useCourseStore"
import { useParticipantStore } from "./useParticipantStore"

export const useCalendarCourseStore = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, startCheckRole } = useAuthStore()
  const { startGetCourse } = useCourseStore()
  const { startGetParticipant } = useParticipantStore()
  const { 
    isLoading, activeCalendarCourse, calendarCourses,
    isLoadingEvaluations, activeEvaluation, evaluations,
    isLoadingGrades, grades
  } = useSelector(state => state.calendarCourse)

  const startGetCalendarCourses = async () => {
    dispatch(onHandleLoading(true))

    try {
      const { data } = await enapsisApi.get('/calendar')
      if (data.ok) {
        dispatch(onHandleCalendarCourses(data.calendarCourses))
      }
    } catch (error) {
      console.log(error.response)
    }
    
    dispatch(onHandleLoading(false))
  }

  const startGetCalendarCourse = async (calendarCourse_id) => {
    try {
      const { data } = await enapsisApi.get(`/calendar/${calendarCourse_id}`)
      if (data.ok) {
        return data.calendarCourse
      }
    } catch (error) {
      console.log(error.response)
    }
    return null
  }

  const startChangeCalendarCourse = (calendarCourse) => {
    calendarCourse = {
      ...calendarCourse,
      startDate: new Date(calendarCourse.startDate),
      endDate: new Date(calendarCourse.endDate),
      // evaluationDates: calendarCourse.evaluationDates.map(item => {
      //   return item = {
      //     ...item,
      //     evaluationDate: new Date(item.evaluationDate)
      //   }
      // })
    }

    dispatch(onHandleActiveCalendarCourse(calendarCourse))
    navigate(`${CALENDAR_COURSE}${ADD_CALENDAR_COURSE}`, { replace: true })
  }

  const startResetActiveCalendarCourse = () => {
    dispatch(onResetActiveCalendarCourse())
  }

  const startSavingCalendarCourse = async (calendarCourse) => {
    dispatch(onHandleLoading(true))

    calendarCourse = {
      ...calendarCourse,
      courseTotalHours: parseInt(calendarCourse.courseTotalHours),
      instruction: radioInstructionModality.find(element => element.name === calendarCourse.instruction).value,
      startDate: new Date(calendarCourse.startDate).toISOString().slice(0, 19).replace('T', ' '),
      endDate: new Date(calendarCourse.endDate).toISOString().slice(0, 19).replace('T', ' '),
      participantValue: parseInt(calendarCourse.participantValue),
      // evaluationDates: calendarCourse.evaluationDates.filter(item => { return (item.evaluationDate !== '' && item.evaluationDate !== null) })
      //   .map(item => {
      //     return item = {
      //       ...item,
      //       evaluationDate: new Date(item.evaluationDate).toISOString().slice(0, 19).replace('T', ' '),
      //       percentage: parseInt(item.percentage)
      //     }
      //   })
    }
    delete calendarCourse.sence

    if (!!calendarCourse._id) {
      try {
        const { data } = await enapsisApi.put(`/calendar/${calendarCourse._id}`, JSON.stringify(calendarCourse), { headers: { 'Content-Type': 'application/json' } })
        if (data.ok) {
          navigate('../', { replace: true })
        } else {
          //TODO Manejar errores del modificar
        }
      } catch (error) {
        console.log(error.response)
      }
    } else {
      try {
        const { data } = await enapsisApi.post('/calendar', JSON.stringify(calendarCourse), { headers: { 'Content-Type': 'application/json' } })
        if (data.ok) {
          navigate('../', { replace: true })
        } else {
          //TODO Manejar errores del formulario obtenidos del backend
        }
      } catch (error) {
        console.log(error.response)
      }
    }
    dispatch(onHandleLoading(false))
  }

  const startDeleteCalendarCourse = async (calendarCourse_id) => {
    dispatch(onHandleLoading(true))

    try {
      const { data } = await enapsisApi.delete(`/calendar/${calendarCourse_id}`)
      if (data.ok) {
        const { data } = await enapsisApi.get('/calendar')
        if (data.ok) {
          dispatch(onHandleCalendarCourses(data.calendarCourses))
        }
      }
    } catch (error) {
      console.log(error.response)
    }

    dispatch(onHandleLoading(false))
  }

  const sortedCalendarCoursesByName = (acending = true) => {
    const sorted = [...calendarCourses].sort((a, b) => {
      const nameA = `${a.internalName}`.toUpperCase()
      const nameB = `${b.internalName}`.toUpperCase()

      if(nameA > nameB) {
        return acending ? 1 : -1
      }
      if(nameA < nameB) {
        return acending ? -1 : 1
      }
      return 0
    })

    dispatch(onHandleCalendarCourses(sorted))
  }

  const sortedCalendarCoursesByCode = (acending = true) => {
    const sorted = [...calendarCourses].sort((a, b) => {
      const codeA = `${a.internalCode}`.toUpperCase()
      const codeB = `${b.internalCode}`.toUpperCase()

      if(codeA > codeB) {
        return acending ? 1 : -1
      }
      if(codeA < codeB) {
        return acending ? -1 : 1
      }
      return 0
    })

    dispatch(onHandleCalendarCourses(sorted))
  }

  const sortedCalendarCoursesByDate = (acending = true) => {
    const sorted = [...calendarCourses].sort((a, b) => {
      const dateA = new Date(a.startDate)
      const dateB = new Date(b.startDate)

      if(dateA > dateB) {
        return acending ? 1 : -1
      }
      if(dateA < dateB) {
        return acending ? -1 : 1
      }
      
      const nameA = `${a.internalName}`.toUpperCase()
      const nameB = `${b.internalName}`.toUpperCase()

      if(nameA > nameB) {
        return acending ? 1 : -1
      }
      if(nameA < nameB) {
        return acending ? -1 : 1
      }
      return 0
    })

    dispatch(onHandleCalendarCourses(sorted))
  }

  const filterCalendarCourses = async (filters) => {
    dispatch(onHandleLoading(true))

    const { data } = await enapsisApi.get('/calendar')
    const calendarAwait = data.calendarCourses

    const name = filters.name.toUpperCase().trim()
    const code = filters.internalCode.toUpperCase().trim()
    
    const filterdeArray = await Promise.all(calendarAwait.map(async x => [(await startGetCourse(x.course_id)).tellers_id, x]))
    let filtered = filterdeArray.filter((x) => {
      const nameCalendarCourse = x[1].internalName.toUpperCase()
      const codeCalendarCourse = x[1].internalCode.toUpperCase()
      const isTeller = x[0]?.filter((c) => {
        return c.teller_id === filters.teller_id
      })

      if( name === '' && code === '' && filters.teller_id === undefined) {
        return true
      }
      if(name !== '' && code !== '' && filters.teller_id !== undefined) {
        return (nameCalendarCourse.includes(name) && codeCalendarCourse.includes(code) && isTeller.length >= 1)
      }

      if(name !== '' && code === '' && filters.teller_id === undefined) {
        return nameCalendarCourse.includes(name)
      }
      if(name !== '' && code !== '' && filters.teller_id === undefined) {
        return (nameCalendarCourse.includes(name) && codeCalendarCourse.includes(code))
      }
      if(name !== '' && code === '' && filters.teller_id !== undefined) {
        return (nameCalendarCourse.includes(name) && isTeller.length >= 1)
      }

      if(name === '' && code !== '' && filters.teller_id === undefined) {
        return codeCalendarCourse.includes(code)
      }
      if(name === '' && code !== '' && filters.teller_id !== undefined) {
        return (codeCalendarCourse.includes(code) && isTeller.length >= 1)
      }

      
      if(name === '' && code === '' && filters.teller_id !== undefined) {        
        return isTeller.length >= 1
      }
    })

    filtered = filtered.map(x => x[1])

    dispatch(onHandleCalendarCourses(filtered))
    dispatch(onHandleLoading(false))
  }

  //* CLASS BOOK
  const startGetClassBooks = async() => {
    dispatch(onHandleLoading(true))
    try {
      const roleTeller = await startCheckRole(['teller', 'teller_with_upload'])
      if(roleTeller) {
        const { data } = await enapsisApi.get(`/calendar/class_book/${user._id}`)
        if (data.ok) {
          dispatch(onHandleCalendarCourses(data.calendarCourses))
        }
      } else {
        const roleAdminCoord = await startCheckRole(['admin', 'coordinator'])
        if(roleAdminCoord) {
          const { data } = await enapsisApi.get('/calendar/class_book')
          if (data.ok) {
            dispatch(onHandleCalendarCourses(data.calendarCourses))
          }
        }
      }
    } catch (error) {
      console.log(error.response)
    }

    dispatch(onHandleLoading(false))
  }

  //* Evaluations
  const startGetEvaluations = async(calendarCourse_id) => {
    dispatch(onHandleEvaluationLoading(true))
    try {
      const { data } = await enapsisApi.get(`/calendar/evaluation/${calendarCourse_id}`)
      if(data.ok) {
        const sorted = [...data.evaluations].sort((a, b) => {
          const dateA = new Date(a.evaluationDate)
          const dateB = new Date(b.evaluationDate)

          if(dateA > dateB) {
            return 1
          }
          if(dateA < dateB) {
            return -1
          }
          return 0
        })
        dispatch(onHandleEvaluations(sorted))
      }
    } catch (error) {
      console.log(error.response)
    }
    dispatch(onHandleEvaluationLoading(false))
  }

  const startGetEvaluation = async(evaluation_id) => {
    try {
      const { data } = await enapsisApi.get(`/calendar/evaluation/evaluation/${evaluation_id}`)
      if(data.ok) {
        return data.evaluation
      }
    } catch (error) {
      console.log(error)
    }
    return null
  }

  const startSavingEvaluation = async(evaluation) => {
    dispatch(onHandleEvaluationLoading(true))
    evaluation = {
      ...evaluation,
      evaluationDate: new Date(evaluation.evaluationDate).toISOString().slice(0,19).replace('T', ' ')
    }
    
    if (!!evaluation._id) {
      try {
        const { data } = await enapsisApi.put(`/calendar/evaluation/${evaluation._id}`, JSON.stringify(evaluation), { headers: { 'Content-Type': 'application/json' } })
        if(data.ok) {
          const { data } = await enapsisApi.get(`/calendar/evaluation/${evaluation.calendarCourse_id}`)
          if(data.ok) {
            const sorted = [...data.evaluations].sort((a, b) => {
              const dateA = new Date(a.evaluationDate)
              const dateB = new Date(b.evaluationDate)
    
              if(dateA > dateB) {
                return 1
              }
              if(dateA < dateB) {
                return -1
              }
              return 0
            })
            dispatch(onHandleEvaluations(sorted))
          }
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const { data } = await enapsisApi.post('/calendar/evaluation', JSON.stringify(evaluation), { headers: { 'Content-Type': 'application/json' } })
        if (data.ok) {
          const { data } = await enapsisApi.get(`/calendar/evaluation/${evaluation.calendarCourse_id}`)
          if(data.ok) {
            const sorted = [...data.evaluations].sort((a, b) => {
              const dateA = new Date(a.evaluationDate)
              const dateB = new Date(b.evaluationDate)
    
              if(dateA > dateB) {
                return 1
              }
              if(dateA < dateB) {
                return -1
              }
              return 0
            })
            dispatch(onHandleEvaluations(sorted))
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(onHandleEvaluationLoading(false))
  }

  const startDeleteEvaluation = async(evaluation_id, calendarCourse_id) => {
    dispatch(onHandleEvaluationLoading(true))
    try {
      const { data } = await enapsisApi.delete(`/calendar/evaluation/${evaluation_id}`)
      if (data.ok) {
        const { data } = await enapsisApi.get(`/calendar/evaluation/${calendarCourse_id}`)
        if(data.ok) {
          dispatch(onHandleEvaluations(data.evaluations))
        }
      }
    } catch (error) {
      console.log(error)
    }
    dispatch(onHandleEvaluationLoading(false))
  }

  const startResetEvaluations = () => {
    dispatch(onResetEvaluations())
  }

  const startChangeEvaluation = (evaluation) => {
    evaluation = {
      ...evaluation,
      evaluationDate: new Date(evaluation.evaluationDate)
    }
    dispatch(onHandleActiveEvaluation(evaluation))

    setTimeout(() => {
      dispatch(onResetActiveEvaluation())
    }, 100)
  }

  const startChangeEvaluationGrades = (evaluation) => {
    dispatch(onHandleActiveEvaluation(evaluation))
  }

  const startResetEvaluation = () => {
    dispatch(onResetActiveEvaluation())
  }

  //* Grades
  const startGetGrades = async(evaluation_id) => {
    dispatch(onHandleGradesLoading(true))

    try {
      const { data } = await enapsisApi.get(`/calendar/evaluation/grades/${evaluation_id}`)
      if(data.ok) {
        const participantArray = await Promise.all(data.grades.map(async x => [(await startGetParticipant(x.participant_id)), x]))
        const grades = participantArray.map(x => {
          let grade = ''
          if(x[1].grade?.length === 1) {
            grade = `${x[1].grade},0`
          }else {
            grade = x[1].grade
          }
          
          return {
            participant: x[0],
            grade: grade
          }
        })

        dispatch(onHandleGrades(grades))
      }
    } catch (error) {
      console.log(error)
    }

    dispatch(onHandleGradesLoading(false))
  }

  const startUploadGrades = async(evaluation_id, newGrades) => {
    dispatch(onHandleGradesLoading(true))
    console.log({evaluation_id})
    console.log({newGrades})

    const grades = newGrades.gradesFields.map(x => {
      return {
        participant_id: x.participant._id,
        grade: x.grade
      }
    })

    try {
      const {data} = await enapsisApi.put(`/calendar/evaluation/grades/${evaluation_id}`, JSON.stringify({grades}), { headers: { 'Content-Type': 'application/json' } })
      if (data.ok) {
        dispatch(onHandleGradesLoading(false))
        return true
      }
    } catch (error) {
      console.log(error)
    }
    dispatch(onHandleGradesLoading(false))
    return false
  }

  const startResetGrades = () => {
    dispatch(onResetGrades())
  }

  return {
    //* Propiedades
    isLoading,
    activeCalendarCourse,
    calendarCourses,
    isLoadingEvaluations,
    activeEvaluation,
    evaluations,
    isLoadingGrades,
    grades,

    //*Metodos
    startGetCalendarCourses,
    startGetCalendarCourse,
    startGetClassBooks,
    startChangeCalendarCourse,
    startResetActiveCalendarCourse,
    startSavingCalendarCourse,
    startDeleteCalendarCourse,

    //* Metodos para ordenar
    sortedCalendarCoursesByName,
    sortedCalendarCoursesByCode,
    sortedCalendarCoursesByDate,

    //* Filter
    filterCalendarCourses,

    //* Evaluations
    startGetEvaluations,
    startGetEvaluation,
    startResetEvaluations,
    startSavingEvaluation,
    startChangeEvaluation,
    startDeleteEvaluation,
    startChangeEvaluationGrades,
    startResetEvaluation,

    //* Grades
    startGetGrades,
    startResetGrades,
    startUploadGrades
  }
}
