import enapsisApi from "@api/enapsisApi"
import { onHandleCourses, onHandleLoading } from "@reduxSlices/courseSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const useCourseStore = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, activeCourse, courses } = useSelector(state => state.course)

  const startGetCourses = async () => {
    dispatch(onHandleLoading(true))

    try {
      const { data } = await enapsisApi.get('/course')
      if (data.ok) {
        dispatch(onHandleCourses(data.courses))
      }
    } catch (error) {
      console.log(error.response)
    }
    setTimeout(() => {
      dispatch(onHandleLoading(false))
    }, 500)
  }

  const startGetCourse = async (course_id) => {
    try {
      const { data } = await enapsisApi.get(`/course/${course_id}`)
      if (data.ok) {
        return data.course
      }
    } catch (error) {
      console.log(error.response)
    }
    return null
  }

  const startSavingCourse = async (course) => {
    dispatch(onHandleLoading(true))

    try {
      course = {
        ...course,
        attendance: parseInt(course.attendance),
        minCalification: parseFloat(course.minCalification.replace(',', '.')),
        minHours: parseInt(course.minHours),
        participantsNumber: parseInt(course.participantsNumber),
        activitiesContentHours: course.activitiesContentHours.filter(item => { return (item.activity !== '' && item.content !== '') })
                                                              .map(item => {  return item = {
                                                                                ...item,
                                                                                theoreticalHour: parseInt(item.theoreticalHour),
                                                                                practiceHour: parseInt(item.practiceHour),
                                                                                eLearningHour: parseInt(item.eLearningHour)
                                                                              }}),
        totalHours: parseInt(course.totalHours),
        tellers_id: course.tellers_id.map(item => { return { teller_id: item.value } }),
        tellerSupport: course.tellerSupport.filter(item => { return item.description !== '' })
                                           .map(item => {return item = {...item, amount: parseInt(item.amount)}}),

        participantMaterial: course.participantMaterial.filter(item => { return item.description !== '' })
                                                       .map(item => { return item = {...item, amount: parseInt(item.amount)}}),

        equipment: course.equipment.filter(item => { return item.description !== '' })
                                   .map(item => { return item = {...item, amount: parseInt(item.amount)}}),

        participantValue: parseInt(course.participantValue),
        requestDate: new Date(course.requestDate).toISOString().slice(0, 19).replace('T', ' '),
      }

      const { data } = await enapsisApi.post('/course', JSON.stringify(course), { headers: { 'Content-Type': 'application/json' } })
      if(data.ok) {
        navigate('../', {replace: true})
      }else {
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
    activeCourse,
    courses,

    //* Metodos
    startGetCourses,
    startGetCourse,
    startSavingCourse
  }
}
