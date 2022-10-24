import enapsisApi from "@api/enapsisApi"
import { onHandleCalendarCourses, onHandleLoading } from "@reduxSlices/calendarCourseSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const useCalendarCourseStore = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, activeCalendarCourse, calendarCourses } = useSelector(state => state.calendarCourse)

  const startGetCalendarCourses = async () => {
    dispatch(onHandleLoading(true))

    try {
      const {data} = await enapsisApi.get('/calendar')
      if(data.ok) {
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

  }

  const startSavingCalendarCourse = async (calendarCourse) => {
    dispatch(onHandleLoading(true))

    try {
      //TODO falta hacer una tabla para las fechas de las evaluaciones
      const evaluationDates = calendarCourse.evaluationDates

      calendarCourse = { 
        ...calendarCourse, 
        courseTotalHours: parseInt(calendarCourse.courseTotalHours),
        startDate: new Date(calendarCourse.startDate).toISOString().slice(0, 19).replace('T', ' '),
        endDate: new Date(calendarCourse.endDate).toISOString().slice(0, 19).replace('T', ' '),
        participantValue: parseInt(calendarCourse.participantValue),
      }

      delete calendarCourse.sence
      delete calendarCourse.evaluationDates

      const { data } = await enapsisApi.post('/calendar', JSON.stringify(calendarCourse), { headers: { 'Content-Type': 'application/json' } }) 
      if(data.ok) {
        navigate('../', {replace: true})
      }else{
        //TODO Manejar errores del formulario obtenidos del backend
      }
    } catch (error) {
      console.log(error.response)
    }
    dispatch(onHandleLoading(false))
  }

  return {
    //* Propiedades
    isLoading,
    activeCalendarCourse,
    calendarCourses,

    //*Metodos
    startGetCalendarCourses,
    startGetCalendarCourse,
    startSavingCalendarCourse
  }
}
