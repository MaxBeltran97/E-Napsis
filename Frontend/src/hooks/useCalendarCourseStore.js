import enapsisApi from "@api/enapsisApi"
import { ADD_CALENDAR_COURSE, CALENDAR_COURSE } from "@models/privateRoutes"
import { onHandleActiveCalendarCourse, onHandleCalendarCourses, onHandleLoading, onResetActiveCalendarCourse } from "@reduxSlices/calendarCourseSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "./useAuthStore"

export const useCalendarCourseStore = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, startCheckRole } = useAuthStore()
  const { isLoading, activeCalendarCourse, calendarCourses } = useSelector(state => state.calendarCourse)

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
    setTimeout(() => {
      dispatch(onHandleLoading(false))
    }, 500)
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
    setTimeout(() => {
      dispatch(onHandleLoading(false))
    }, 500)
  }

  const startChangeCalendarCourse = (calendarCourse) => {
    calendarCourse = {
      ...calendarCourse,
      startDate: new Date(calendarCourse.startDate),
      endDate: new Date(calendarCourse.endDate),
      evaluationDates: calendarCourse.evaluationDates.map(item => {
        return item = {
          ...item,
          evaluationDate: new Date(item.evaluationDate)
        }
      })
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
      startDate: new Date(calendarCourse.startDate).toISOString().slice(0, 19).replace('T', ' '),
      endDate: new Date(calendarCourse.endDate).toISOString().slice(0, 19).replace('T', ' '),
      participantValue: parseInt(calendarCourse.participantValue),
      evaluationDates: calendarCourse.evaluationDates.filter(item => { return (item.evaluationDate !== '' && item.evaluationDate !== null) })
        .map(item => {
          return item = {
            ...item,
            evaluationDate: new Date(item.evaluationDate).toISOString().slice(0, 19).replace('T', ' '),
            percentage: parseInt(item.percentage)
          }
        })
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

    setTimeout(() => {
      dispatch(onHandleLoading(false))
    }, 1000)
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

  return {
    //* Propiedades
    isLoading,
    activeCalendarCourse,
    calendarCourses,

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
    sortedCalendarCoursesByDate
  }
}
